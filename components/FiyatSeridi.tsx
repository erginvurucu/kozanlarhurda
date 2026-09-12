import Link from "next/link";
import { fiyatYazdir, type FiyatKalemi, type FiyatGrubu } from "@/data/fiyatlar";
import { fiyatlariBirlestir } from "@/lib/fiyatDeposu";
import { usdKuru, tlYaz } from "@/lib/kur";

/**
 * Ana sayfadaki fiyat seridi.
 *
 * En cok aranan kalemleri TCMB kuruyla guncellenmis TL karsiliklariyla
 * gosterir. Hicbir kaleme fiyat girilmemisse sayisal bir sey uydurmaz -
 * tabloya yonlendiren sade bir serit gosterir.
 */

/** Seritte gosterilecek kalemler - arama hacmine gore secildi. */
const VITRIN = [
  "Soyma Bakır",
  "Araiş Sarı MS70",
  "PTT Kablo",
  "Alüminyum Profil",
  "Ekstra Hurda",
  "Krom",
];

function kalemBul(gruplar: FiyatGrubu[], ad: string): FiyatKalemi | undefined {
  for (const grup of gruplar) {
    const k = grup.kalemler.find((x) => x.ad === ad);
    if (k) return k;
  }
  return undefined;
}

export async function FiyatSeridi() {
  const [kur, { gruplar }] = await Promise.all([
    usdKuru(),
    fiyatlariBirlestir(),
  ]);

  const satirlar = VITRIN.map((ad) => {
    const kalem = kalemBul(gruplar, ad);
    return kalem
      ? { ad, kisaAd: kisalt(ad), fiyat: fiyatYazdir(kalem, kur.usd) }
      : null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  const fiyatliOlanlar = satirlar.filter((s) => s.fiyat !== null);

  // Hicbir fiyat girilmemis: rakam uydurmak yerine tabloya yonlendir.
  if (fiyatliOlanlar.length === 0) {
    return (
      <section className="border-y border-kurum-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="etiket">Güncel fiyatlar</p>
            <p className="mt-1.5 text-kurum-700">
              Hurda fiyatları dolara endekslidir ve her gün değişir. Günün
              rakamı için bizi arayın.
            </p>
          </div>
          <Link
            href="/hurda-fiyatlari"
            className="dugme dugme-cerceve shrink-0 px-5 py-3 text-[15px]"
          >
            Fiyat listesini gör
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-y border-kurum-200 bg-white"
      aria-labelledby="fiyat-seridi-baslik"
    >
      <div className="mx-auto max-w-6xl px-4 py-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2
            id="fiyat-seridi-baslik"
            className="text-xl sm:text-2xl"
          >
            Bugünkü alım fiyatlarımız
          </h2>

          <p className="rakam text-xs text-kurum-500">
            TCMB {kur.tarih} · 1 USD = {tlYaz(kur.usd)} ₺
            {kur.kaynak === "yedek" && " (son bilinen)"}
          </p>
        </div>

        <ul className="mt-5 grid gap-px border border-kurum-200 bg-kurum-200 sm:grid-cols-2 lg:grid-cols-3">
          {fiyatliOlanlar.map((s) => (
            <li key={s.ad} className="bg-white px-4 py-3.5">
              <p className="etiket truncate" title={s.ad}>
                {s.kisaAd}
              </p>
              <p className="mt-1.5">
                <span className="rakam text-xl font-semibold text-lacivert-900">
                  {s.fiyat!.metin}
                </span>
                <span className="ml-1 text-sm text-kurum-500">
                  {s.fiyat!.birim}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-prose text-sm text-kurum-500">
            Rakamlar alım aralığıdır; kesin fiyat hurdanın cinsine,
            temizliğine ve miktarına göre yerinde netleşir.
          </p>
          <Link
            href="/hurda-fiyatlari"
            className="bag-alti text-[15px] font-semibold text-lacivert-700"
          >
            Tüm fiyat listesi
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Serit dar oldugu icin parantezli uzun aciklamalari kirpar. */
function kisalt(ad: string): string {
  return ad.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
