"use client";

import { useState } from "react";
import type { FiyatGrubu } from "@/data/fiyatlar";

type Girdi = { usdMin: string; usdMax: string };

export function Giris() {
  const [sifre, setSifre] = useState("");
  const [durum, setDurum] = useState<"bos" | "gonderiliyor" | "hata">("bos");
  const [hata, setHata] = useState("");

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setDurum("gonderiliyor");
    setHata("");
    try {
      const res = await fetch("/api/yonetim/giris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sifre }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.mesaj ?? "Giriş yapılamadı");
      }
      window.location.reload();
    } catch (err) {
      setDurum("hata");
      setHata(err instanceof Error ? err.message : "Giriş yapılamadı");
    }
  }

  return (
    <form onSubmit={gonder} className="evrak mx-auto max-w-sm p-7">
      <p className="etiket">Yönetim</p>
      <h1 className="mt-2 text-2xl">Fiyat paneli</h1>

      <label htmlFor="sifre" className="etiket mb-1.5 mt-6 block">
        Şifre
      </label>
      <input
        id="sifre"
        type="password"
        autoComplete="current-password"
        value={sifre}
        onChange={(e) => setSifre(e.target.value)}
        required
        className="w-full rounded-sm border border-kurum-300 px-3.5 py-2.5 outline-none focus:border-lacivert-600 focus:ring-2 focus:ring-lacivert-100"
      />

      {durum === "hata" && (
        <p
          role="alert"
          className="mt-4 border-l-[3px] border-damga-500 bg-damga-50 px-4 py-2.5 text-sm text-damga-500"
        >
          {hata}
        </p>
      )}

      <button
        type="submit"
        disabled={durum === "gonderiliyor"}
        className="dugme dugme-ana mt-5 w-full px-5 py-3 disabled:opacity-60"
      >
        {durum === "gonderiliyor" ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
    </form>
  );
}

