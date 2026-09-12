/**
 * HURDA ALIM FIYATLARI — USD BAZLI
 *
 * ⚠️ Degerler bilerek `null`. Uydurma rakam yayinlamak musteriyi yanlis
 * yonlendirir ve guveni yok eder; saha arastirmasindaki en sik sikayet
 * "geldi ama fiyati dusurdu" idi.
 *
 * NASIL DOLDURULUR
 * Her kaleme, o kalem icin KILO BASINA odedigin tutari DOLAR cinsinden
 * yaz. Ornek: bakiri kilo 13 dolardan aliyorsan -> usdMin: 12.5, usdMax: 13.5
 *
 * Site bunu TCMB gunluk kuruyla TL'ye cevirir (lib/kur.ts) ve tablo her
 * gun kendiliginden guncellenir. Kur degistikce elle rakam girmen
 * gerekmez; sadece alim marjin degisince bu dosyaya donersin.
 *
 * TL degil USD tutulmasinin sebebi: hurda piyasasi dolara endekslidir.
 * TL yazilirsa her kur hareketinde tablo yanlis kalir.
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

export const guncelleme = "2026-09-11";

export const fiyatGruplari: FiyatGrubu[] = [
  {
    baslik: "Bakır",
    aciklama:
      "Hurdanın en değerli kalemi. Temizliği ve cinsi fiyatı belirgin şekilde değiştirir.",
    kalemler: [
      { ad: "Bakır (temiz / 1. kalite)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Bakır (yanık / 2. kalite)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Bakır kablo (soyulmuş)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Bakır kablo (soyulmamış)", birim: "kg", usdMin: null, usdMax: null, not: "Bakır oranına göre değişir" },
      { ad: "Kalorifer / klima bakırı", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Alüminyum",
    aciklama: "Cinsine göre ciddi fiyat farkı olan bir grup.",
    kalemler: [
      { ad: "Alüminyum profil (temiz)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Alüminyum döküm", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Alüminyum talaş", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Alüminyum jant", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Alüminyum radyatör", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Pirinç, bronz ve kurşun",
    aciklama: "Tesisat ve makine aksamından çıkan yüksek değerli metaller.",
    kalemler: [
      { ad: "Pirinç (sarı)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Pirinç talaş", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Bronz", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Kurşun", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Çinko", birim: "kg", usdMin: null, usdMax: null },
    ],
  },
  {
    baslik: "Demir ve çelik",
    aciklama:
      "Tonajlı işlerin ana kalemi. Miktar arttıkça kilo fiyatı da yukarı çekilir.",
    kalemler: [
      { ad: "Hurda demir (ekstra / kalın sac)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Hurda demir (karışık)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Dökme demir (pik)", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Demir talaş", birim: "kg", usdMin: null, usdMax: null },
      { ad: "Paslanmaz (304)", birim: "kg", usdMin: null, usdMax: null },
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
