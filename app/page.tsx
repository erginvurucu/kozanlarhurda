import Link from "next/link";
import { site, telLink, waLink } from "@/lib/site";
import { oncelikliler, ilceler } from "@/data/ilceler";
import { LeadForm } from "@/components/LeadForm";
import {
  StickyCallBar,
  PhoneIcon,
  WhatsAppIcon,
  OnayIkon,
} from "@/components/Cta";
import { FiyatSeridi } from "@/components/FiyatSeridi";
import { faqSchema, jsonLd } from "@/lib/schema";

const GENEL_SSS = [
  {
    s: "Eşyayı indirmek için benden para ister misiniz?",
    c: "Hayır. İndirme, söküm ve taşıma hizmete dahildir ve bunun için sizden ücret talep etmiyoruz. Asansörsüz binalarda üst kat alımlarında ekibe ilave personel veriyoruz; kat ve asansör bilgisini önceden belirtmeniz yeterli.",
  },
  {
    s: "Hurda alımı için ücret alıyor musunuz?",
    c: "Hayır. Keşif, söküm ve nakliye ücretsizdir. Siz hurdanızı satarsınız, biz öderiz. Fiyatı beğenmezseniz hiçbir yükümlülüğünüz olmaz.",
  },
  {
    s: "Tartım nasıl yapılıyor, güvenebilir miyim?",
    c: "Tartım kalibreli dijital kantarla, sizin gözünüzün önünde yapılır. Rakamı birlikte okuruz. Tonajlı alımlarda araç dolu ve boş tartılır, kantar fişi size teslim edilir.",
  },
  {
    s: "Ödeme nasıl yapılıyor?",
    c: "Ödeme yerinde, teslim anında ve nakit olarak yapılır. Kurumsal alımlarda talep üzerine banka havalesi ve irsaliye düzenlenir.",
  },
  {
    s: "Aynı gün gelebiliyor musunuz?",
    c: "Sabah saatlerinde verilen taleplerde çoğunlukla aynı gün ekip yönlendiriliyor. Öğleden sonraki taleplerde genellikle ertesi sabah randevu veriliyor.",
  },
  {
    s: "Fiyatı nasıl belirliyorsunuz?",
    c: "Fiyat; hurdanın cinsine, ağırlığına ve durumuna göre güncel piyasa üzerinden belirlenir. Fotoğraf gönderirseniz telefonda çok daha net bir aralık verebiliriz.",
  },
  {
    s: "Çalışır durumdaki eşyamı da alıyor musunuz?",
    c: "Evet. Çalışır ve bakımlı cihazlarda hurda kilo fiyatı yerine ikinci el değeri üzerinden teklif verilir; bu genellikle daha yüksek bir rakam anlamına gelir.",
  },
  {
    s: "Hangi bölgelere hizmet veriyorsunuz?",
    c: "İstanbul'un 39 ilçesinin tamamına hizmet veriyoruz. Bölgenize özel bilgi için ilçe sayfanıza göz atabilirsiniz.",
  },
];

/** Gerçek bir sıra: numaralandırma bu yüzden bilgi taşıyor. */
const ADIMLAR = [
  {
    baslik: "Fotoğrafı gönderin",
    metin:
      "WhatsApp'tan hurdanızın fotoğrafını atın veya formu doldurun. Ne kadar net görürsek fiyat o kadar net olur.",
  },
  {
    baslik: "Fiyatı öğrenin",
    metin:
      "Güncel piyasa üzerinden fiyat aralığını hemen söyleyelim. Anlaşırsak randevu saatini birlikte belirleriz.",
  },
  {
    baslik: "Ekip gelsin, ödemeyi alın",
    metin:
      "Söküm, indirme ve taşıma bize ait — kat farkı gözetmeyiz. Tartım kalibreli kantarla, ödeme teslim anında nakit.",
  },
];

const KUNYE = [
  { deger: "39", birim: "ilçe", aciklama: "İstanbul geneli" },
  { deger: "0", birim: "TL", aciklama: "Keşif, indirme, nakliye" },
  { deger: "Nakit", birim: "", aciklama: "Teslim anında ödeme" },
];

const TICKER_KALEMLERI = [
  "Bakır",
  "Alüminyum",
  "Demir & Çelik",
  "Pirinç",
  "Paslanmaz",
  "Kablo",
  "Beyaz Eşya",
  "Kombi & Kazan",
  "Klima",
  "Hurda Araç",
  "Sanayi Hurdası",
  "Ticari Mutfak",
];

