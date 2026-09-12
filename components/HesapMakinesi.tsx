"use client";

import { useMemo, useState } from "react";
import { telLink, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Cta";

export type HesapKalemi = {
  ad: string;
  birim: "kg" | "adet";
  /** TL cinsinden alt ve ust sinir - sunucuda TCMB kuruyla hesaplandi. */
  alt: number;
  ust: number;
};

export type HesapGrubu = {
  kategori: string;
  kalemler: HesapKalemi[];
};

const tl = (n: number) =>
  n.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/**
 * Hurda fiyati hesaplama araci.
 *
 * Sonucu tek bir rakam degil ARALIK olarak verir; cunku gercek fiyat
 * malzemenin cinsine ve temizligine gore degisir. Tek rakam gostermek
 * musteriyi yanlis beklentiyle kapiya getirir - saha arastirmasindaki
 * en sik sikayet ("geldi ama fiyati dusurdu") tam olarak budur.
 */
export function HesapMakinesi({
  gruplar,
  kurTarihi,
}: {
  gruplar: HesapGrubu[];
  kurTarihi: string;
}) {
  const [grupIndeks, setGrupIndeks] = useState(0);
  const [kalemIndeks, setKalemIndeks] = useState(0);
  const [miktar, setMiktar] = useState("100");

  const grup = gruplar[grupIndeks];
  const kalem = grup?.kalemler[kalemIndeks] ?? grup?.kalemler[0];

  const sonuc = useMemo(() => {
    if (!kalem) return null;
    const m = Number(miktar.replace(",", "."));
    if (!Number.isFinite(m) || m <= 0) return null;
    return { alt: kalem.alt * m, ust: kalem.ust * m };
  }, [kalem, miktar]);

  if (!kalem) return null;

  return (
    <div className="evrak flex h-full w-full flex-col">
      {/* Koyu baslik seridi */}
      <header className="flex items-center justify-between gap-4 bg-lacivert-900 px-6 py-4">
        <h2 className="text-[19px] leading-none text-white">
          Hurda fiyatı hesapla
        </h2>
        {/* Rakibin "CANLI" rozetinin yerine gercek kaynagi yaziyoruz:
            fiyatlar TCMB gunluk kuruyla hesaplaniyor, uydurma bir
            canlilik iddiasi tasimiyor. */}
        <span className="rakam shrink-0 border border-fistik-600 px-2.5 py-1 text-[11px] font-medium text-fistik-400">
          TCMB {kurTarihi}
        </span>
      </header>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="hesap-kategori" className="etiket mb-1.5 block">
              Kategori
            </label>
            <select
              id="hesap-kategori"
              className={girdi}
              value={grupIndeks}
              onChange={(e) => {
                setGrupIndeks(Number(e.target.value));
                setKalemIndeks(0);
              }}
            >
              {gruplar.map((g, i) => (
                <option key={g.kategori} value={i}>
                  {g.kategori}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="hesap-kalem" className="etiket mb-1.5 block">
              Hurda türü
            </label>
            <select
              id="hesap-kalem"
              className={girdi}
              value={kalemIndeks}
              onChange={(e) => setKalemIndeks(Number(e.target.value))}
            >
              {grup.kalemler.map((k, i) => (
                <option key={k.ad} value={i}>
                  {k.ad}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hesap-miktar" className="etiket mb-1.5 block">
                Miktar ({kalem.birim})
              </label>
              <input
                id="hesap-miktar"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={miktar}
                onChange={(e) => setMiktar(e.target.value)}
                className={`${girdi} rakam`}
              />
            </div>

            <div>
              <span className="etiket mb-1.5 block">
                Birim fiyat (₺/{kalem.birim})
              </span>
              <p className="rakam border border-kurum-200 bg-kurum-50 px-3.5 py-2.5 text-kurum-800">
                {tl(kalem.alt)} – {tl(kalem.ust)}
              </p>
            </div>
          </div>
        </div>

        {/* Vurgulu toplam kutusu */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-l-[3px] border-fistik-500 bg-kurum-50 px-5 py-4">
          <span className="etiket">Tahmini tutar</span>
          {sonuc ? (
            <span className="rakam text-[26px] font-semibold leading-none text-lacivert-900">
              {tl(sonuc.alt)} – {tl(sonuc.ust)}
              <span className="ml-1 text-lg font-normal text-kurum-500">₺</span>
            </span>
          ) : (
            <span className="text-kurum-500">Geçerli bir miktar girin</span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-kurum-500">
          Aralık olarak veriyoruz çünkü fiyat malzemenin cinsine ve
          temizliğine göre değişir. Kesin tutar yerinde tartımdan sonra
          netleşir.
        </p>

        <div className="mt-auto flex flex-col gap-2.5 pt-5 sm:flex-row">
          <a
            href={waLink(
              `Merhaba, ${miktar} ${kalem.birim} ${kalem.ad} satmak istiyorum.`,
            )}
            data-cta="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="dugme dugme-whatsapp flex-1 px-5 py-3.5"
          >
            <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
            Bu hesapla teklif al
          </a>
          <a
            href={telLink}
            data-cta="tel"
            className="dugme dugme-cerceve px-5 py-3.5"
          >
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            Ara
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Hic fiyat girilmemisken gosterilen hal.
 * Rakam uydurmak yerine dogrudan iletisime yonlendirir.
 */
export function HesapMakinesiBos() {
  return (
    <div className="evrak flex h-full w-full flex-col">
      <header className="flex items-center justify-between gap-4 bg-lacivert-900 px-6 py-4">
        <h2 className="text-[19px] leading-none text-white">
          Hurda fiyatı hesapla
        </h2>
      </header>

      <div className="flex flex-1 flex-col p-6">
      <p className="flex-1 leading-relaxed text-kurum-600">
        Hurda fiyatları cinse, temizliğe ve miktara göre değişir; dolara
        endeksli olduğu için her gün de hareket eder. Elinizdekinin ne
        kadar ettiğini en hızlı öğrenme yolu, fotoğrafını WhatsApp&apos;tan
        göndermeniz — birkaç dakikada aralık veriyoruz.
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <a
          href={waLink("Merhaba, hurdamın fiyatını öğrenmek istiyorum.")}
          data-cta="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          className="dugme dugme-whatsapp flex-1 px-5 py-3.5"
        >
          <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
          Fotoğraf gönder, fiyat al
        </a>
        <a
          href={telLink}
          data-cta="tel"
          className="dugme dugme-cerceve px-5 py-3.5"
        >
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          Ara
        </a>
        </div>
      </div>
    </div>
  );
}

const girdi =
  "w-full rounded-sm border border-kurum-300 bg-white px-3.5 py-2.5 text-base text-kurum-900 outline-none transition placeholder:text-kurum-400 focus:border-lacivert-600 focus:ring-2 focus:ring-lacivert-100";
