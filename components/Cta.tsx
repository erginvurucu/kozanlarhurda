import { site, telLink, waLink } from "@/lib/site";

type Props = { bolge?: string; className?: string };

const mesajYaz = (bolge?: string) =>
  bolge
    ? `Merhaba, ${bolge} bölgesinde hurda satmak istiyorum.`
    : "Merhaba, hurda satmak istiyorum.";

/** Mobilde ekranın altında sabit duran Ara / WhatsApp çubuğu. */
export function StickyCallBar({ bolge }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t-2 border-lacivert-800 md:hidden pb-[env(safe-area-inset-bottom)]">
      <a
        href={telLink}
        data-cta="tel"
        data-bolge={bolge ?? "genel"}
        className="dugme dugme-ana flex-1 rounded-none py-4 text-[15px]"
      >
        <PhoneIcon className="h-5 w-5" aria-hidden="true" />
        Hemen Ara
      </a>
      <a
        href={waLink(mesajYaz(bolge))}
        data-cta="whatsapp"
        data-bolge={bolge ?? "genel"}
        target="_blank"
        rel="noopener noreferrer"
        className="dugme dugme-whatsapp flex-1 rounded-none py-4 text-[15px]"
      >
        <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

/** Sayfa içinde kullanılan çağrı bloğu — evrak dilinde, gradient yok. */
export function CtaBlok({ bolge, className = "" }: Props) {
  const baslik = bolge
    ? `${bolge} için fiyat alın`
    : "Hurdanızın fiyatını öğrenin";

  return (
    <section
      className={`zemin-kareli-koyu text-white ${className}`}
      aria-labelledby="cta-baslik"
    >
      <div className="serit-fistik" />
      <div className="px-6 py-12 sm:px-10 sm:py-14">
        <p className="etiket etiket-acik">Ücretsiz keşif · Aynı gün</p>

        <h2
          id="cta-baslik"
          className="mt-3 max-w-2xl text-[28px] leading-[1.15] text-white sm:text-[34px]"
        >
          {baslik}
        </h2>

        <p className="mt-4 max-w-prose text-kurum-300">
          Fotoğrafını gönderin, fiyat aralığını hemen söyleyelim. Keşif,
          indirme ve nakliye bizden; ödeme teslim anında nakit.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={telLink}
            data-cta="tel"
            data-bolge={bolge ?? "genel"}
            className="dugme dugme-fistik px-6 py-3.5 text-base"
          >
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
            <span className="rakam">{site.phoneDisplay}</span>
          </a>
          <a
            href={waLink(mesajYaz(bolge))}
            data-cta="whatsapp"
            data-bolge={bolge ?? "genel"}
            target="_blank"
            rel="noopener noreferrer"
            className="dugme dugme-whatsapp px-6 py-3.5 text-base"
          >
            <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
            WhatsApp&apos;tan yazın
          </a>
          <a
            href="#teklif"
            className="dugme dugme-cerceve-acik px-6 py-3.5 text-base"
          >
            Formu doldurun
          </a>
        </div>
      </div>
    </section>
  );
}

export function PhoneIcon({
  className = "",
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

export function WhatsAppIcon({
  className = "",
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2-.5 3.3a11 11 0 0 0 4.6 4.6c1.6.7 2.6.7 3.5.5.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
    </svg>
  );
}

/** Onay işareti — fıstık yeşili, vaat listelerinde kullanılır. */
export function OnayIkon({
  className = "",
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} {...rest}>
      <path d="M7.6 13.4 4.2 10l-1.2 1.2 4.6 4.6 9-9-1.2-1.2z" />
    </svg>
  );
}
