import type { Metadata } from "next";
import Link from "next/link";
import { yakayaGore } from "@/data/ilceler";
import { CtaBlok, StickyCallBar } from "@/components/Cta";

export const metadata: Metadata = {
  title: "Hizmet Verdiğimiz Bölgeler — İstanbul 39 İlçe",
  description:
    "İstanbul'un 39 ilçesinin tamamında yerinde hurda alımı. Bölgenizi seçin, o bölgede nasıl çalıştığımızı görün.",
  alternates: { canonical: "/bolgeler" },
};

export default function BolgelerSayfasi() {
  const avrupa = yakayaGore("avrupa");
  const anadolu = yakayaGore("anadolu");

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl font-bold text-lacivert-900">
          Hizmet verdiğimiz bölgeler
        </h1>
        <p className="mt-4 max-w-prose text-lg text-kurum-600">
          İstanbul&apos;un 39 ilçesinin tamamına ekip yönlendiriyoruz. Her
          bölgenin hurda profili farklı olduğu için ilçe sayfalarında o bölgeye
          özel bilgileri ayrı ayrı anlattık.
        </p>

        <Yaka baslik="Avrupa Yakası" ilceler={avrupa} />
        <Yaka baslik="Anadolu Yakası" ilceler={anadolu} />

        <CtaBlok className="mt-14" />
      </div>
      <StickyCallBar />
    </>
  );
}

function Yaka({
  baslik,
  ilceler,
}: {
  baslik: string;
  ilceler: ReturnType<typeof yakayaGore>;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-lacivert-900">
        {baslik}{" "}
        <span className="font-normal text-kurum-500">({ilceler.length} ilçe)</span>
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ilceler.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/${i.slug}`}
              className="group flex h-full flex-col evrak-vurgu p-5 transition-colors hover:border-t-fistik-500"
            >
              <span className="text-lg font-semibold text-lacivert-900 group-hover:text-lacivert-600">
                {i.ad} Hurdacı
              </span>
              <span className="mt-1 text-sm text-kurum-500">{i.varis}</span>
              {i.altSayfalar && i.altSayfalar.length > 0 && (
                <span className="mt-3 text-sm text-kurum-600">
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
