/**
 * HURDA ALIM FIYATLARI — USD BAZLI
 *
 * Bu dosya YAPIYI ve VARSAYILAN degerleri tutar.
 * Yonetim panelinden (/yonetim) girilen rakamlar bunlarin uzerine yazilir;
 * birlestirme lib/fiyatDeposu.ts icinde yapilir.
 *
 * NEDEN TL DEGIL USD
 * Hurda piyasasi dolara endekslidir. Degerler dolar tutuldugu icin site
 * TCMB gunluk kuruyla TL'ye cevirir ve kur her oynadiginda fiyatlar
 * kendiliginden guncellenir. TL yazilsaydi her kur hareketinde tablo
 * yanlis kalirdi.
 *
 * KALEM ADLARI
 * Piyasanin kendi terminolojisi kullanildi (Soyma Bakir, Kirkambar, DKP,
 * Ekstra Hurda...). Bunlar hem sektorde konusulan dil hem de ayri ayri
 * arama terimleri; genel adlandirmaya gore hem guven hem gorunurluk
 * kazandiriyor.
 *
 * ⚠️ Kalem adi degistirirsen panelde o kaleme girilmis kayit duser
 * (dogrulama bilinmeyen adlari eler). Ad degisikliginden sonra paneli
 * bir kez daha kaydet.
 */

import { tlyeCevir, tlYaz } from "@/lib/kur";

export type FiyatKalemi = {
  ad: string;
  birim: "kg" | "adet";
  usdMin: number | null;
  usdMax: number | null;
  not?: string;
};

export type FiyatGrubu = {
  baslik: string;
  aciklama: string;
  kalemler: FiyatKalemi[];
};

