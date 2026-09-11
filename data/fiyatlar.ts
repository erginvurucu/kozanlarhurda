/**
 * HURDA FIYAT TABLOSU
 *
 * ⚠️ ONEMLI: min/max degerleri bilerek `null` birakildi.
 * Hurda fiyatlari gunluk degisir ve uydurma rakam yayinlamak hem
 * musteriyi yanlis yonlendirir hem de guveni yok eder.
 * Gercek alim fiyatlarinizi girdiginizde tablo otomatik dolar ve
 * "Arayın" yerine rakam gosterilir.
 *
 * guncelleme: fiyat girildiginde MUTLAKA bu tarihi de guncelle.
 */

export type FiyatKalemi = {
  ad: string;
  birim: "kg" | "adet";
  min: number | null;
  max: number | null;
  not?: string;
};

export type FiyatGrubu = {
  baslik: string;
  aciklama: string;
  kalemler: FiyatKalemi[];
};

export const guncelleme = "2026-09-11";

export const fiyatGruplari: FiyatGrubu[] = [
  {
    baslik: "Bakır",
    aciklama:
      "Hurdanın en değerli kalemi. Temizliği ve cinsi fiyatı belirgin şekilde değiştirir.",
    kalemler: [
      { ad: "Bakır (temiz / 1. kalite)", birim: "kg", min: null, max: null },
      { ad: "Bakır (yanık / 2. kalite)", birim: "kg", min: null, max: null },
      { ad: "Bakır kablo (soyulmuş)", birim: "kg", min: null, max: null },
      { ad: "Bakır kablo (soyulmamış)", birim: "kg", min: null, max: null, not: "Bakır oranına göre değişir" },
      { ad: "Kalorifer / klima bakırı", birim: "kg", min: null, max: null },
    ],
  },
  {
    baslik: "Alüminyum",
    aciklama: "Cinsine göre ciddi fiyat farkı olan bir grup.",
    kalemler: [
      { ad: "Alüminyum profil (temiz)", birim: "kg", min: null, max: null },
      { ad: "Alüminyum döküm", birim: "kg", min: null, max: null },
      { ad: "Alüminyum talaş", birim: "kg", min: null, max: null },
      { ad: "Alüminyum jant", birim: "kg", min: null, max: null },
      { ad: "Alüminyum radyatör", birim: "kg", min: null, max: null },
    ],
  },
  {
    baslik: "Pirinç, bronz ve kurşun",
    aciklama: "Tesisat ve makine aksamından çıkan yüksek değerli metaller.",
    kalemler: [
      { ad: "Pirinç (sarı)", birim: "kg", min: null, max: null },
      { ad: "Pirinç talaş", birim: "kg", min: null, max: null },
      { ad: "Bronz", birim: "kg", min: null, max: null },
      { ad: "Kurşun", birim: "kg", min: null, max: null },
      { ad: "Çinko", birim: "kg", min: null, max: null },
    ],
  },
  {
    baslik: "Demir ve çelik",
    aciklama:
      "Tonajlı işlerin ana kalemi. Miktar arttıkça kilo fiyatı da yukarı çekilir.",
    kalemler: [
      { ad: "Hurda demir (ekstra / kalın sac)", birim: "kg", min: null, max: null },
      { ad: "Hurda demir (karışık)", birim: "kg", min: null, max: null },
      { ad: "Dökme demir (pik)", birim: "kg", min: null, max: null },
      { ad: "Demir talaş", birim: "kg", min: null, max: null },
      { ad: "Paslanmaz (304)", birim: "kg", min: null, max: null },
      { ad: "Paslanmaz (316)", birim: "kg", min: null, max: null },
    ],
  },
  {
    baslik: "Beyaz eşya ve ev hurdası",
    aciklama:
      "Çalışır durumdaki cihazlarda hurda kilo fiyatı değil, ikinci el değeri konuşulur.",
    kalemler: [
      { ad: "Buzdolabı", birim: "adet", min: null, max: null },
      { ad: "Çamaşır makinesi", birim: "adet", min: null, max: null },
      { ad: "Bulaşık makinesi", birim: "adet", min: null, max: null },
      { ad: "Fırın / ocak", birim: "adet", min: null, max: null },
      { ad: "Kombi", birim: "adet", min: null, max: null },
      { ad: "Klima (iç + dış ünite)", birim: "adet", min: null, max: null },
      { ad: "Petek / radyatör", birim: "kg", min: null, max: null },
      { ad: "Akü", birim: "kg", min: null, max: null },
    ],
  },
];

export const fiyatYazdir = (k: FiyatKalemi) => {
  if (k.min === null || k.max === null) return null;
  if (k.min === k.max) return `${k.min} ₺/${k.birim}`;
  return `${k.min} – ${k.max} ₺/${k.birim}`;
};
