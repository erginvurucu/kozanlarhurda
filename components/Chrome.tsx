import Link from "next/link";
import { site, telLink, mailLink } from "@/lib/site";
import { PhoneIcon } from "./Cta";
import { yakayaGore, sehreGore } from "@/data/ilceler";

/**
 * Marka kilitlemesi — logonun yapısını yazıyla kurar:
 * lacivert "KOZANLAR", altında fıstık yeşili "HURDA · METAL".
 * Görsel dosya yerine metin kullanıldığı için her boyutta net kalır
 * ve ekran okuyucu markayı doğru okur.
 */
function Marka({
  koyuZemin = false,
  boyut = "normal",
}: {
  koyuZemin?: boolean;
  boyut?: "normal" | "buyuk";
}) {
  const buyuk = boyut === "buyuk";
  return (
    <span className="inline-flex flex-col leading-[0.95]">
      <span
        className={`font-baslik font-extrabold tracking-[-0.03em] ${
          buyuk ? "text-[26px]" : "text-[21px]"
        } ${koyuZemin ? "text-white" : "text-lacivert-600"}`}
      >
        KOZANLAR
        <span
          className={`align-super ml-0.5 font-normal ${
            buyuk ? "text-[11px]" : "text-[9px]"
          } ${koyuZemin ? "text-white/60" : "text-lacivert-300"}`}
        >
          ®
        </span>
      </span>
      <span
        className={`font-mono font-medium tracking-[0.22em] ${
          buyuk ? "text-[10px]" : "text-[8.5px]"
        } ${koyuZemin ? "text-fistik-400" : "text-fistik-600"}`}
      >
        HURDA · METAL
      </span>
    </span>
  );
}

const MENU = [
  { ad: "Hurda Fiyatları", href: "/hurda-fiyatlari" },
  { ad: "Kurumsal", href: "/kurumsal" },
  { ad: "Bölgeler", href: "/bolgeler" },
  { ad: "Rehber", href: "/rehber" },
  { ad: "Nasıl Çalışır", href: "/#nasil" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-kurum-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link href="/" aria-label={`${site.name} ana sayfa`}>
          <Marka />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-7 md:flex">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="bag-alti text-[15px] font-medium text-kurum-700 hover:text-lacivert-700 transition-colors"
            >
              {m.ad}
            </Link>
          ))}
          <a
            href={telLink}
            data-cta="tel"
            className="dugme dugme-ana px-5 py-2.5 text-[15px]"
          >
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            <span className="rakam">{site.phoneDisplay}</span>
          </a>
        </nav>

        <a
          href={telLink}
          data-cta="tel"
          aria-label={`Telefonla ara: ${site.phoneDisplay}`}
          className="dugme dugme-ana px-4 py-2.5 text-sm md:hidden"
        >
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          Hemen Ara
        </a>
      </div>

      {/* Marka renklerinin ince yapısal şeridi */}
      <div className="serit-fistik" />
    </header>
  );
}

export function Footer() {
  const avrupa = yakayaGore("avrupa");
  const anadolu = yakayaGore("anadolu");
  // Trakya ilcelerinin "yaka"si yok; il bazinda cekiliyor.
  const trakya = [...sehreGore("Tekirdağ"), ...sehreGore("Kırklareli")];

  return (
    <footer className="mt-24 zemin-kareli-koyu text-white">
      <div className="serit" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr]">
          {/* Künye */}
          <div>
            <Marka koyuZemin boyut="buyuk" />

            <p className="mt-4 max-w-xs font-baslik text-[15px] leading-snug text-fistik-400">
              {site.slogan}
            </p>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-kurum-300">
              {site.description}
            </p>

            <dl className="mt-7 flex flex-col gap-3.5">
              <div>
                <dt className="etiket etiket-acik">Telefon</dt>
                <dd className="mt-1">
                  <a
                    href={telLink}
                    data-cta="tel"
                    className="rakam text-xl font-semibold text-white hover:text-fistik-400 transition-colors"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="etiket etiket-acik">E-posta</dt>
                <dd className="mt-1">
                  <a
                    href={mailLink}
                    className="text-sm text-kurum-200 hover:text-white transition-colors"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="etiket etiket-acik">Adres</dt>
                <dd className="mt-1">
                  <a
                    href={site.address.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-relaxed text-kurum-200 hover:text-white transition-colors"
                  >
                    {site.address.tam}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <FooterIlceListesi baslik="İstanbul — Avrupa" ilceler={avrupa} />
          <FooterIlceListesi baslik="İstanbul — Anadolu" ilceler={anadolu} />
          <FooterIlceListesi baslik="Trakya Sanayi" ilceler={trakya} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-kurum-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} — Tüm hakları
            saklıdır.
          </p>
          <nav aria-label="Yasal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/kvkk" className="hover:text-fistik-400 transition-colors">
              Aydınlatma Metni
            </Link>
            <Link
              href="/gizlilik"
              className="hover:text-fistik-400 transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/bolgeler"
              className="hover:text-fistik-400 transition-colors"
            >
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
      <p className="etiket etiket-acik">{baslik}</p>
      <p className="rakam mt-1 text-xs text-kurum-500">
        {ilceler.length} ilçe
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-sm">
        {ilceler.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/${i.slug}`}
              className="text-kurum-300 hover:text-white transition-colors"
            >
              {i.ad}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
