import type { Metadata } from "next";
import Link from "next/link";
import { yazilar, okumaSuresi } from "@/data/rehber";
import { CtaBlok, StickyCallBar } from "@/components/Cta";

export const metadata: Metadata = {
  title: "Hurda Rehberi — Sanayi ve Ev Hurdası Hakkında Bilmeniz Gerekenler",
  description:
    "Fabrika hurdası nasıl satılır, irsaliye nasıl işler, hurdacıya ne verilir? Sanayi tesisleri ve ev kullanıcıları için pratik rehber yazıları.",
  alternates: { canonical: "/rehber" },
};

const tarihYaz = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function RehberSayfasi() {
  const sirali = [...yazilar].sort((a, b) => b.tarih.localeCompare(a.tarih));

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="kural max-w-2xl">
          <p className="etiket">Rehber</p>
          <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">
            Hurda hakkında bilmeniz gerekenler
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-kurum-600">
            Sanayi tesisleri için evrak ve süreç, ev kullanıcıları için
            tartım ve fiyat. Sahada en çok karşılaştığımız soruları
            yazıya döktük.
          </p>
        </div>

        <ul className="mt-12 grid gap-px border border-kurum-200 bg-kurum-200 md:grid-cols-2">
          {sirali.map((y) => (
            <li key={y.slug} className="bg-white">
              <Link
                href={`/rehber/${y.slug}`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-kurum-50"
              >
                <div className="flex items-center gap-3">
                  <span className="etiket etiket-fistik">{y.kategori}</span>
                  <span className="rakam text-[11px] text-kurum-400">
                    {okumaSuresi(y)} dk okuma
                  </span>
                </div>

                <h2 className="mt-3 text-xl leading-snug group-hover:text-lacivert-600">
                  {y.baslik}
                </h2>

                <p className="mt-3 flex-1 leading-relaxed text-kurum-600">
                  {y.girizgah}
                </p>

                <p className="rakam mt-5 border-t border-kurum-200 pt-3 text-xs text-kurum-400">
                  {tarihYaz(y.tarih)}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <CtaBlok className="mt-14" />
      </div>
      <StickyCallBar />
    </>
  );
}
