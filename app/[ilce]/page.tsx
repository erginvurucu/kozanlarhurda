import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ilceler, ilceBul } from "@/data/ilceler";
import { site, telLink } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";
import { StickyCallBar, CtaBlok, PhoneIcon } from "@/components/Cta";
import {
  faqSchema,
  serviceSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return ilceler.map((i) => ({ ilce: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ilce: string }>;
}): Promise<Metadata> {
  const { ilce: slug } = await params;
  const ilce = ilceBul(slug);
  if (!ilce) return {};

  const baslik = `${ilce.ad} Hurdacı — Yerinde Hurda Alımı`;
  const aciklama = `${ilce.ad} ve çevresinde yerinde hurda alımı. ${ilce.varis} içinde ekip. Keşif ve nakliye ücretsiz, ödeme yerinde nakit.`;

  return {
    title: baslik,
    description: aciklama,
    alternates: { canonical: `/${ilce.slug}` },
    openGraph: {
      title: `${baslik} | ${site.name}`,
      description: aciklama,
      url: `${site.url}/${ilce.slug}`,
    },
  };
}

export default async function IlceSayfasi({
  params,
}: {
  params: Promise<{ ilce: string }>;
}) {
  const { ilce: slug } = await params;
  const ilce = ilceBul(slug);
  if (!ilce) notFound();

  const komsular = ilce.komsu.map(ilceBul).filter((x) => x !== undefined);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Kirinti yolu */}
        <nav aria-label="Kırıntı yolu" className="text-sm text-kurum-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-lacivert-600">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/bolgeler" className="hover:text-lacivert-600">
                Bölgeler
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-kurum-700">{ilce.ad}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px]">
          <article>
            <h1 className="text-4xl font-bold leading-tight text-lacivert-900">
              {ilce.ad} Hurdacı
            </h1>
            <p className="mt-4 text-lg text-kurum-600">
              {ilce.ad} ve çevresinde yerinde hurda alımı. Ortalama varış süresi{" "}
              <strong className="text-kurum-800">{ilce.varis}</strong>.
            </p>

            <a
              href={telLink}
              data-cta="tel"
              data-bolge={ilce.slug}
              className="mt-6 dugme dugme-ana px-6 py-3.5 text-lg"
            >
              <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              {site.phoneDisplay}
            </a>

            {/* BOLGEYE OZGU ICERIK - her ilcede farkli */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-lacivert-900">
                {ilce.ad}&apos;da ne tür hurda çıkıyor?
              </h2>
              <p className="mt-4 leading-relaxed text-kurum-700">{ilce.profil}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-lacivert-900">
                Saha ve araç durumu
              </h2>
              <p className="mt-4 leading-relaxed text-kurum-700">{ilce.erisim}</p>
            </section>

            {ilce.sanayi.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-lacivert-900">
                  {ilce.ad}&apos;da hizmet verdiğimiz sanayi bölgeleri
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {ilce.sanayi.map((s) => (
                    <li
                      key={s}
                      className="rounded-sm border border-kurum-200 bg-kurum-50 px-4 py-2.5 text-kurum-700"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-lacivert-900">
                {ilce.ad} mahalleleri
              </h2>
              <p className="mt-3 text-kurum-600">
                Aşağıdaki mahallelerin tamamına ekip yönlendiriyoruz.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {ilce.mahalleler.map((m) => {
                  const alt = ilce.altSayfalar?.find((a) => a.ad === m);
                  return (
                    <li key={m}>
                      {alt ? (
                        <Link
                          href={`/${ilce.slug}/${alt.slug}`}
                          className="inline-block rounded-sm border border-fistik-300 bg-fistik-50 px-3 py-1.5 text-sm font-medium text-lacivert-800 hover:bg-fistik-100"
                        >
                          {m} →
                        </Link>
                      ) : (
                        <span className="inline-block rounded-sm border border-kurum-200 px-3 py-1.5 text-sm text-kurum-600">
                          {m}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-lacivert-900">
                {ilce.ad} için sık sorulanlar
              </h2>
              <div className="mt-6 divide-y divide-kurum-200 border-y border-kurum-200">
                {ilce.sss.map((x) => (
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

            {komsular.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-lacivert-900">
                  Yakın bölgeler
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {komsular.map((k) => (
                    <li key={k.slug}>
                      <Link
                        href={`/${k.slug}`}
                        className="inline-block rounded-sm border border-kurum-200 px-3.5 py-2 text-sm text-kurum-700 transition hover:border-fistik-500 hover:text-lacivert-600"
                      >
                        {k.ad} Hurdacı
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <CtaBlok bolge={ilce.ad} className="mt-14" />
          </article>

          {/* Yan panel: form */}
          <aside id="teklif" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <LeadForm varsayilanIlce={ilce.ad} />
          </aside>
        </div>
      </div>

      <StickyCallBar bolge={ilce.ad} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema({
            ad: `${ilce.ad} Hurda Alımı`,
            aciklama: ilce.profil,
            bolge: `${ilce.ad}, İstanbul`,
            url: `${site.url}/${ilce.slug}`,
          })
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(ilce.sss))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Bölgeler", url: "/bolgeler" },
            { ad: ilce.ad, url: `/${ilce.slug}` },
          ])
        )}
      />
    </>
  );
}
