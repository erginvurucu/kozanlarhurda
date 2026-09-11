import { site, telLink, waLink } from "@/lib/site";

type Props = { bolge?: string; className?: string };

/** Mobilde ekranin altinda sabit duran Ara / WhatsApp cubugu. */
export function StickyCallBar({ bolge }: Props) {
  const mesaj = bolge
    ? `Merhaba, ${bolge} bölgesinde hurda satmak istiyorum.`
    : "Merhaba, hurda satmak istiyorum.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex md:hidden border-t border-celik-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <a
        href={telLink}
        data-cta="tel"
        data-bolge={bolge ?? "genel"}
        className="flex flex-1 items-center justify-center gap-2 py-4 font-semibold text-celik-900"
      >
        <PhoneIcon className="h-5 w-5" aria-hidden="true" />
        Hemen Ara
      </a>
      <a
        href={waLink(mesaj)}
        data-cta="whatsapp"
        data-bolge={bolge ?? "genel"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-4 font-semibold text-white"
      >
        <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

/** Sayfa icinde kullanilan buyuk cagri blogu. */
export function CtaBlok({ bolge, className = "" }: Props) {
  const baslik = bolge ? `${bolge} için ücretsiz fiyat alın` : "Ücretsiz fiyat alın";
  const mesaj = bolge
    ? `Merhaba, ${bolge} bölgesinde hurda satmak istiyorum.`
    : "Merhaba, hurda satmak istiyorum.";

  return (
    <section
      className={`rounded-2xl bg-celik-900 px-6 py-10 text-white sm:px-10 ${className}`}
      aria-labelledby="cta-baslik"
    >
      <h2 id="cta-baslik" className="text-2xl font-bold sm:text-3xl">
        {baslik}
      </h2>
      <p className="mt-3 max-w-prose text-celik-200">
        Fotoğrafını gönderin, aynı gün fiyat verelim. Keşif ve nakliye ücretsiz,
        ödeme yerinde ve nakit.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={telLink}
          data-cta="tel"
          data-bolge={bolge ?? "genel"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-bakir-500 px-6 py-3.5 font-semibold text-white transition hover:bg-bakir-600"
        >
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
          {site.phoneDisplay}
        </a>
        <a
          href={waLink(mesaj)}
          data-cta="whatsapp"
          data-bolge={bolge ?? "genel"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white transition hover:brightness-95"
        >
          <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
          WhatsApp'tan yazın
        </a>
        <a
          href="#teklif"
          className="inline-flex items-center justify-center rounded-xl border border-celik-600 px-6 py-3.5 font-semibold text-white transition hover:bg-celik-800"
        >
          Formu doldurun
        </a>
      </div>
    </section>
  );
}

export function PhoneIcon({ className = "", ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "", ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2-.5 3.3a11 11 0 0 0 4.6 4.6c1.6.7 2.6.7 3.5.5.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
    </svg>
  );
}
