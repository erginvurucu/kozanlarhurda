"use client";

import { useState } from "react";
import { ilceler } from "@/data/ilceler";
import { OnayIkon } from "./Cta";

const HURDA_TURLERI = [
  "Beyaz eşya (buzdolabı, çamaşır makinesi…)",
  "Bakır / kablo",
  "Alüminyum",
  "Demir / çelik",
  "Pirinç / bronz",
  "Paslanmaz",
  "Kombi / petek / kazan",
  "Klima",
  "Sanayi / fabrika hurdası",
  "Ticari mutfak ekipmanı",
  "Hurda araç",
  "Diğer / karışık",
];

type Durum = "bos" | "gonderiliyor" | "tamam" | "hata";

/**
 * Talep formu — kantar fişi biçiminde.
 * Bu sektörde güvenin somut nesnesi kantar fişidir; form da onu andırır:
 * üstü perforeli beyaz kâğıt, mono alan etiketleri, cetvelli satırlar.
 */
export function LeadForm({
  varsayilanIlce,
  kurumsal = false,
}: {
  varsayilanIlce?: string;
  /** Kurumsal sayfada firma, tonaj ve periyodik anlasma alanlarini acar. */
  kurumsal?: boolean;
}) {
  const [durum, setDurum] = useState<Durum>("bos");
  const [hata, setHata] = useState<string>("");

  async function gonder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setDurum("gonderiliyor");
    setHata("");

    try {
      const res = await fetch("/api/teklif", { method: "POST", body: data });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.mesaj ?? "Gönderilemedi");
      }
      setDurum("tamam");
      form.reset();
    } catch (err) {
      setDurum("hata");
      setHata(err instanceof Error ? err.message : "Bir sorun oluştu");
    }
  }

  if (durum === "tamam") {
    return (
      <div role="status" className="fis w-full p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-fistik-500">
          <OnayIkon className="h-8 w-8 text-lacivert-900" aria-hidden="true" />
        </div>
        <p className="etiket etiket-fistik mt-5">Talep kaydedildi</p>
        <p className="mt-2 text-xl font-bold text-lacivert-900">
          Sizi en kısa sürede arayacağız
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-kurum-600">
          Acelesi varsa doğrudan telefonla da ulaşabilirsiniz — hattımız
          her zaman açık.
        </p>
        <button
          type="button"
          onClick={() => setDurum("bos")}
          className="dugme dugme-cerceve mt-7 px-5 py-2.5 text-sm"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  return (
    <div className="fis w-full p-6 sm:p-7">
      <header className="border-b border-dashed border-kurum-300 pb-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="etiket etiket-fistik">
            {kurumsal ? "Kurumsal teklif" : "Fiyat talebi"}
          </p>
          <p className="rakam text-[11px] text-kurum-400">ÜCRETSİZ</p>
        </div>
        <h2 className="mt-2 text-[22px] leading-tight text-lacivert-900">
          {kurumsal
            ? "Tesisiniz için teklif alın"
            : "Hurdanızın fiyatını öğrenin"}
        </h2>
        <p className="mt-2 text-sm text-kurum-600">
          {kurumsal
            ? "Keşif ücretsiz. Tonajlı alımda irsaliye ve kantar fişi eksiksiz düzenlenir."
            : "Keşif, indirme ve nakliye ücretsiz. Fiyatı beğenmezseniz hiçbir yükümlülüğünüz yok."}
        </p>
      </header>

      <form onSubmit={gonder} className="pt-5">
        {/* Bot tuzağı */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Web siteniz</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {kurumsal && (
          <div className="mb-4">
            <Alan etiket="Firma adı" id="firma">
              <input
                id="firma"
                name="firma"
                type="text"
                required
                autoComplete="organization"
                className={girdi}
                placeholder="Tesis / şirket unvanı"
              />
            </Alan>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Alan etiket={kurumsal ? "Yetkili" : "Adınız"} id="ad">
            <input
              id="ad"
              name="ad"
              type="text"
              required
              autoComplete="name"
              className={girdi}
              placeholder="Ad Soyad"
            />
          </Alan>

          <Alan etiket="Telefon" id="telefon" ipucu="Bu numaradan arayacağız">
            <input
              id="telefon"
              name="telefon"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9\s()+-]{10,20}"
              className={`${girdi} rakam`}
              placeholder="05XX XXX XX XX"
            />
          </Alan>

          <Alan etiket="İlçe" id="ilce">
            <select
              id="ilce"
              name="ilce"
              required
              defaultValue={varsayilanIlce ?? ""}
              className={girdi}
            >
              <option value="" disabled>
                Seçiniz
              </option>
              {ilceler.map((i) => (
                <option key={i.slug} value={i.ad}>
                  {i.ad}
                </option>
              ))}
            </select>
          </Alan>

          <Alan etiket="Hurda türü" id="tur">
            <select
              id="tur"
              name="tur"
              required
              defaultValue=""
              className={girdi}
            >
              <option value="" disabled>
                Seçiniz
              </option>
              {HURDA_TURLERI.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Alan>
        </div>

        {kurumsal && (
          <div className="mt-4">
            <Alan
              etiket="Yaklaşık tonaj"
              id="tonaj"
              ipucu="Bilmiyorsanız boş bırakın, keşifte birlikte belirleriz"
              zorunluDegil
            >
              <input
                id="tonaj"
                name="tonaj"
                type="text"
                className={girdi}
                placeholder="Örn. 3–5 ton / ayda ~2 ton"
              />
            </Alan>

            <label className="mt-4 flex items-start gap-3 text-sm text-kurum-700">
              <input
                type="checkbox"
                name="periyodik"
                value="evet"
                className="mt-0.5 h-4 w-4 shrink-0 accent-lacivert-600"
              />
              Düzenli fire çıkıyor, periyodik anlaşma ile ilgileniyorum
            </label>
          </div>
        )}

        <div className="mt-4">
          <Alan
            etiket="Fotoğraf"
            id="foto"
            ipucu="Fotoğraf gönderirseniz çok daha net fiyat verebiliriz (en fazla 5 adet)"
            zorunluDegil
          >
            <input
              id="foto"
              name="foto"
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-sm text-kurum-600 file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-lacivert-50 file:px-4 file:py-2 file:font-medium file:text-lacivert-700 hover:file:bg-lacivert-100"
            />
          </Alan>
        </div>

        <div className="mt-4">
          <Alan etiket="Not" id="not" zorunluDegil>
            <textarea
              id="not"
              name="not"
              rows={2}
              className={girdi}
              placeholder={
                kurumsal
                  ? "Malzeme cinsi, söküm gerekip gerekmediği, saha erişimi gibi bilgiler işimizi kolaylaştırır."
                  : "Kat, asansör durumu, yaklaşık miktar gibi bilgiler işimizi kolaylaştırır."
              }
            />
          </Alan>
        </div>

        <div className="mt-5 flex gap-3 border-t border-dashed border-kurum-300 pt-5">
          <input
            id="kvkk"
            name="kvkk"
            type="checkbox"
            required
            className="mt-0.5 h-5 w-5 shrink-0 accent-lacivert-600"
          />
          <label
            htmlFor="kvkk"
            className="text-xs leading-relaxed text-kurum-600"
          >
            <a
              href="/kvkk"
              className="font-semibold text-lacivert-700 underline underline-offset-2 hover:text-lacivert-900"
            >
              Aydınlatma Metni
            </a>
            &apos;ni okudum. İletişim bilgilerimin talebimi karşılayabilmek
            amacıyla bölgemdeki anlaşmalı hurda alım firmasına aktarılmasına
            onay veriyorum.
          </label>
        </div>

        {durum === "hata" && (
          <p
            role="alert"
            className="mt-4 border-l-[3px] border-damga-500 bg-damga-50 px-4 py-3 text-sm text-damga-500"
          >
            {hata}. Lütfen tekrar deneyin veya doğrudan telefonla ulaşın.
          </p>
        )}

        <button
          type="submit"
          disabled={durum === "gonderiliyor"}
          className="dugme dugme-ana mt-6 w-full px-6 py-4 text-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {durum === "gonderiliyor" ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Gönderiliyor…
            </>
          ) : (
            kurumsal ? "Teklif talep et" : "Ücretsiz fiyat al"
          )}
        </button>
      </form>
    </div>
  );
}

const girdi =
  "w-full rounded-sm border border-kurum-300 bg-white px-3.5 py-2.5 text-base text-kurum-900 outline-none transition placeholder:text-kurum-400 focus:border-lacivert-600 focus:ring-2 focus:ring-lacivert-100";

function Alan({
  etiket,
  id,
  ipucu,
  zorunluDegil,
  children,
}: {
  etiket: string;
  id: string;
  ipucu?: string;
  zorunluDegil?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="etiket mb-1.5 block">
        {etiket}
        {zorunluDegil && (
          <span className="ml-1.5 normal-case tracking-normal text-kurum-400">
            (isteğe bağlı)
          </span>
        )}
      </label>
      {children}
      {ipucu && <p className="mt-1.5 text-xs text-kurum-500">{ipucu}</p>}
    </div>
  );
}
