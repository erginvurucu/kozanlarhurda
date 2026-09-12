import type { Metadata } from "next";
import Link from "next/link";
import { yakayaGore, sehreGore, type Ilce } from "@/data/ilceler";
import { CtaBlok, StickyCallBar } from "@/components/Cta";

const istanbulAdet = yakayaGore("avrupa").length + yakayaGore("anadolu").length;
export const metadata: Metadata = {
  title: `Hizmet Verdiğimiz Bölgeler — İstanbul ve Trakya`,
  description: `İstanbul'un ${istanbulAdet} ilçesi ile Tekirdağ ve Kırklareli organize sanayi bölgelerinde yerinde hurda alımı. Bölgenizi seçin, o bölgede nasıl çalıştığımızı görün.`,
  alternates: { canonical: "/bolgeler" },
};

export default function BolgelerSayfasi() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="kural max-w-2xl">
          <p className="etiket">Bölgeler</p>
          <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">
            Hizmet verdiğimiz bölgeler
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-kurum-600">
            İstanbul&apos;un {istanbulAdet} ilçesinin tamamına, ayrıca
            Tekirdağ ve Kırklareli&apos;nin sanayi ilçelerine ekip
            yönlendiriyoruz. Her bölgenin hurda profili farklı olduğu için
            ilçe sayfalarında o bölgeye özel bilgileri ayrı ayrı anlattık.
          </p>
        </div>

        <Grup
          baslik="İstanbul — Avrupa Yakası"
          ilceler={yakayaGore("avrupa")}
        />
        <Grup
          baslik="İstanbul — Anadolu Yakası"
          ilceler={yakayaGore("anadolu")}
        />

        <div className="mt-16 border-t-2 border-lacivert-600 pt-10">
          <p className="etiket etiket-fistik">Sanayi bölgeleri</p>
          <h2 className="mt-2 text-[28px] leading-tight sm:text-[32px]">
            Trakya
          </h2>
          <p className="mt-3 max-w-prose leading-relaxed text-kurum-600">
            Trakya&apos;da ağırlık sanayidir: organize sanayi bölgelerinde
            tonajlı alım, periyodik anlaşma, söküm ve eksiksiz evrak
            düzeniyle çalışıyoruz. Bu bölgede işler randevuyla planlanır.
          </p>
        </div>

        <Grup baslik="Tekirdağ" ilceler={sehreGore("Tekirdağ")} />
        <Grup baslik="Kırklareli" ilceler={sehreGore("Kırklareli")} />

        <CtaBlok className="mt-14" />
      </div>
      <StickyCallBar />
    </>
  );
}

function Grup({ baslik, ilceler: liste }: { baslik: string; ilceler: Ilce[] }) {
  if (liste.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl">
        {baslik}{" "}
        <span className="rakam text-base font-normal text-kurum-500">
          ({liste.length} ilçe)
        </span>
      </h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/${i.slug}`}
              className="evrak-vurgu group flex h-full flex-col p-5 transition-colors hover:border-t-fistik-500"
            >
              <span className="text-lg font-semibold text-lacivert-900 group-hover:text-lacivert-600">
                {i.ad} Hurdacı
              </span>
              <span className="mt-1 text-sm text-kurum-500">{i.varis}</span>

              {i.sanayi.length > 0 && (
                <span className="mt-3 line-clamp-2 text-sm text-kurum-600">
                  {i.sanayi.slice(0, 2).join(" · ")}
                </span>
              )}

              {i.altSayfalar && i.altSayfalar.length > 0 && (
                <span className="mt-2 text-sm text-kurum-600">
                  {i.altSayfalar.map((m) => m.ad).join(" · ")}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
