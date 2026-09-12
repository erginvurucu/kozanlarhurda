import { put, get } from "@vercel/blob";
import { fiyatGruplari } from "@/data/fiyatlar";

/**
 * FIYAT DEPOSU
 *
 * Panelden girilen fiyatlar Vercel Blob'da tek bir JSON dosyasinda durur.
 * Kod icindeki `data/fiyatlar.ts` artik VARSAYILAN ve YAPI kaynagi:
 * kalem adlari, gruplar ve birimler oradan gelir; rakamlar depodan.
 *
 * Depo bos ya da ulasilamaz durumdaysa site fiyatsiz calisir
 * ("Arayın" gosterir) - asla cokmez, asla uydurma rakam gostermez.
 */

const DOSYA = "fiyatlar.json";

/** Kalem adi -> USD cinsinden alt/ust sinir. */
export type KayitliFiyatlar = {
  guncelleme: string; // ISO tarih
  kalemler: Record<string, { usdMin: number; usdMax: number }>;
};

export const BOS: KayitliFiyatlar = { guncelleme: "", kalemler: {} };

/**
 * Depo kimlik dogrulama ayari.
 *
 * Vercel'de projeye bagli bir Blob deposu artik OIDC ile calisir:
 * ayri bir read-write token olusmaz, bunun yerine STORE_ID verilir ve
 * kimlik dogrulama VERCEL_OIDC_TOKEN uzerinden otomatik yapilir.
 * Eski kurulumlarda (veya Vercel disinda) BLOB_READ_WRITE_TOKEN kullanilir.
 *
 * Ikisini de destekliyoruz; hangisi varsa o.
 */
function depoAyari(): { storeId?: string } | null {
  const storeId =
    process.env.BLOB_STORE_ID ?? process.env.BLOB_READ_WRITE_TOKEN_STORE_ID;
  if (storeId) return { storeId };
  // Token varsa SDK onu ortam degiskeninden kendisi okur.
  if (process.env.BLOB_READ_WRITE_TOKEN) return {};
  return null;
}

/** Panel arayuzu bunu kullanir. */
export function depoHazirMi(): boolean {
  return depoAyari() !== null;
}

/**
 * Kayitli fiyatlari okur.
 * Depo kurulmamissa veya hata olursa bos doner - cagiran taraf
 * bunu "fiyat girilmemis" olarak yorumlar.
 */
export async function fiyatlariOku(): Promise<KayitliFiyatlar> {
  const ayar = depoAyari();
  if (!ayar) return BOS;

  try {
    // Depo "private" oldugu icin SDK uzerinden okuyoruz; dosya URL'si
    // disaridan dogrudan cekilemez. Fiyatin disariya acik olmasina
    // gerek de yok - siteye biz basiyoruz.
    const blob = await get(DOSYA, {
      ...ayar,
      access: "private",
      // Panelden kaydedilen degisiklik aninda gorunsun.
      useCache: false,
    });

    if (!blob || blob.statusCode !== 200 || !blob.stream) return BOS;

    const metin = await new Response(blob.stream).text();
    return dogrula(JSON.parse(metin) as unknown);
  } catch {
    // Dosya henuz yok, ag hatasi veya bozuk JSON - hepsinde bos don.
    return BOS;
  }
}

/** Panelden gelen veriyi kaydeder. */
export async function fiyatlariYaz(kalemler: KayitliFiyatlar["kalemler"]) {
  const ayar = depoAyari();
  if (!ayar) {
    throw new Error(
      "Depo yapılandırılmamış: Blob deposu projeye bağlanmalı.",
    );
  }

  const govde: KayitliFiyatlar = {
    guncelleme: new Date().toISOString(),
    kalemler,
  };

  await put(DOSYA, JSON.stringify(govde), {
    ...ayar,
    access: "private",
    contentType: "application/json",
    // Ayni dosyanin uzerine yaz; her kayitta yeni dosya olusmasin.
    allowOverwrite: true,
    addRandomSuffix: false,
  });

  return govde;
}

/**
 * Disaridan gelen JSON'a guvenmiyoruz: sadece bildigimiz kalem
 * adlarini ve gecerli sayilari kabul ediyoruz.
 */
function dogrula(veri: unknown): KayitliFiyatlar {
  if (typeof veri !== "object" || veri === null) return BOS;
  const v = veri as Record<string, unknown>;

  const gecerliAdlar = new Set(
    fiyatGruplari.flatMap((g) => g.kalemler.map((k) => k.ad)),
  );

  const kalemler: KayitliFiyatlar["kalemler"] = {};
  const ham = v.kalemler;

  if (typeof ham === "object" && ham !== null) {
    for (const [ad, deger] of Object.entries(ham)) {
      if (!gecerliAdlar.has(ad)) continue;
      const d = deger as Record<string, unknown>;
      const min = Number(d?.usdMin);
      const max = Number(d?.usdMax);
      if (!sayiGecerli(min) || !sayiGecerli(max)) continue;
      if (min > max) continue;
      kalemler[ad] = { usdMin: min, usdMax: max };
    }
  }

  return {
    guncelleme: typeof v.guncelleme === "string" ? v.guncelleme : "",
    kalemler,
  };
}

/** Makul aralik: 0'dan buyuk, kilo basina 100 dolardan kucuk. */
export function sayiGecerli(n: number): boolean {
  return Number.isFinite(n) && n > 0 && n < 100;
}

/**
 * Kod icindeki yapiyi depodaki rakamlarla birlestirir.
 * Arayuzun tek veri kaynagi budur.
 */
export async function fiyatlariBirlestir() {
  const kayit = await fiyatlariOku();

  const gruplar = fiyatGruplari.map((g) => ({
    ...g,
    kalemler: g.kalemler.map((k) => {
      const d = kayit.kalemler[k.ad];
      return d ? { ...k, usdMin: d.usdMin, usdMax: d.usdMax } : k;
    }),
  }));

  return { gruplar, guncelleme: kayit.guncelleme };
}
