import { site, telLink, mailLink } from "@/lib/site";
import { PhoneIcon } from "./Cta";

/**
 * Adres / konum bolumu.
 *
 * Gomulu harita (iframe) bilerek kullanilmadi: ucuncu taraf cerez
 * yerlestiriyor, KVKK aydinlatma metnimizle celisir ve sayfayi
 * agirlastirir. Yerine acik adres ve yol tarifi baglantisi var -
 * kullanicinin ihtiyaci zaten bu.
 *
 * Acik adres ayni zamanda en guclu kurumsal guven sinyallerinden biri
 * ve yerel aramada isletmeyi bolgeye baglar.
 */
export function Konum() {
  return (
    <section
      id="konum"
      className="zemin-kareli scroll-mt-20 border-t border-kurum-200 py-16"
      aria-labelledby="konum-baslik"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="kural">
          <p className="etiket">İletişim</p>
          <h2 id="konum-baslik" className="mt-2 text-[28px] sm:text-[32px]">
            Adresimiz ve iletişim
          </h2>
        </div>

        <div className="mt-9 grid gap-px border border-kurum-200 bg-kurum-200 md:grid-cols-3">
          <div className="bg-white p-6">
            <p className="etiket">Adres</p>
            <p className="mt-2 leading-relaxed text-lacivert-900">
              {site.address.mahalle}
              <br />
              {site.address.cadde}
              <br />
              {site.address.ilce} / {site.address.sehir}
            </p>
            <a
              href={site.address.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="bag-alti mt-4 inline-block text-[15px] font-semibold text-lacivert-700"
            >
              Yol tarifi al
            </a>
          </div>

          <div className="bg-white p-6">
            <p className="etiket">Telefon</p>
            <a
              href={telLink}
              data-cta="tel"
              className="rakam mt-2 block text-2xl font-semibold text-lacivert-900 hover:text-lacivert-600"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-kurum-600">
              Hattımız açık. Arayamıyorsanız WhatsApp&apos;tan fotoğraf
              göndermeniz yeterli.
            </p>
          </div>

          <div className="bg-white p-6">
            <p className="etiket">E-posta</p>
            <a
              href={mailLink}
              className="mt-2 block break-words text-lacivert-900 hover:text-lacivert-600"
            >
              {site.email}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-kurum-600">
              Kurumsal alımlar, tonajlı teklifler ve evrak talepleri için.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={telLink} data-cta="tel" className="dugme dugme-ana px-6 py-3.5">
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
            <span className="rakam">{site.phoneDisplay}</span>
          </a>
          <a
            href={site.address.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="dugme dugme-cerceve px-6 py-3.5"
          >
            Haritada aç
          </a>
        </div>
      </div>
    </section>
  );
}
