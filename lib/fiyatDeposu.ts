import { put, list } from "@vercel/blob";
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

function tokenVarMi(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/**
 * Kayitli fiyatlari okur.
 * Depo kurulmamissa veya hata olursa bos doner - cagiran taraf
 * bunu "fiyat girilmemis" olarak yorumlar.
 */
export async function fiyatlariOku(): Promise<KayitliFiyatlar> {
  if (!tokenVarMi()) return BOS;

  try {
    const { blobs } = await list({ prefix: DOSYA, limit: 1 });
    const blob = blobs.find((b) => b.pathname === DOSYA);
    if (!blob) return BOS;

    const res = await fetch(blob.url, { next: { revalidate: 60 } });
    if (!res.ok) return BOS;

    const veri = (await res.json()) as unknown;
    return dogrula(veri);
  } catch {
    return BOS;
  }
}

/** Panelden gelen veriyi kaydeder. */
export async function fiyatlariYaz(kalemler: KayitliFiyatlar["kalemler"]) {
  if (!tokenVarMi()) {
    throw new Error(
      "Depo yapılandırılmamış: Vercel'de Blob store oluşturulmalı.",
    );
  }

  const govde: KayitliFiyatlar = {
    guncelleme: new Date().toISOString(),
    kalemler,
  };

  await put(DOSYA, JSON.stringify(govde), {
    access: "public",
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
