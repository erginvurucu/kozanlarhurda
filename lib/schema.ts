import { site } from "./site";

/**
 * JSON-LD uretici yardimcilari.
 * NOT: LocalBusiness semasinda "address" alani ancak DOGRULANMIS bir
 * fiziksel adres oldugunda doldurulmalidir. Uydurma adres hem Google
 * yaptirimi hem de guven kaybi sebebidir; bu yuzden adres opsiyonel.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.mahalle} ${site.address.cadde}`,
      addressLocality: site.address.ilce,
      addressRegion: site.address.sehir,
      addressCountry: "TR",
    },
    areaServed: { "@type": "City", name: "İstanbul" },
    hasMap: site.address.maps,
  };
}

export function serviceSchema(opts: {
  ad: string;
  aciklama: string;
  bolge: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hurda alımı",
    name: opts.ad,
    description: opts.aciklama,
    url: opts.url,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Place", name: opts.bolge },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: site.phone,
      serviceUrl: opts.url,
    },
  };
}

export function faqSchema(sss: { s: string; c: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sss.map((x) => ({
      "@type": "Question",
      name: x.s,
      acceptedAnswer: { "@type": "Answer", text: x.c },
    })),
  };
}

export function breadcrumbSchema(items: { ad: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.ad,
      item: `${site.url}${x.url}`,
    })),
  };
}

/** <script type="application/ld+json"> icerigi icin guvenli serilestirme. */
export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
