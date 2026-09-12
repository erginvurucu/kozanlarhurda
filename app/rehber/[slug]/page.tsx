import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { yazilar, yaziBul, okumaSuresi, type Blok } from "@/data/rehber";
import { site } from "@/lib/site";
import { CtaBlok, StickyCallBar } from "@/components/Cta";
import { faqSchema, jsonLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return yazilar.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const y = yaziBul(slug);
  if (!y) return {};

  return {
    title: y.baslik,
    description: y.ozet,
    alternates: { canonical: `/rehber/${y.slug}` },
    openGraph: {
      type: "article",
      title: y.baslik,
      description: y.ozet,
      url: `${site.url}/rehber/${y.slug}`,
      publishedTime: y.tarih,
    },
  };
}

const tarihYaz = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function BlokCiz({ b }: { b: Blok }) {
  if (b.tip === "p") {
    return <p className="mt-4 leading-[1.75] text-kurum-700">{b.metin}</p>;
  }

  if (b.tip === "liste") {
    return (
      <ul className="mt-5 flex flex-col">
        {b.maddeler.map((m) => (
          <li
            key={m}
            className="border-b border-kurum-200 py-2.5 pl-5 leading-relaxed text-kurum-700 first:border-t"
            style={{ textIndent: "-1.25rem" }}
          >
            <span className="mr-2.5 inline-block text-fistik-600">—</span>
            {m}
          </li>
        ))}
      </ul>
    );
  }

  if (b.tip === "sirali") {
    return (
      <ol className="mt-5 flex flex-col">
        {b.maddeler.map((m, i) => (
          <li
            key={m}
            className="flex gap-4 border-b border-kurum-200 py-3 first:border-t"
          >
            <span className="rakam shrink-0 font-semibold text-kurum-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="leading-relaxed text-kurum-700">{m}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <aside className="mt-6 border-l-[3px] border-fistik-500 bg-kurum-50 px-5 py-4">
      <p className="font-baslik font-bold text-lacivert-900">{b.baslik}</p>
      <p className="mt-1.5 leading-relaxed text-kurum-700">{b.metin}</p>
    </aside>
  );
}

export default async function YaziSayfasi({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const y = yaziBul(slug);
  if (!y) notFound();

  const digerleri = yazilar.filter((x) => x.slug !== y.slug).slice(0, 3);

  const makaleSemasi = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: y.baslik,
    description: y.ozet,
    datePublished: y.tarih,
    dateModified: y.tarih,
    inLanguage: "tr-TR",
    mainEntityOfPage: `${site.url}/rehber/${y.slug}`,
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  const kirintiSemasi = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rehber",
        item: `${site.url}/rehber`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: y.baslik,
        item: `${site.url}/rehber/${y.slug}`,
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
              <Link href="/rehber" className="hover:text-lacivert-600">
                Rehber
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-kurum-700">{y.kategori}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="max-w-[68ch]">
            <header className="border-b border-kurum-200 pb-7">
              <div className="flex items-center gap-3">
                <span className="etiket etiket-fistik">{y.kategori}</span>
                <span className="rakam text-[11px] text-kurum-400">
                  {okumaSuresi(y)} dk okuma
                </span>
              </div>

              <h1 className="mt-3 text-[32px] leading-[1.15] sm:text-[40px]">
                {y.baslik}
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-kurum-600">
                {y.girizgah}
              </p>

              <p className="rakam mt-5 text-xs text-kurum-400">
                <time dateTime={y.tarih}>{tarihYaz(y.tarih)}</time>
              </p>
            </header>

            {y.bolumler.map((b) => (
              <section key={b.baslik} className="mt-10">
                <h2 className="text-[24px] leading-snug">{b.baslik}</h2>
                {b.bloklar.map((blok, i) => (
                  <BlokCiz key={i} b={blok} />
                ))}
              </section>
            ))}

            {y.sss && y.sss.length > 0 && (
              <section className="mt-14">
                <h2 className="text-[24px]">Sık sorulanlar</h2>
                <div className="mt-5 border-t border-kurum-200">
                  {y.sss.map((x) => (
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
                      <p className="pb-5 pr-8 leading-relaxed text-kurum-600">
                        {x.c}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <CtaBlok className="mt-14" />
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="etiket">Diğer yazılar</p>
            <ul className="mt-4 flex flex-col">
              {digerleri.map((d) => (
                <li key={d.slug} className="border-b border-kurum-200 first:border-t">
                  <Link
                    href={`/rehber/${d.slug}`}
                    className="block py-4 hover:text-lacivert-600"
                  >
                    <span className="etiket etiket-fistik">{d.kategori}</span>
                    <span className="mt-1.5 block font-semibold leading-snug text-lacivert-900">
                      {d.baslik}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="evrak-vurgu mt-8 p-5">
              <p className="etiket">Bölgeniz</p>
              <p className="mt-2 text-sm leading-relaxed text-kurum-600">
                İstanbul&apos;un 39 ilçesi ile Tekirdağ ve Kırklareli
                organize sanayi bölgelerinde yerinde alım yapıyoruz.
              </p>
              <Link
                href="/bolgeler"
                className="bag-alti mt-3 inline-block text-sm font-semibold text-lacivert-700"
              >
                Tüm bölgeler
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <StickyCallBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(makaleSemasi)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(kirintiSemasi)}
      />
      {y.sss && y.sss.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(faqSchema(y.sss))}
        />
      )}
    </>
  );
}
