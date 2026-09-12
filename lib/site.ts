/**
 * Tek merkezden yonetilen site ayarlari.
 * Iletisim bilgileri netlesince SADECE burayi degistir.
 */
export const site = {
  /** Kisa marka - her yerde gorunen isim. */
  name: "Kozanlar Hurda",
  /** Resmi unvan - yasal metinler, irsaliye, kurumsal yazismalar. */
  legalName: "Kozanlar Metal Geri Dönüşüm",
  /** Markanin kisa adi - basili malzeme, telefon, sozlu kullanim. */
  domain: "kozanlarhurda.com",
  /**
   * Kanonik adres. Vercel siteyi www'de yayinliyor ve koku (apex) oraya
   * 308 ile yonlendiriyor; canonical / sitemap / robots / JSON-LD bu adresle
   * birebir ayni olmali, yoksa her sitemap URL'i bir yonlendirmeye carpar.
   * Vercel'de kok adres birincil yapilirsa burayi www'siz hale getir.
   */
  url: "https://www.kozanlarhurda.com",
  // TODO: gercek numara ile degistir
  phone: "+905555555555",
  phoneDisplay: "0555 555 55 55",
  whatsapp: "905555555555",
  email: "info@kozanlarhurda.com",
  description:
    "İstanbul genelinde yerinde hurda alımı. Bakır, alüminyum, demir, beyaz eşya ve sanayi hurdası için ücretsiz keşif, indirme dahil, tartım gözünüzün önünde.",
  locale: "tr_TR",

  /**
   * Saha arastirmasindan cikan ana vaat.
   * Ekside en cok sikayet edilen konu: hurdacinin esyayi indirmek icin
   * musteriden USTE para istemesi. Hicbir rakip bunun tersini yazmiyor.
   */
  sozler: [
    "İndirme dahil — üste para istemeyiz",
    "Tartım gözünüzün önünde, kalibreli kantarla",
    "Ödeme teslim anında, nakit",
  ],
} as const;

export const waLink = (mesaj?: string) =>
  `https://wa.me/${site.whatsapp}${
    mesaj ? `?text=${encodeURIComponent(mesaj)}` : ""
  }`;

export const telLink = `tel:${site.phone}`;
