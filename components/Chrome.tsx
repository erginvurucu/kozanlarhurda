import Link from "next/link";
import { site, telLink } from "@/lib/site";
import { PhoneIcon } from "./Cta";
import { yakayaGore } from "@/data/ilceler";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-celik-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-celik-900">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-lg bg-bakir-500 text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M3 18h18v3H3v-3Zm2.6-2 3-8h6.8l3 8H5.6ZM10 3h4v5h-4V3Z" />
            </svg>
          </span>
          <span className="text-lg">{site.name}</span>
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-6 md:flex">
          <Link href="/hurda-fiyatlari" className="font-medium text-celik-700 hover:text-bakir-600">
            Hurda Fiyatları
          </Link>
          <Link href="/bolgeler" className="font-medium text-celik-700 hover:text-bakir-600">
            Bölgeler
          </Link>
          <Link href="/#nasil" className="font-medium text-celik-700 hover:text-bakir-600">
            Nasıl Çalışır
          </Link>
          <a
            href={telLink}
            data-cta="tel"
            className="inline-flex items-center gap-2 rounded-lg bg-celik-900 px-4 py-2.5 font-semibold text-white transition hover:bg-celik-800"
          >
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
        </nav>

        <a
          href={telLink}
          data-cta="tel"
          aria-label={`Telefonla ara: ${site.phoneDisplay}`}
          className="inline-flex items-center gap-2 rounded-lg bg-celik-900 px-3.5 py-2 text-sm font-semibold text-white md:hidden"
        >
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          Ara
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  const avrupa = yakayaGore("avrupa");
  const anadolu = yakayaGore("anadolu");

  return (
    <footer className="mt-20 border-t border-celik-200 bg-celik-50">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-celik-900">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-celik-600">
              {site.description}
            </p>
            <a
              href={telLink}
              data-cta="tel"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-bakir-600"
            >
              <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
          </div>

          <FooterIlceListesi baslik="Avrupa Yakası" ilceler={avrupa} />
          <FooterIlceListesi baslik="Anadolu Yakası" ilceler={anadolu} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-celik-200 pt-6 text-sm text-celik-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <nav aria-label="Yasal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/kvkk" className="hover:text-bakir-600">
              Aydınlatma Metni
            </Link>
            <Link href="/gizlilik" className="hover:text-bakir-600">
              Gizlilik Politikası
            </Link>
            <Link href="/bolgeler" className="hover:text-bakir-600">
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
      <p className="font-semibold text-celik-900">{baslik}</p>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
        {ilceler.map((i) => (
          <li key={i.slug}>
            <Link href={`/${i.slug}`} className="text-celik-600 hover:text-bakir-600">
              {i.ad}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
