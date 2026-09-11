import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ilceBul, mahalleBul, tumMahalleRotalari } from "@/data/ilceler";
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
  return tumMahalleRotalari();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ilce: string; mahalle: string }>;
}): Promise<Metadata> {
  const { ilce: iSlug, mahalle: mSlug } = await params;
  const ilce = ilceBul(iSlug);
  const mahalle = mahalleBul(iSlug, mSlug);
  if (!ilce || !mahalle) return {};

  const baslik = `${mahalle.ad} Hurdacı (${ilce.ad}) — Yerinde Hurda Alımı`;
  const aciklama = `${ilce.ad} ${mahalle.ad}'de yerinde hurda alımı. Keşif ve nakliye ücretsiz, ödeme yerinde nakit.`;

  return {
    title: baslik,
    description: aciklama,
    alternates: { canonical: `/${ilce.slug}/${mahalle.slug}` },
    openGraph: {
      title: `${baslik} | ${site.name}`,
      description: aciklama,
      url: `${site.url}/${ilce.slug}/${mahalle.slug}`,
    },
  };
}

export default async function MahalleSayfasi({
  params,
}: {
  params: Promise<{ ilce: string; mahalle: string }>;
}) {
  const { ilce: iSlug, mahalle: mSlug } = await params;
  const ilce = ilceBul(iSlug);
  const mahalle = mahalleBul(iSlug, mSlug);
  if (!ilce || !mahalle) notFound();

  const kardesler = (ilce.altSayfalar ?? []).filter((m) => m.slug !== mahalle.slug);
  const sss = mahalle.sss ?? ilce.sss.slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav aria-label="Kırıntı yolu" className="text-sm text-celik-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-bakir-600">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${ilce.slug}`} className="hover:text-bakir-600">
                {ilce.ad}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-celik-700">{mahalle.ad}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px]">
          <article>
            <h1 className="text-4xl font-bold leading-tight text-celik-900">
              {mahalle.ad} Hurdacı
            </h1>
            <p className="mt-4 text-lg text-celik-600">
              {ilce.ad} {mahalle.ad} ve yakın çevresinde yerinde hurda alımı.
            </p>

            <a
              href={telLink}
              data-cta="tel"
              data-bolge={`${ilce.slug}-${mahalle.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-bakir-500 px-6 py-3.5 text-lg font-semibold text-white transition hover:bg-bakir-600"
            >
              <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              {site.phoneDisplay}
            </a>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-celik-900">
                {mahalle.ad}&apos;de durum
              </h2>
              <p className="mt-4 leading-relaxed text-celik-700">
                {mahalle.profil}
              </p>
            </section>

            <section className="mt-10 rounded-2xl border border-celik-200 bg-celik-50 p-6">
              <h2 className="text-lg font-bold text-celik-900">
                {ilce.ad} geneli
              </h2>
              <p className="mt-3 leading-relaxed text-celik-600">
                {ilce.erisim}
              </p>
              <Link
                href={`/${ilce.slug}`}
                className="mt-4 inline-block font-semibold text-bakir-600 underline underline-offset-4"
              >
                {ilce.ad} hurdacı sayfasına git
              </Link>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-celik-900">
                Sık sorulanlar
              </h2>
              <div className="mt-6 divide-y divide-celik-200 border-y border-celik-200">
                {sss.map((x) => (
                  <details key={x.s} className="group py-5">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-celik-900">
                      {x.s}
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-bakir-500 transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-celik-600">{x.c}</p>
                  </details>
                ))}
              </div>
            </section>

            {kardesler.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-celik-900">
                  {ilce.ad}&apos;ın diğer mahalleleri
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {kardesler.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/${ilce.slug}/${m.slug}`}
                        className="inline-block rounded-lg border border-celik-200 px-3.5 py-2 text-sm text-celik-700 transition hover:border-bakir-400 hover:text-bakir-600"
                      >
                        {m.ad} Hurdacı
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <CtaBlok bolge={`${ilce.ad} ${mahalle.ad}`} className="mt-14" />
          </article>

          <aside id="teklif" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <LeadForm varsayilanIlce={ilce.ad} />
          </aside>
        </div>
      </div>

      <StickyCallBar bolge={`${ilce.ad} ${mahalle.ad}`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema({
            ad: `${mahalle.ad} Hurda Alımı`,
            aciklama: mahalle.profil,
            bolge: `${mahalle.ad}, ${ilce.ad}, İstanbul`,
            url: `${site.url}/${ilce.slug}/${mahalle.slug}`,
          })
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(sss))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: ilce.ad, url: `/${ilce.slug}` },
            { ad: mahalle.ad, url: `/${ilce.slug}/${mahalle.slug}` },
          ])
        )}
      />
    </>
  );
}
