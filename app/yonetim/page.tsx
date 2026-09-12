import type { Metadata } from "next";
import { oturumVarMi, panelKullanilabilir } from "@/lib/yonetim";
import { fiyatlariBirlestir } from "@/lib/fiyatDeposu";
import { usdKuru } from "@/lib/kur";
import { Giris, Panel } from "./PanelIstemci";

/** Panel arama motorlarina kapali. */
export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false, nocache: true },
};

/** Oturuma bagli oldugu icin onbelleklenmemeli. */
export const dynamic = "force-dynamic";

export default async function YonetimSayfasi() {
  if (!panelKullanilabilir()) {
    return (
      <Kabuk>
        <div className="evrak mx-auto max-w-md p-7">
          <p className="etiket">Yönetim</p>
          <h1 className="mt-2 text-2xl">Panel yapılandırılmamış</h1>
          <p className="mt-3 leading-relaxed text-kurum-600">
            Paneli kullanmak için Vercel&apos;de{" "}
            <code className="rakam bg-kurum-100 px-1.5 py-0.5 text-sm">
              YONETIM_SIFRE
            </code>{" "}
            ortam değişkeni tanımlanmalı (en az 8 karakter). Tanımladıktan
            sonra yeniden dağıtım yapın.
          </p>
        </div>
      </Kabuk>
    );
  }

  if (!(await oturumVarMi())) {
    return (
      <Kabuk>
        <Giris />
      </Kabuk>
    );
  }

  const [{ gruplar, guncelleme }, kur] = await Promise.all([
    fiyatlariBirlestir(),
    usdKuru(),
  ]);

  return (
    <Kabuk>
      <Panel
        gruplar={gruplar}
        guncelleme={guncelleme}
        kur={kur.usd}
        depoHazir={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
      />
    </Kabuk>
  );
}

function Kabuk({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">{children}</div>
  );
}
