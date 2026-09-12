/**
 * Tek merkezden yonetilen site ayarlari.
 * Iletisim bilgileri degisince SADECE burayi degistir.
 */
export const site = {
  /** Kisa marka - her yerde gorunen isim. */
  name: "Kozanlar Hurda",
  /** Resmi unvan - yasal metinler, irsaliye, kurumsal yazismalar. */
  legalName: "Kozanlar Metal Geri Dönüşüm",
  domain: "kozanlarhurda.com",
  url: "https://www.kozanlarhurda.com",

  phone: "+905308404687",
  phoneDisplay: "0530 840 46 87",
  whatsapp: "905308404687",
  email: "kozanlarhurda@gmail.com",

  address: {
    mahalle: "Firuzköy Mahallesi",
    cadde: "Halide Edip Adıvar Caddesi No:15",
    ilce: "Avcılar",
    sehir: "İstanbul",
    /** Tam adres - schema.org ve footer icin */
    tam: "Firuzköy Mahallesi Halide Edip Adıvar Caddesi No:15, Avcılar / İstanbul",
    /** Google Maps arama linki */
    maps: "https://maps.google.com/?q=Firuzköy+Mahallesi+Halide+Edip+Adıvar+Caddesi+No:15+Avcılar+İstanbul",
  },

  /**
   * Marka slogani. Kurumsal ton - marka kilitlemesinin yaninda kullanilir.
   * Hero basligini DEGISTIRMEZ: orada somut vaat durur (indirme + tartim),
   * cunku saha arastirmasi musterinin soyut soze degil somut vaade
   * tepki verdigini gosterdi.
   */
  slogan: "Hurda ve Metal Alım Hizmetleri",

  description:
    "İstanbul ve Trakya genelinde yerinde hurda alımı. Bakır, alüminyum, demir ve sanayi hurdası; organize sanayi bölgelerinde tonajlı alım, irsaliyeli süreç ve periyodik anlaşma.",
  locale: "tr_TR",

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
export const mailLink = `mailto:${site.email}`;
