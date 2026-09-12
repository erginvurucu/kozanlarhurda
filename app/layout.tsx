import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationSchema, jsonLd } from "@/lib/schema";
import { Header, Footer } from "@/components/Chrome";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — İstanbul Geneli Yerinde Hurda Alımı`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} — İstanbul Geneli Yerinde Hurda Alımı`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  /* Google Search Console dogrulamasi - HTML etiketi yontemi.
     <meta name="google-site-verification" ...> olarak basilir. */
  verification: {
    google: "iCDr6VVt-MaAlm5ongnIn2frtj9gQoek6G56jFROX7U",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#27348b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-lacivert-900 focus:px-4 focus:py-2 focus:text-white"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
      </body>
    </html>
  );
}
