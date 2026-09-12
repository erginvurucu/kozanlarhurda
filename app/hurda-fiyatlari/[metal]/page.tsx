import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metalSayfalari, metalBul } from "@/data/metaller";
import { fiyatYazdir } from "@/data/fiyatlar";
import { fiyatlariBirlestir } from "@/lib/fiyatDeposu";
import { usdKuru, tlYaz } from "@/lib/kur";
import { site } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";
import { CtaBlok, StickyCallBar } from "@/components/Cta";
import { faqSchema, jsonLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return metalSayfalari.map((m) => ({ metal: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metal: string }>;
}): Promise<Metadata> {
  const { metal } = await params;
  const m = metalBul(metal);
  if (!m) return {};
  return {
    title: m.baslik,
    description: m.ozet,
    alternates: { canonical: `/hurda-fiyatlari/${m.slug}` },
    openGraph: {
      title: m.baslik,
      description: m.ozet,
      url: `${site.url}/hurda-fiyatlari/${m.slug}`,
    },
  };
}

export default async function MetalSayfasi({
  params,
}: {
  params: Promise<{ metal: string }>;
}) {
  const { metal } = await params;
  const m = metalBul(metal);
  if (!m) notFound();

  const [kur, { gruplar }] = await Promise.all([
    usdKuru(),
    fiyatlariBirlestir(),
  ]);

  const grup = gruplar.find((g) => g.baslik === m.grup);
  const digerleri = metalSayfalari.filter((x) => x.slug !== m.slug);

  const kirinti = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hurda Fiyatları",
        item: `${site.url}/hurda-fiyatlari`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: m.baslik,
        item: `${site.url}/hurda-fiyatlari/${m.slug}`,
      },
    ],
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav aria-label="Kırıntı yolu" className="text-sm text-kurum-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-lacivert-600">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/hurda-fiyatlari" className="hover:text-lacivert-600">
                Hurda Fiyatları
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-kurum-700">{m.h1}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <h1 className="text-[34px] leading-tight sm:text-[40px]">{m.h1}</h1>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-kurum-600">
              {m.girizgah}
            </p>

            <dl className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-kurum-200 py-4">
              <div>
                <dt className="etiket">TCMB döviz satış</dt>
                <dd className="rakam mt-1 text-lg font-semibold text-lacivert-900">
                  {tlYaz(kur.usd)} ₺
                </dd>
              </div>
              <div>
                <dt className="etiket">Bülten tarihi</dt>
                <dd className="rakam mt-1 text-lg font-semibold text-lacivert-900">
                  {kur.tarih}
                </dd>
              </div>
            </dl>

            {/* FİYAT TABLOSU */}
            {grup && (
              <section className="mt-10">
                <h2 className="text-2xl">Güncel alım fiyatlarımız</h2>
                <div className="tasma-x mt-5">
                  <table className="w-full min-w-[420px] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-kurum-300">
                        <th scope="col" className="etiket py-3 pr-4">
                          Kalem
                        </th>
                        <th scope="col" className="etiket py-3 pr-4">
                          Fiyat
                        </th>
                        <th scope="col" className="etiket py-3">
                          <span className="sr-only">İşlem</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {grup.kalemler.map((k) => {
                        const f = fiyatYazdir(k, kur.usd);
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
                            <td className="whitespace-nowrap py-3.5 pr-4">
                              {f ? (
                                <>
                                  <span className="rakam font-semibold text-lacivert-900">
                                    {f.metin}
                                  </span>
                                  <span className="ml-1 text-sm text-kurum-500">
                                    {f.birim}
                                  </span>
                                </>
                              ) : (
                                <span className="text-kurum-500">Arayın</span>
                              )}
                            </td>
                            <td className="whitespace-nowrap py-3.5">
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
                <p className="mt-3 text-sm text-kurum-500">
                  Fiyatlar dolara endekslidir ve TCMB günlük kuruyla
                  güncellenir. Kesin rakam cins, temizlik ve miktara göre
                  yerinde netleşir.
                </p>
              </section>
            )}

            {/* FİYATI ETKİLEYEN */}
            <section className="mt-14">
              <h2 className="text-2xl">Fiyatı ne belirliyor?</h2>
              <div className="mt-6 grid gap-px border border-kurum-200 bg-kurum-200 sm:grid-cols-2">
                {m.fiyatiEtkileyen.map((x) => (
                  <div key={x.baslik} className="bg-white p-5">
                    <h3 className="text-lg">{x.baslik}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-kurum-600">
                      {x.metin}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* HAZIRLIK */}
            <section className="mt-14">
              <h2 className="text-2xl">Satmadan önce</h2>
              <p className="mt-3 max-w-prose text-kurum-600">
                Küçük bir hazırlık, aldığınız rakamı belirgin şekilde
                değiştirebilir.
              </p>
              <ul className="mt-5 flex flex-col">
                {m.hazirlik.map((h) => (
                  <li
                    key={h}
                    className="border-b border-kurum-200 py-3 pl-5 leading-relaxed text-kurum-700 first:border-t"
                    style={{ textIndent: "-1.25rem" }}
                  >
                    <span className="mr-2.5 inline-block text-fistik-600">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* SSS */}
            <section className="mt-14">
              <h2 className="text-2xl">Sık sorulanlar</h2>
              <div className="mt-5 border-t border-kurum-200">
                {m.sss.map((x) => (
                  <details key={x.s} className="group border-b border-kurum-200">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-4 font-semibold text-lacivert-900 hover:text-lacivert-600">
                      <span>{x.s}</span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-2xl font-light leading-none text-kurum-400 transition-transform group-open:rotate-45 group-open:text-fistik-600"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-prose pb-5 pr-8 leading-relaxed text-kurum-600">
                      {x.c}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* DİĞER METALLER */}
            <section className="mt-14">
              <p className="etiket">Diğer kalemler</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {digerleri.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/hurda-fiyatlari/${d.slug}`}
                      className="inline-block border border-kurum-200 bg-white px-3 py-1.5 text-sm text-kurum-700 transition-colors hover:border-lacivert-600 hover:text-lacivert-700"
                    >
                      {d.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <CtaBlok className="mt-14" />
          </div>

          <aside id="teklif" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <LeadForm />
          </aside>
        </div>
      </div>

      <StickyCallBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(m.sss))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(kirinti)}
      />
    </>
  );
}
