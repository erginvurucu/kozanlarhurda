"use client";

import Link from "next/link";
import { site, telLink } from "@/lib/site";
import { PhoneIcon } from "./Cta";
import { yakayaGore } from "@/data/ilceler";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b-2 border-kirmizi-500 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Dönen geri dönüşüm ikonu */}
          <div className="relative h-10 w-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-kirmizi-500 to-kirmizi-700 shadow-lg group-hover:shadow-kirmizi-300 transition-shadow duration-300" />
            <svg
              viewBox="0 0 24 24"
              className="relative h-6 w-6 text-white group-hover:rotate-180 transition-transform duration-700"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4C7.58 4 4 7.58 4 12s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-karanlik-900 font-heading tracking-tight">
              {site.name}
            </span>
            <span className="text-[10px] font-medium text-yesil-600 tracking-widest uppercase">
              Metal Geri Dönüşüm
            </span>
          </div>
        </Link>

        {/* Masaüstü Nav */}
        <nav aria-label="Ana menü" className="hidden items-center gap-6 md:flex">
          <Link
            href="/hurda-fiyatlari"
            className="font-medium text-karanlik-600 hover:text-kirmizi-600 transition-colors duration-200 relative group"
          >
            Hurda Fiyatları
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-kirmizi-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/bolgeler"
            className="font-medium text-karanlik-600 hover:text-kirmizi-600 transition-colors duration-200 relative group"
          >
            Bölgeler
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-kirmizi-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/#nasil"
            className="font-medium text-karanlik-600 hover:text-kirmizi-600 transition-colors duration-200 relative group"
          >
            Nasıl Çalışır
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-kirmizi-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <a
            href={telLink}
            data-cta="tel"
            className="inline-flex items-center gap-2 btn-kirmizi text-white rounded-xl px-5 py-2.5 font-semibold text-sm animate-pulse-glow"
          >
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
        </nav>

        {/* Mobil Ara butonu */}
        <a
          href={telLink}
          data-cta="tel"
          aria-label={`Telefonla ara: ${site.phoneDisplay}`}
          className="inline-flex items-center gap-2 btn-kirmizi text-white rounded-xl px-4 py-2.5 text-sm font-semibold md:hidden"
        >
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          Hemen Ara
        </a>
      </div>

      {/* Kırmızı-Yeşil altı çizgi şeridi */}
      <div className="h-0.5 bg-gradient-to-r from-kirmizi-600 via-yesil-500 to-kirmizi-600" />
    </header>
  );
}

export function Footer() {
  const avrupa = yakayaGore("avrupa");
  const anadolu = yakayaGore("anadolu");

  return (
    <footer className="mt-20 bg-karanlik-900 text-white">
      {/* Üst kısım - Degrade şerit */}
      <div className="h-1 bg-gradient-to-r from-kirmizi-500 via-yesil-500 to-kirmizi-500" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marka */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-kirmizi-500 to-kirmizi-700 flex items-center justify-center shadow-lg shadow-kirmizi-900/50">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4C7.58 4 4 7.58 4 12s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold font-heading">{site.name}</p>
                <p className="text-xs text-yesil-400 tracking-widest uppercase">Metal Geri Dönüşüm</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-karanlik-300 max-w-xs">
              {site.description}
            </p>

            <a
              href={telLink}
              data-cta="tel"
              className="mt-5 inline-flex items-center gap-2 text-kirmizi-400 font-semibold hover:text-kirmizi-300 transition-colors"
            >
              <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>

            {/* Çevre badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-yesil-900/50 border border-yesil-700 px-3 py-1.5">
              <span className="text-yesil-400 text-xs">♻</span>
              <span className="text-xs text-yesil-300 font-medium">Çevre Dostu Geri Dönüşüm</span>
            </div>
          </div>

          <FooterIlceListesi baslik="Avrupa Yakası" ilceler={avrupa} />
          <FooterIlceListesi baslik="Anadolu Yakası" ilceler={anadolu} />
        </div>

        {/* Alt çizgi */}
        <div className="mt-12 pt-6 border-t border-karanlik-700 flex flex-col gap-4 text-sm text-karanlik-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} — Tüm hakları saklıdır.
          </p>
          <nav aria-label="Yasal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/kvkk" className="hover:text-kirmizi-400 transition-colors">
              Aydınlatma Metni
            </Link>
            <Link href="/gizlilik" className="hover:text-kirmizi-400 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/bolgeler" className="hover:text-kirmizi-400 transition-colors">
              Tüm Bölgeler
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterIlceListesi({
  baslik,
  ilceler,
}: {
  baslik: string;
  ilceler: { slug: string; ad: string }[];
}) {
  return (
    <div>
      <p className="font-semibold text-white mb-3 font-heading flex items-center gap-2">
        <span className="h-1 w-4 rounded bg-kirmizi-500 inline-block" />
        {baslik}
      </p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
        {ilceler.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/${i.slug}`}
              className="text-karanlik-400 hover:text-yesil-400 transition-colors duration-150"
            >
              {i.ad}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