export const fiyatGruplari: FiyatGrubu[] = [
  {
    baslik: "Bakır",
    aciklama:
      "Hurdanın en değerli kalemi. Temizliği ve cinsi fiyatı belirgin şekilde değiştirir.",
    kalemler: [
      { ad: "Soyma Bakır", birim: "kg", usdMin: 12.594, usdMax: 12.594 },
      { ad: "Lama Bakır", birim: "kg", usdMin: 12.59, usdMax: 12.59 },
      { ad: "Boru Bakır", birim: "kg", usdMin: 12.542, usdMax: 12.542 },
      { ad: "Kırkambar Bakır", birim: "kg", usdMin: 10.887, usdMax: 10.887, not: "Karışık kalite" },
      { ad: "Bakır Talaşı", birim: "kg", usdMin: 11.436, usdMax: 11.436 },
      { ad: "Kalorifer / klima bakırı", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Sarı (pirinç)",
    aciklama:
      "Tesisat ve makine aksamından çıkan yüksek değerli grup. Alaşım oranı fiyatı doğrudan etkiler.",
    kalemler: [
      { ad: "Araiş Sarı MS70", birim: "kg", usdMin: 9.158, usdMax: 9.158 },
      { ad: "Araiş Sarı MS64", birim: "kg", usdMin: 8.974, usdMax: 8.974 },
      { ad: "Sarı Çubuk", birim: "kg", usdMin: 6.591, usdMax: 6.591 },
      { ad: "Sarı Talaşı", birim: "kg", usdMin: 6.195, usdMax: 6.195 },
      { ad: "Musluk Sarı", birim: "kg", usdMin: 6.194, usdMax: 6.194 },
      { ad: "Sarı Kırkambar", birim: "kg", usdMin: 6.183, usdMax: 6.183 },
      { ad: "Bronz", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Kurşun", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Çinko", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Kablo",
    aciklama:
      "Fiyat kablonun bakır oranına göre belirlenir. Kalın kesitli kabloda bakır oranı yüksek olduğu için fiyat da yükselir.",
    kalemler: [
      { ad: "PTT Kablo", birim: "kg", usdMin: 9.741, usdMax: 9.741 },
      { ad: "Şantiye Kablosu", birim: "kg", usdMin: 6.873, usdMax: 6.873 },
      { ad: "Karışık Kablo", birim: "kg", usdMin: 4.051, usdMax: 4.051 },
    ],
  },
  {
    baslik: "Alüminyum",
    aciklama: "Cinsine göre ciddi fiyat farkı olan bir grup.",
    kalemler: [
      { ad: "Alüminyum Tel", birim: "kg", usdMin: 2.88, usdMax: 2.88 },
      { ad: "Alüminyum Ofset", birim: "kg", usdMin: 2.778, usdMax: 2.778 },
      { ad: "Alüminyum Jant", birim: "kg", usdMin: 2.573, usdMax: 2.573 },
      { ad: "Alüminyum Profil", birim: "kg", usdMin: 2.477, usdMax: 2.477 },
      { ad: "Alüminyum döküm", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Alüminyum talaş", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Alüminyum radyatör", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Demir ve çelik",
    aciklama:
      "Tonajlı işlerin ana kalemi. Miktar arttıkça kilo fiyatı da yukarı çekilir.",
    kalemler: [
      { ad: "DKP Hurda", birim: "kg", usdMin: 0.309, usdMax: 0.309 },
      { ad: "Ekstra Hurda", birim: "kg", usdMin: 0.3, usdMax: 0.3, not: "Kalın sac ve profil" },
      { ad: "Toplama Hurda", birim: "kg", usdMin: 0.268, usdMax: 0.268, not: "Karışık" },
      { ad: "Teneke Hurda", birim: "kg", usdMin: 0.228, usdMax: 0.228 },
      { ad: "Demir Talaşı", birim: "kg", usdMin: 0.185, usdMax: 0.185 },
      { ad: "Dökme demir (pik)", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Krom ve paslanmaz",
    aciklama: "Mutfak ekipmanı, tesisat ve sanayi tesislerinden çıkar.",
    kalemler: [
      { ad: "Krom", birim: "kg", usdMin: 1.027, usdMax: 1.027, not: "Paslanmaz 304" },
      { ad: "Paslanmaz (316)", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Beyaz eşya ve ev hurdası",
    aciklama:
      "Çalışır durumdaki cihazlarda hurda kilo fiyatı değil, ikinci el değeri konuşulur.",
    kalemler: [
      { ad: "Buzdolabı", birim: "adet", usdMin: null, usdMax: null },
      { ad: "Çamaşır makinesi", birim: "adet", usdMin: null, usdMax: null },
      { ad: "Bulaşık makinesi", birim: "adet", usdMin: null, usdMax: null },
      { ad: "Fırın / ocak", birim: "adet", usdMin: null, usdMax: null },
      { ad: "Kombi", birim: "adet", usdMin: null, usdMax: null },
      { ad: "Klima (iç + dış ünite)", birim: "adet", usdMin: null, usdMax: null },
      { ad: "Petek / radyatör", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Akü", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
];

/**
 * Kalemin TL karsiligini yazar. Kur disaridan verilir (lib/kur.ts),
 * boylece veri katmani ag cagrisi yapmaz ve test edilebilir kalir.
 * Fiyat girilmemisse `null` doner ve arayuz "Arayın" gosterir.
 */
export function fiyatYazdir(
  k: FiyatKalemi,
  kur: number,
): { metin: string; birim: string } | null {
  if (k.usdMin === null || k.usdMax === null) return null;

  const alt = tlyeCevir(k.usdMin, kur);
  const ust = tlyeCevir(k.usdMax, kur);

  return {
    metin: alt === ust ? tlYaz(alt) : `${tlYaz(alt)} – ${tlYaz(ust)}`,
    birim: `₺/${k.birim}`,
  };
}

/** Tabloda gosterilecek fiyati olan kalem var mi? */
export const fiyatGirildiMi = fiyatGruplari.some((g) =>
  g.kalemler.some((k) => k.usdMin !== null && k.usdMax !== null),
);
