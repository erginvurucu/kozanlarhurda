export type SSS = { s: string; c: string };

export type Mahalle = {
  slug: string;
  ad: string;
  /** Bu mahalleye ozgu, tekrar etmeyen aciklama. */
  profil: string;
  sss?: SSS[];
};

export type Ilce = {
  slug: string;
  ad: string;
  yaka: "avrupa" | "anadolu";
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
  /** Yaklasik varis suresi. */
  varis: string;
  /** Komsu ilce sluglari - ic linkleme icin. */
  komsu: string[];
  /** Ilceye ozgu SSS. */
  sss: SSS[];
  /** Detay sayfasi olan mahalleler. */
  altSayfalar?: Mahalle[];
};
