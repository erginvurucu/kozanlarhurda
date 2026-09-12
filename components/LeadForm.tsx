"use client";

import { useState } from "react";
import { ilceler } from "@/data/ilceler";

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

export function LeadForm({ varsayilanIlce }: { varsayilanIlce?: string }) {
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
      <div
        role="status"
        className="w-full rounded-3xl border-2 border-yesil-300 bg-yesil-50 p-10 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yesil-500 text-white text-2xl animate-bounce-in shadow-lg shadow-yesil-200">
          ✓
        </div>
        <p className="text-xl font-bold text-yesil-900">Talebiniz alındı!</p>
        <p className="mt-2 text-yesil-700">
          En kısa sürede sizi arayacağız. Acele ediyorsanız doğrudan
          telefonla da ulaşabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setDurum("bos")}
          className="mt-6 rounded-xl border-2 border-yesil-400 px-5 py-2.5 font-semibold text-yesil-800 hover:bg-yesil-100 transition-colors"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 shadow-2xl sm:p-8">
      {/* Form başlığı */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-kirmizi-500/20 border border-kirmizi-400/30 px-3 py-1 mb-3">
          <span className="text-kirmizi-300 text-xs font-semibold tracking-wide uppercase">
            Ücretsiz Fiyat Al
          </span>
        </div>
        <h2 className="text-xl font-bold text-white font-heading">
          Hızlı Teklif Formu
        </h2>
        <p className="text-sm text-white/60 mt-1">
          Keşif ve nakliye ücretsiz. Fiyatı beğenmezseniz yükümlülük yok.
        </p>
      </div>

      <form
        onSubmit={gonder}
        noValidate={false}
      >
        {/* Bot tuzağı */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Web siteniz</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Alan etiket="Adınız" id="ad">
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
              className={girdi}
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
            <select id="tur" name="tur" required defaultValue="" className={girdi}>
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
              className="block w-full text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/20 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-white/30 file:cursor-pointer transition-colors"
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
              placeholder="Kat, asansör durumu, yaklaşık miktar gibi bilgiler işimizi kolaylaştırır."
            />
          </Alan>
        </div>

        {/* KVKK */}
        <div className="mt-5 flex gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
          <input
            id="kvkk"
            name="kvkk"
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-kirmizi-500"
          />
          <label htmlFor="kvkk" className="text-xs leading-relaxed text-white/60">
            <a href="/kvkk" className="font-medium underline text-white/80 hover:text-white">
              Aydınlatma Metni
            </a>
            &apos;ni okudum. İletişim bilgilerimin talebimi karşılayabilmek amacıyla
            bölgemdeki anlaşmalı hurda alım firmasına aktarılmasına onay veriyorum.
          </label>
        </div>

        {durum === "hata" && (
          <p role="alert" className="mt-4 rounded-xl bg-kirmizi-900/50 border border-kirmizi-600 p-3 text-sm text-kirmizi-300">
            {hata}. Lütfen tekrar deneyin veya doğrudan telefonla ulaşın.
          </p>
        )}

        <button
          type="submit"
          disabled={durum === "gonderiliyor"}
          className="mt-5 w-full btn-kirmizi text-white rounded-2xl px-6 py-4 text-lg font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {durum === "gonderiliyor" ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Gönderiliyor…
            </>
          ) : (
            "Ücretsiz Fiyat Al →"
          )}
        </button>
      </form>
    </div>
  );
}

const girdi =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/40 outline-none transition focus:border-kirmizi-400 focus:bg-white/15 focus:ring-1 focus:ring-kirmizi-400";

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
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-white/80">
        {etiket}
        {zorunluDegil && (
          <span className="ml-1.5 text-xs font-normal text-white/40">
            (isteğe bağlı)
          </span>
        )}
      </label>
      {children}
      {ipucu && <p className="mt-1.5 text-xs text-white/40">{ipucu}</p>}
    </div>
  );
}
