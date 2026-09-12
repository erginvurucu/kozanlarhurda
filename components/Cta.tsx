import { site, telLink, waLink } from "@/lib/site";

type Props = { bolge?: string; className?: string };

/** Mobilde ekranın altında sabit duran Ara / WhatsApp çubuğu. */
export function StickyCallBar({ bolge }: Props) {
  const mesaj = bolge
    ? `Merhaba, ${bolge} bölgesinde hurda satmak istiyorum.`
    : "Merhaba, hurda satmak istiyorum.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex md:hidden shadow-2xl pb-[env(safe-area-inset-bottom)]">
      <a
        href={telLink}
        data-cta="tel"
        data-bolge={bolge ?? "genel"}
        className="flex flex-1 items-center justify-center gap-2 py-4 font-bold text-white btn-kirmizi"
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
        className="flex flex-1 items-center justify-center gap-2 py-4 font-bold text-white btn-yesil"
      >
        <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

/** Sayfa içinde kullanılan büyük çağrı bloğu. */
export function CtaBlok({ bolge, className = "" }: Props) {
  const baslik = bolge ? `${bolge} için ücretsiz fiyat alın` : "Ücretsiz fiyat alın";
  const mesaj = bolge
    ? `Merhaba, ${bolge} bölgesinde hurda satmak istiyorum.`
    : "Merhaba, hurda satmak istiyorum.";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-karanlik-900 px-6 py-12 text-white sm:px-10 ${className}`}
      aria-labelledby="cta-baslik"
    >
      {/* Arka plan efekti */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-kirmizi-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yesil-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-yesil-900/60 border border-yesil-700 px-3 py-1 mb-4">
          <span className="text-yesil-400 text-sm">♻</span>
          <span className="text-xs text-yesil-300 font-medium">Ücretsiz Keşif & Taşıma</span>
        </div>

        <h2 id="cta-baslik" className="text-2xl font-bold sm:text-3xl font-heading">
          {baslik}
        </h2>
        <p className="mt-3 max-w-prose text-karanlik-300">
          Fotoğrafını gönderin, aynı gün fiyat verelim. Keşif ve nakliye ücretsiz,
          ödeme yerinde ve nakit.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={telLink}
            data-cta="tel"
            data-bolge={bolge ?? "genel"}
            className="inline-flex items-center justify-center gap-2 btn-kirmizi text-white rounded-xl px-6 py-3.5 font-semibold"
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
            className="inline-flex items-center justify-center gap-2 btn-yesil text-white rounded-xl px-6 py-3.5 font-semibold"
          >
            <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
            WhatsApp&apos;tan yazın
          </a>
          <a
            href="#teklif"
            className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 px-6 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Formu doldurun
          </a>
        </div>
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
