import type { Metadata } from "next";
import Link from "next/link";
import { fiyatYazdir } from "@/data/fiyatlar";
import { metalSayfalari } from "@/data/metaller";
import { fiyatlariBirlestir } from "@/lib/fiyatDeposu";
import { usdKuru, tlYaz } from "@/lib/kur";
import { site } from "@/lib/site";
import { CtaBlok, StickyCallBar } from "@/components/Cta";
import { LeadForm } from "@/components/LeadForm";
import { faqSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Güncel Hurda Fiyatları",
  description:
    "Bakır, alüminyum, pirinç, demir, paslanmaz ve beyaz eşya hurda alım fiyatları. Güncel piyasa üzerinden yerinde tartım ve nakit ödeme.",
  alternates: { canonical: "/hurda-fiyatlari" },
};

const SSS = [
  {
    s: "Hurda fiyatları neden sürekli değişiyor?",
    c: "Hurda metal fiyatları Londra Metal Borsası (LME) endeksine ve döviz kuruna bağlı olarak günlük değişir. Bu yüzden bir hafta önceki fiyat bugün geçerli olmayabilir; kesin rakam için aramanız en doğrusu.",
  },
  {
    s: "Kilo fiyatı miktara göre değişir mi?",
    c: "Evet. Özellikle demir ve sanayi hurdasında tonajlı partilerde kilo fiyatı perakende alımdan belirgin şekilde yüksek olur.",
  },
  {
    s: "Bakır kablonun soyulmuş ve soyulmamış hali arasında fark var mı?",
    c: "Evet, ciddi fark var. Soyulmamış kabloda fiyat, kablonun bakır oranına göre belirlenir. Kalın kesitli kablolarda bakır oranı yüksek olduğu için fiyat da yükselir.",
  },
  {
    s: "Tartım nasıl yapılıyor?",
    c: "Perakende alımlarda tartım sizin gözünüzün önünde kalibreli kantarla yapılır. Tonajlı alımlarda araç dolu-boş tartılır ve kantar fişi size teslim edilir.",
  },
  {
    s: "Fiyatı beğenmezsem ne oluyor?",
    c: "Hiçbir şey. Keşif ve fiyat verme ücretsizdir, herhangi bir yükümlülük doğurmaz.",
  },
];

export default async function FiyatlarSayfasi() {
  const [kur, { gruplar: fiyatGruplari }] = await Promise.all([
    usdKuru(),
    fiyatlariBirlestir(),
  ]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl font-bold text-lacivert-900">
          Güncel Hurda Fiyatları
        </h1>
        <p className="mt-4 max-w-prose text-lg text-kurum-600">
          Hurda fiyatları dolara endekslidir; tablo TCMB günlük kuruyla her gün
          kendiliğinden güncellenir. Kesin rakam hurdanın cinsine, temizliğine
          ve miktarına göre yerinde netleşir.
        </p>

        <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-kurum-200 py-4">
          <div>
            <dt className="etiket">TCMB döviz satış</dt>
            <dd className="rakam mt-1 text-lg font-semibold text-lacivert-900">
              {tlYaz(kur.usd)} ₺
              <span className="ml-1.5 text-sm font-normal text-kurum-500">
                / 1 USD
              </span>
            </dd>
          </div>
          <div>
            <dt className="etiket">Bülten tarihi</dt>
            <dd className="rakam mt-1 text-lg font-semibold text-lacivert-900">
              {kur.tarih}
            </dd>
          </div>
          {kur.kaynak === "yedek" && (
            <p className="text-sm text-damga-500">
              TCMB servisine şu an ulaşılamıyor; son bilinen kur gösteriliyor.
            </p>
          )}
        </dl>

        <nav aria-label="Metal kalemleri" className="mt-8">
          <p className="etiket">Kaleme göre</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {metalSayfalari.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/hurda-fiyatlari/${m.slug}`}
                  className="inline-block border border-kurum-200 bg-white px-3.5 py-2 text-sm font-medium text-kurum-700 transition-colors hover:border-lacivert-600 hover:text-lacivert-700"
                >
                  {m.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            {fiyatGruplari.map((grup) => (
              <section key={grup.baslik} className="mb-12">
                <h2 className="text-2xl font-bold text-lacivert-900">
                  {grup.baslik}
                </h2>
                <p className="mt-2 text-kurum-600">{grup.aciklama}</p>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-kurum-300">
                        <th scope="col" className="py-3 pr-4 font-semibold text-kurum-800">
                          Kalem
                        </th>
                        <th scope="col" className="py-3 pr-4 font-semibold text-kurum-800">
                          Fiyat
                        </th>
                        <th scope="col" className="py-3 font-semibold text-kurum-800">
                          <span className="sr-only">İşlem</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {grup.kalemler.map((k) => {
                        const fiyat = fiyatYazdir(k, kur.usd);
                        return (
                          <tr key={k.ad} className="border-b border-kurum-200">
                            <td className="py-3.5 pr-4">
                              <span className="font-medium text-kurum-800">
                                {k.ad}
                              </span>
                              {k.not && (
                                <span className="mt-0.5 block text-sm text-kurum-500">
                                  {k.not}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 pr-4 whitespace-nowrap">
                              {fiyat ? (
                                <>
                                  <span className="rakam font-semibold text-lacivert-900">
                                    {fiyat.metin}
                                  </span>
                                  <span className="ml-1 text-sm text-kurum-500">
                                    {fiyat.birim}
                                  </span>
                                </>
                              ) : (
                                <span className="text-kurum-500">Arayın</span>
                              )}
                            </td>
                            <td className="py-3.5 whitespace-nowrap">
                              <a
                                href="#teklif"
                                className="text-sm font-semibold text-lacivert-600 underline underline-offset-4"
                              >
                                Fiyat al
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}

            <section className="mt-4">
              <h2 className="text-2xl font-bold text-lacivert-900">
                Fiyatlar hakkında sık sorulanlar
              </h2>
              <div className="mt-6 divide-y divide-kurum-200 border-y border-kurum-200">
                {SSS.map((x) => (
                  <details key={x.s} className="group py-5">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-lacivert-900">
                      {x.s}
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-lacivert-600 transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-kurum-600">{x.c}</p>
                  </details>
                ))}
              </div>
            </section>

            <CtaBlok className="mt-12" />
          </div>

          <aside id="teklif" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <LeadForm />
          </aside>
        </div>
      </div>

      <StickyCallBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(SSS))}
      />
    </>
  );
}
