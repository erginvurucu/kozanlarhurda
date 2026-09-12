/**
 * TCMB USD/TRY KURU
 *
 * Neden TCMB: resmi, ucretsiz ve yeniden yayinlamasi serbest.
 * LME verisi ticari lisansli oldugu icin bilerek kullanilmiyor.
 *
 * Neden kur: hurda alim fiyatlari dolara endekslidir. Fiyatlari USD
 * bazinda tutup kurla cevirince tablo her gun kendiliginden guncellenir,
 * operatorun elle rakam girmesi gerekmez.
 */

export type KurSonucu = {
  /** 1 USD kac TL */
  usd: number;
  /** TCMB bulten tarihi - gg.aa.yyyy */
  tarih: string;
  /** Veri gercekten TCMB'den mi geldi, yoksa yedege mi dusuldu */
  kaynak: "tcmb" | "yedek";
};

/**
 * TCMB'ye ulasilamazsa kullanilacak son bilinen kur.
 * Ariza aninda site fiyatsiz kalmasin diye var; tarihi de birlikte
 * gosterildigi icin ziyaretci verinin guncel olmadigini gorebilir.
 * Ayda bir elle guncellenmesi yeterli.
 */
const YEDEK: KurSonucu = {
  usd: 48.5178,
  tarih: "11.09.2026",
  kaynak: "yedek",
};

/** Kurun makul araligi - bozuk/parse edilememis veriyi yakalamak icin. */
const ALT_SINIR = 5;
const UST_SINIR = 500;

/**
 * TCMB gunluk kur bultenini ceker.
 * Bulten hafta ici ~15:30'da yayimlanir; hafta sonu ve tatillerde
 * son is gununun bulteni doner. Bu yuzden donen tarihi oldugu gibi
 * gosteriyoruz - "bugun" demiyoruz.
 */
export async function usdKuru(): Promise<KurSonucu> {
  try {
    const res = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml", {
      // 6 saatte bir tazele: bulten gunde bir kez yayimlandigi icin
      // daha sik cekmenin faydasi yok.
      next: { revalidate: 21600 },
      headers: { Accept: "application/xml" },
    });

    if (!res.ok) return YEDEK;

    const xml = await res.text();

    const usdBlok = xml.match(
      /<Currency[^>]*CurrencyCode="USD"[\s\S]*?<\/Currency>/,
    )?.[0];
    if (!usdBlok) return YEDEK;

    const ham = usdBlok.match(/<ForexSelling>([\d.,]+)<\/ForexSelling>/)?.[1];
    if (!ham) return YEDEK;

    const usd = Number(ham.replace(",", "."));
    if (!Number.isFinite(usd) || usd < ALT_SINIR || usd > UST_SINIR) {
      return YEDEK;
    }

    const tarih = xml.match(/Tarih="([^"]+)"/)?.[1] ?? YEDEK.tarih;

    return { usd, tarih, kaynak: "tcmb" };
  } catch {
    // Ag hatasi, zaman asimi, gecersiz yanit - hepsinde yedege dus.
    return YEDEK;
  }
}

/**
 * USD bazli birim fiyati TL'ye cevirir.
 *
 * Asagi yuvarlar: ilan edilen rakam odenecek rakamin ustunde olmamali.
 * Musteri kapiya yuksek beklentiyle gelip yerinde dusuk rakam duyarsa
 * guven biter - saha arastirmasindaki en sik sikayet buydu.
 */
export function tlyeCevir(usd: number, kur: number): number {
  const tl = usd * kur;
  if (tl >= 100) return Math.floor(tl / 5) * 5; // 5 TL adimlarla
  if (tl >= 10) return Math.floor(tl);
  return Math.floor(tl * 10) / 10; // kurusu onemli olan ucuz kalemler
}

/** 1.234,5 gibi Turkce bicimde yazar. */
export function tlYaz(n: number): string {
  return n.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}
