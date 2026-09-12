export type SSS = { s: string; c: string };

export type Mahalle = {
  slug: string;
  ad: string;
  /** Bu mahalleye ozgu, tekrar etmeyen aciklama. */
  profil: string;
  sss?: SSS[];
};

export type Sehir = "İstanbul" | "Tekirdağ" | "Kırklareli";

export type Ilce = {
  slug: string;
  ad: string;
  /** Hangi il. Belirtilmezse Istanbul kabul edilir. */
  sehir?: Sehir;
  /** Sadece Istanbul icin anlamli; Trakya ilcelerinde bos birakilir. */
  yaka?: "avrupa" | "anadolu";
  /** Oncelikli ilceler elle yazilmis zengin icerige sahiptir. */
  oncelik?: boolean;
  /** Gercek mahalle adlari - icerik farklilasmasinin temeli. */
  mahalleler: string[];
  /** Bolgedeki sanayi siteleri / OSB / toplu konut alanlari. */
  sanayi: string[];
  /** Bu ilcenin hurda profili - her ilcede FARKLI olmali. */
  profil: string;
  /** Arac erisimi ve saha notu. */
  erisim: string;
  /**
   * Varis bilgisi. Istanbul'da dakika cinsinden ("Ortalama 30-45 dakika"),
   * Trakya'da randevu esasli ("Randevulu, tonaja gore planlanir") yazilir -
   * sanayi isinde ekip ayni gun degil, planlanan gun gider.
   */
  varis: string;
  /** Komsu ilce sluglari - ic linkleme icin. */
  komsu: string[];
  /** Ilceye ozgu SSS. */
  sss: SSS[];
  /** Detay sayfasi olan mahalleler. */
  altSayfalar?: Mahalle[];
};