export function Panel({
  gruplar,
  guncelleme,
  kur,
  depoHazir,
}: {
  gruplar: FiyatGrubu[];
  guncelleme: string;
  kur: number;
  depoHazir: boolean;
}) {
  const [girdiler, setGirdiler] = useState<Record<string, Girdi>>(() => {
    const b: Record<string, Girdi> = {};
    for (const g of gruplar) {
      for (const k of g.kalemler) {
        b[k.ad] = {
          usdMin: k.usdMin === null ? "" : String(k.usdMin),
          usdMax: k.usdMax === null ? "" : String(k.usdMax),
        };
      }
    }
    return b;
  });

  const [durum, setDurum] = useState<"bos" | "kaydediliyor" | "tamam" | "hata">(
    "bos",
  );
  const [mesaj, setMesaj] = useState("");

  function degistir(ad: string, alan: keyof Girdi, deger: string) {
    setGirdiler((o) => ({ ...o, [ad]: { ...o[ad], [alan]: deger } }));
    setDurum("bos");
  }

  async function kaydet() {
    setDurum("kaydediliyor");
    setMesaj("");
    try {
      const res = await fetch("/api/yonetim/fiyat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kalemler: girdiler }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.mesaj ?? "Kaydedilemedi");
      setDurum("tamam");
      setMesaj(`${j.adet} kalem kaydedildi. Site güncellendi.`);
    } catch (err) {
      setDurum("hata");
      setMesaj(err instanceof Error ? err.message : "Kaydedilemedi");
    }
  }

  async function cikis() {
    await fetch("/api/yonetim/cikis", { method: "POST" });
    window.location.reload();
  }

  /** Girilen USD'nin bugünkü TL karşılığı — anında geri bildirim. */
  function tlOnizleme(g: Girdi): string {
    const a = Number(g.usdMin.replace(",", "."));
    const b = Number(g.usdMax.replace(",", "."));
    if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0)
      return "—";
    const yaz = (n: number) =>
      Math.floor(n * kur).toLocaleString("tr-TR");
    return a === b ? `${yaz(a)} ₺` : `${yaz(a)} – ${yaz(b)} ₺`;
  }

  const doluAdet = Object.values(girdiler).filter(
    (g) => g.usdMin.trim() !== "" && g.usdMax.trim() !== "",
  ).length;

  return (
    <div>
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-kurum-200 pb-6">
        <div>
          <p className="etiket">Yönetim</p>
          <h1 className="mt-2 text-3xl">Fiyat paneli</h1>
          <p className="mt-2 text-kurum-600">
            Kilo başına <strong>dolar</strong> girin. Site bunu TCMB günlük
            kuruyla TL&apos;ye çevirir ve her gün kendiliğinden günceller.
          </p>
        </div>
        <button onClick={cikis} className="dugme dugme-cerceve px-4 py-2 text-sm">
          Çıkış
        </button>
      </header>

      {!depoHazir && (
        <p className="mt-6 border-l-[3px] border-damga-500 bg-damga-50 px-5 py-4 text-sm leading-relaxed text-damga-500">
          <strong>Depo bağlı değil.</strong> Vercel → Storage →{" "}
          <code className="rakam">kozanlar-fiyat</code> → Projects →
          Connect to Project adımından bu projeye bağlayın, sonra
          yeniden dağıtım yapın. Bağlanana kadar kaydetme çalışmaz.
        </p>
      )}

      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
        <div>
          <dt className="etiket">Bugünkü kur</dt>
          <dd className="rakam mt-1 text-lg font-semibold text-lacivert-900">
            {kur.toLocaleString("tr-TR")} ₺ / USD
          </dd>
        </div>
        <div>
          <dt className="etiket">Fiyatlı kalem</dt>
          <dd className="rakam mt-1 text-lg font-semibold text-lacivert-900">
            {doluAdet}
          </dd>
        </div>
        <div>
          <dt className="etiket">Son kayıt</dt>
          <dd className="rakam mt-1 text-lg font-semibold text-lacivert-900">
            {guncelleme
              ? new Date(guncelleme).toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </dd>
        </div>
      </dl>

      {gruplar.map((g) => (
        <section key={g.baslik} className="mt-10">
          <h2 className="text-xl">{g.baslik}</h2>

          <div className="tasma-x mt-4">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-kurum-300">
                  <th scope="col" className="etiket py-2.5 pr-4">
                    Kalem
                  </th>
                  <th scope="col" className="etiket py-2.5 pr-3 w-28">
                    Alt ($)
                  </th>
                  <th scope="col" className="etiket py-2.5 pr-3 w-28">
                    Üst ($)
                  </th>
                  <th scope="col" className="etiket py-2.5 w-40">
                    TL karşılığı
                  </th>
                </tr>
              </thead>
              <tbody>
                {g.kalemler.map((k) => (
                  <tr key={k.ad} className="border-b border-kurum-200">
                    <td className="py-2.5 pr-4">
                      <span className="text-kurum-800">{k.ad}</span>
                      <span className="ml-1.5 text-xs text-kurum-400">
                        /{k.birim}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3">
                      <input
                        aria-label={`${k.ad} alt sınır dolar`}
                        inputMode="decimal"
                        value={girdiler[k.ad]?.usdMin ?? ""}
                        onChange={(e) =>
                          degistir(k.ad, "usdMin", e.target.value)
                        }
                        className={hucre}
                      />
                    </td>
                    <td className="py-2.5 pr-3">
                      <input
                        aria-label={`${k.ad} üst sınır dolar`}
                        inputMode="decimal"
                        value={girdiler[k.ad]?.usdMax ?? ""}
                        onChange={(e) =>
                          degistir(k.ad, "usdMax", e.target.value)
                        }
                        className={hucre}
                      />
                    </td>
                    <td className="rakam py-2.5 text-sm text-kurum-600">
                      {tlOnizleme(girdiler[k.ad] ?? { usdMin: "", usdMax: "" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Kaydet çubuğu — uzun tabloda her zaman erişilebilir olsun */}
      <div className="sticky bottom-0 mt-10 flex flex-wrap items-center gap-4 border-t border-kurum-300 bg-white/95 py-4 backdrop-blur">
        <button
          onClick={kaydet}
          disabled={durum === "kaydediliyor"}
          className="dugme dugme-ana px-7 py-3.5 disabled:opacity-60"
        >
          {durum === "kaydediliyor" ? "Kaydediliyor…" : "Kaydet ve yayınla"}
        </button>

        {durum === "tamam" && (
          <p role="status" className="text-sm font-medium text-fistik-700">
            ✓ {mesaj}
          </p>
        )}
        {durum === "hata" && (
          <p role="alert" className="text-sm font-medium text-damga-500">
            {mesaj}
          </p>
        )}
        <p className="text-sm text-kurum-500">
          Boş bıraktığınız kalem sitede &quot;Arayın&quot; olarak görünür.
        </p>
      </div>
    </div>
  );
}

const hucre =
  "rakam w-full rounded-sm border border-kurum-300 px-2.5 py-1.5 text-right outline-none focus:border-lacivert-600 focus:ring-2 focus:ring-lacivert-100";