export default function AnaSayfa() {
  const one = oncelikliler();

  return (
    <>
      {/* ── ALINAN HURDA ŞERİDİ ── */}
      <div className="ticker-kutu overflow-hidden border-b border-lacivert-800 bg-lacivert-900 py-2.5">
        <div className="animate-ticker flex gap-10">
          {[0, 1].map((kopya) => (
            <span
              key={kopya}
              /* İkinci kopya yalnızca kesintisiz döngü içindir: ekran
                 okuyucuya tekrar okutmuyoruz, hareket kapalıyken gizliyoruz. */
              aria-hidden={kopya === 1 ? true : undefined}
              className={`flex shrink-0 gap-10${
                kopya === 1 ? " ticker-kopya" : ""
              }`}
            >
              {TICKER_KALEMLERI.map((kalem) => (
                <span
                  key={kalem}
                  className="etiket flex items-center gap-2.5 text-kurum-300"
                >
                  <span className="h-1 w-1 shrink-0 bg-fistik-500" />
                  {kalem}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="zemin-kareli-koyu text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            {/* Eyebrow'da marka slogani kullanilmiyor: basligin kendisi de
                slogan oldugu icin ikisi ust uste dolgu gibi okunuyordu.
                Slogan footer'da marka kilitlemesinin yaninda duruyor. */}
            <p className="etiket etiket-acik">
              İstanbul&apos;un 39 ilçesinde yerinde hurda alımı
            </p>

            <h1 className="mt-5 text-[38px] leading-[1.08] text-white sm:text-[52px]">
              <span className="text-fistik-400">Sorumlu tartım</span>,
              <br className="hidden sm:block" /> güvenilir hizmet
            </h1>

            <p className="mt-6 max-w-prose text-lg leading-relaxed text-kurum-300">
              Hurdanızı biz indiririz, tartımı siz izlersiniz. Kat farkı yok,
              asansör şartı yok, indirmek için üste para istemiyoruz. Ödeme
              teslim anında nakit.
            </p>

            <ul className="mt-8 flex flex-col">
              {site.sozler.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 border-b border-white/10 py-3 first:border-t first:border-white/10"
                >
                  <OnayIkon
                    className="mt-1 h-4 w-4 shrink-0 text-fistik-500"
                    aria-hidden="true"
                  />
                  <span className="text-kurum-100">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telLink}
                data-cta="tel"
                className="dugme dugme-fistik px-7 py-4 text-lg"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                <span className="rakam">{site.phoneDisplay}</span>
              </a>
              <a
                href={waLink("Merhaba, hurda satmak istiyorum.")}
                data-cta="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="dugme dugme-whatsapp px-7 py-4 text-lg"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
                WhatsApp&apos;tan sor
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 border-t border-white/15 pt-6">
              {KUNYE.map((k) => (
                <div key={k.aciklama}>
                  <dt className="sr-only">{k.aciklama}</dt>
                  <dd>
                    <span className="rakam text-3xl font-semibold text-white">
                      {k.deger}
                    </span>
                    {k.birim && (
                      <span className="rakam ml-1 text-base text-fistik-400">
                        {k.birim}
                      </span>
                    )}
                    <span className="mt-1 block text-[13px] leading-snug text-kurum-400">
                      {k.aciklama}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div id="teklif" className="scroll-mt-24">
            <LeadForm />
          </div>
        </div>
      </section>

      <div className="serit" />

      {/* ── FİYAT ŞERİDİ ── */}
      <FiyatSeridi />

      {/* ── NASIL ÇALIŞIR ── */}
      <section id="nasil" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="kural max-w-2xl">
            <p className="etiket">Süreç</p>
            <h2 className="mt-2 text-[32px] leading-tight sm:text-[38px]">
              Üç adım, tek gün
            </h2>
            <p className="mt-3 text-lg text-kurum-600">
              İndirme bizden. Sürpriz maliyet, gizli kesinti veya sonradan
              düşürülen fiyat yok.
            </p>
          </div>

          <ol className="mt-12 grid gap-px border border-kurum-200 bg-kurum-200 md:grid-cols-3">
            {ADIMLAR.map((a, i) => (
              <li key={a.baslik} className="bg-white p-7">
                <span className="rakam text-[34px] font-semibold leading-none text-kurum-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl">{a.baslik}</h3>
                <p className="mt-2.5 leading-relaxed text-kurum-600">
                  {a.metin}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── ÖNCELİKLİ BÖLGELER ── */}
      <section className="zemin-kareli border-y border-kurum-200 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="kural max-w-2xl">
            <p className="etiket">Bölgeler</p>
            <h2 className="mt-2 text-[32px] leading-tight sm:text-[38px]">
              En yoğun çalıştığımız yerler
            </h2>
            <p className="mt-3 text-lg text-kurum-600">
              Her bölgenin hurdası farklıdır. Sizin bölgenizde neyin çıktığını
              ve nasıl çalıştığımızı ilçe sayfasında anlattık.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {one.map((i) => (
              <Link
                key={i.slug}
                href={`/${i.slug}`}
                className="evrak-vurgu group flex flex-col p-6 transition-colors hover:border-t-fistik-500"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl group-hover:text-lacivert-600">
                    {i.ad}
                  </h3>
                  <span className="etiket shrink-0">Hurdacı</span>
                </div>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-kurum-600">
                  {i.profil}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-kurum-200 pt-3.5">
                  <span className="etiket">Varış</span>
                  <span className="rakam text-sm font-medium text-lacivert-700">
                    {i.varis}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/bolgeler"
            className="dugme dugme-cerceve mt-9 px-5 py-3 text-[15px]"
          >
            39 ilçenin tamamını gör
          </Link>
        </div>
      </section>

      {/* ── SSS ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="kural">
            <p className="etiket">Merak edilenler</p>
            <h2 className="mt-2 text-[32px] leading-tight sm:text-[38px]">
              Sık sorulan sorular
            </h2>
          </div>

          <div className="mt-10 border-t border-kurum-200">
            {GENEL_SSS.map((x) => (
              <details key={x.s} className="group border-b border-kurum-200">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-semibold text-lacivert-900 hover:text-lacivert-600">
                  <span>{x.s}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-2xl font-light leading-none text-kurum-400 transition-transform duration-200 group-open:rotate-45 group-open:text-fistik-600"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-prose pb-6 pr-8 leading-relaxed text-kurum-600">
                  {x.c}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÜM İLÇELER ── */}
      <section className="zemin-kareli border-t border-kurum-200 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="etiket">İstanbul geneli</p>
          <h2 className="mt-2 text-2xl">Hizmet verdiğimiz ilçeler</h2>

          <ul className="mt-7 flex flex-wrap gap-2">
            {ilceler.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/${i.slug}`}
                  className="inline-block border border-kurum-200 bg-white px-3 py-1.5 text-sm text-kurum-700 transition-colors hover:border-lacivert-600 hover:text-lacivert-700"
                >
                  {i.ad}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StickyCallBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(GENEL_SSS))}
      />
    </>
  );
}
