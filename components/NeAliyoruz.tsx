import { waLink } from "@/lib/site";
import { OnayIkon, WhatsAppIcon } from "./Cta";

/**
 * "Hangi hurdaları alıyoruz?" bolumu.
 *
 * Almadiklarimizi da yazmak bilerek: musteri bos yere aramasin,
 * biz de bos yere yola cikmayalim. Bu bolum cagri kalitesini
 * yukselttigi icin dogrudan operasyonel fayda saglar.
 */

const ALDIKLARIMIZ = [
  {
    baslik: "Bakır ve kablo",
    detay: "Soyma, lama, boru, talaş, kalorifer bakırı; her kesit kablo",
  },
  {
    baslik: "Pirinç, bronz, kurşun",
    detay: "Musluk ve tesisat sarısı, talaş, çubuk, makine aksamı",
  },
  {
    baslik: "Alüminyum",
    detay: "Profil, döküm, jant, radyatör, ofset, talaş",
  },
  {
    baslik: "Demir ve çelik",
    detay: "Sac, profil, döküm, talaş, paslanmaz 304 ve 316",
  },
  {
    baslik: "Beyaz eşya ve ev hurdası",
    detay: "Buzdolabı, çamaşır ve bulaşık makinesi, fırın, klima",
  },
  {
    baslik: "Kombi, petek, kazan",
    detay: "Doğalgaz kombisi, panel radyatör, kalorifer kazanı",
  },
  {
    baslik: "Sanayi ve fabrika hurdası",
    detay: "Tezgâh, jeneratör, çelik çatı, sandviç panel, raf sistemi",
  },
  {
    baslik: "Ticari mutfak ve hurda araç",
    detay: "Paslanmaz mutfak ekipmanı, ocak, davlumbaz; hurda araç",
  },
];

const ALMADIKLARIMIZ = [
  "Kâğıt, karton ve ambalaj atığı",
  "Plastik, cam ve moloz",
  "Tekstil ve mobilya",
  "Evsel çöp ve organik atık",
  "Tehlikeli atık (kimyasal, tıbbi, yağ)",
];

export function NeAliyoruz() {
  return (
    <section
      id="ne-aliyoruz"
      className="scroll-mt-20 bg-white py-20"
      aria-labelledby="ne-aliyoruz-baslik"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="kural max-w-2xl">
          <p className="etiket">Hurda kabul</p>
          <h2
            id="ne-aliyoruz-baslik"
            className="mt-2 text-[32px] leading-tight sm:text-[38px]"
          >
            Hangi hurdaları alıyoruz?
          </h2>
          <p className="mt-3 text-lg text-kurum-600">
            Vaktinizi boşa harcamayın. Aldığımız ve almadığımız türleri
            aşağıda net yazdık; emin değilseniz fotoğrafını gönderin,
            hemen söyleyelim.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_1fr]">
          {/* Aldıklarımız */}
          <div>
            <div className="flex items-center gap-2.5 border-b-2 border-fistik-500 pb-3">
              <OnayIkon
                className="h-5 w-5 text-fistik-600"
                aria-hidden="true"
              />
              <h3 className="text-lg">Alıyoruz</h3>
            </div>

            <ul className="grid gap-px bg-kurum-200 sm:grid-cols-2">
              {ALDIKLARIMIZ.map((k) => (
                <li key={k.baslik} className="bg-white px-1 py-4 sm:px-4">
                  <p className="font-semibold text-lacivert-900">{k.baslik}</p>
                  <p className="mt-1 text-sm leading-relaxed text-kurum-600">
                    {k.detay}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Almadıklarımız */}
          <div>
            <div className="flex items-center gap-2.5 border-b-2 border-kurum-300 pb-3">
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5 text-kurum-400"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 2.4c1.2 0 2.3.4 3.2 1L5.4 13.2a5.6 5.6 0 0 1 4.6-8.8Zm0 11.2c-1.2 0-2.3-.4-3.2-1l7.8-7.8a5.6 5.6 0 0 1-4.6 8.8Z" />
              </svg>
              <h3 className="text-lg text-kurum-700">Almıyoruz</h3>
            </div>

            <ul className="flex flex-col">
              {ALMADIKLARIMIZ.map((k) => (
                <li
                  key={k}
                  className="border-b border-kurum-200 py-3 text-kurum-600"
                >
                  {k}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-l-[3px] border-lacivert-600 bg-kurum-50 px-5 py-4">
              <p className="text-sm leading-relaxed text-kurum-700">
                <strong className="text-lacivert-900">
                  Kombi ve petek beyaz eşya sayılmaz
                </strong>{" "}
                — onları alıyoruz. Karışık bir yükünüz varsa metal olanları
                ayırıp geri kalanını size bırakırız.
              </p>
            </div>

            <a
              href={waLink(
                "Merhaba, elimdeki hurdayı alıp almadığınızı öğrenmek istiyorum.",
              )}
              data-cta="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="dugme dugme-whatsapp mt-5 w-full px-5 py-3.5"
            >
              <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
              Fotoğraf gönder, sorayım
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
