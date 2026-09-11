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
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <p className="text-lg font-semibold text-green-900">Talebiniz alındı.</p>
        <p className="mt-2 text-green-800">
          En kısa sürede sizi arayacağız. Acele ediyorsanız doğrudan
          telefonla da ulaşabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setDurum("bos")}
          className="mt-5 rounded-lg border border-green-300 px-4 py-2 font-medium text-green-900"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={gonder}
      className="rounded-2xl border border-celik-200 bg-white p-6 shadow-sm sm:p-8"
      noValidate={false}
    >
      {/* Bot tuzagi - gorunmez alan */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Web siteniz</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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

        <Alan etiket="Telefon" id="telefon" ipucu="Sizi bu numaradan arayacağız">
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

      <div className="mt-5">
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
            className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-celik-100 file:px-4 file:py-2.5 file:font-medium file:text-celik-800 hover:file:bg-celik-200"
          />
        </Alan>
      </div>

      <div className="mt-5">
        <Alan etiket="Not" id="not" zorunluDegil>
          <textarea
            id="not"
            name="not"
            rows={3}
            className={girdi}
            placeholder="Kat, asansör durumu, yaklaşık miktar gibi bilgiler işimizi kolaylaştırır."
          />
        </Alan>
      </div>

      {/* KVKK - onceden isaretli DEGIL, yasal zorunluluk */}
      <div className="mt-6 flex gap-3 rounded-xl bg-celik-50 p-4">
        <input
          id="kvkk"
          name="kvkk"
          type="checkbox"
          required
          className="mt-1 h-5 w-5 shrink-0 accent-bakir-500"
        />
        <label htmlFor="kvkk" className="text-sm leading-relaxed text-celik-700">
          <a href="/kvkk" className="font-medium underline">
            Aydınlatma Metni
          </a>
          'ni okudum. İletişim bilgilerimin, talebimi karşılayabilmek amacıyla
          bölgemdeki anlaşmalı hurda alım firmasına aktarılmasına onay veriyorum.
        </label>
      </div>

      {durum === "hata" && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {hata}. Lütfen tekrar deneyin veya doğrudan telefonla ulaşın.
        </p>
      )}

      <button
        type="submit"
        disabled={durum === "gonderiliyor"}
        className="mt-6 w-full rounded-xl bg-bakir-500 px-6 py-4 text-lg font-semibold text-white transition hover:bg-bakir-600 disabled:opacity-60"
      >
        {durum === "gonderiliyor" ? "Gönderiliyor…" : "Ücretsiz fiyat al"}
      </button>

      <p className="mt-3 text-center text-xs text-celik-500">
        Keşif ve nakliye ücretsiz. Fiyatı beğenmezseniz hiçbir yükümlülüğünüz yok.
      </p>
    </form>
  );
}

const girdi =
  "w-full rounded-xl border border-celik-300 px-4 py-3 text-base outline-none transition focus:border-bakir-500";

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
      <label htmlFor={id} className="mb-1.5 block font-medium text-celik-800">
        {etiket}
        {zorunluDegil && (
          <span className="ml-1.5 text-sm font-normal text-celik-500">
            (isteğe bağlı)
          </span>
        )}
      </label>
      {children}
      {ipucu && <p className="mt-1.5 text-sm text-celik-500">{ipucu}</p>}
    </div>
  );
}
