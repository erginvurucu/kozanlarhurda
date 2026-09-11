import Link from "next/link";
import { site, telLink, waLink } from "@/lib/site";
import { oncelikliler, ilceler } from "@/data/ilceler";
import { LeadForm } from "@/components/LeadForm";
import { StickyCallBar, PhoneIcon, WhatsAppIcon } from "@/components/Cta";
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
      "Söküm, indirme ve taşıma bize ait — kat farkı gözetmeyiz. Tartım kalibreli kantarla gözünüzün önünde yapılır, ödeme teslim anında nakit.",
  },
];

export default function AnaSayfa() {
  const one = oncelikliler();

  return (
    <>
      {/* HERO */}
      <section className="border-b border-celik-200 bg-gradient-to-b from-celik-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-bakir-100 px-3.5 py-1.5 text-sm font-medium text-bakir-800">
              İstanbul'un 39 ilçesinde hizmet
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-celik-900 sm:text-5xl">
              Hurdanızı <span className="text-bakir-600">biz indiririz</span>,
              tartımı siz izlersiniz
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-celik-600">
              Kat farkı yok, asansör şartı yok, indirmek için üste para
              istemiyoruz. Kalibreli kantarla yerinde tartım, ödeme teslim
              anında nakit.
            </p>

            <ul className="mt-6 flex flex-col gap-2">
              {site.sozler.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-celik-700">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-bakir-500"
                    fill="currentColor"
                  >
                    <path d="M7.6 13.4 4.2 10l-1.2 1.2 4.6 4.6 9-9-1.2-1.2z" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telLink}
                data-cta="tel"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-bakir-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-bakir-600"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
              <a
                href={waLink("Merhaba, hurda satmak istiyorum.")}
                data-cta="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 text-lg font-semibold text-white transition hover:brightness-95"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
                WhatsApp'tan sor
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-celik-200 pt-6">
              {[
                ["İndirme dahil", "Kat farkı yok"],
                ["Aynı gün", "Randevu imkânı"],
                ["Nakit", "Teslim anında"],
              ].map(([ust, alt]) => (
                <div key={ust}>
                  <dt className="text-xl font-bold text-celik-900">{ust}</dt>
                  <dd className="mt-0.5 text-sm text-celik-600">{alt}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div id="teklif" className="scroll-mt-24">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* NASIL CALISIR */}
      <section id="nasil" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <h2 className="text-3xl font-bold text-celik-900">Nasıl çalışır?</h2>
        <p className="mt-3 max-w-prose text-celik-600">
          Üç adım, tek gün. İndirme bizden, sürprizli maliyet veya gizli kesinti yok.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {ADIMLAR.map((a, i) => (
            <li
              key={a.baslik}
              className="rounded-2xl border border-celik-200 bg-white p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-celik-900 font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-celik-900">
                {a.baslik}
              </h3>
              <p className="mt-2 leading-relaxed text-celik-600">{a.metin}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ONCELIKLI BOLGELER */}
      <section className="bg-celik-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-celik-900">
            En yoğun çalıştığımız bölgeler
          </h2>
          <p className="mt-3 max-w-prose text-celik-600">
            Her bölgenin hurdası farklıdır. Sizin bölgenizde neyin çıktığını ve
            nasıl çalıştığımızı ilçe sayfasında anlattık.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {one.map((i) => (
              <Link
                key={i.slug}
                href={`/${i.slug}`}
                className="group rounded-2xl border border-celik-200 bg-white p-6 transition hover:border-bakir-400 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-celik-900 group-hover:text-bakir-600">
                  {i.ad} Hurdacı
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-celik-600">
                  {i.profil}
                </p>
                <p className="mt-4 text-sm font-medium text-bakir-600">
                  {i.varis} →
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/bolgeler"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-celik-900 underline underline-offset-4"
          >
            39 ilçenin tamamını gör
          </Link>
        </div>
      </section>

      {/* SSS */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl font-bold text-celik-900">Sık sorulan sorular</h2>
        <div className="mt-8 divide-y divide-celik-200 border-y border-celik-200">
          {GENEL_SSS.map((x) => (
            <details key={x.s} className="group py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-celik-900">
                {x.s}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-bakir-500 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-celik-600">{x.c}</p>
            </details>
          ))}
        </div>
      </section>

      {/* TUM ILCELER - ic linkleme */}
      <section className="border-t border-celik-200 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-celik-900">
            İstanbul geneli hurda alımı
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {ilceler.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/${i.slug}`}
                  className="inline-block rounded-lg border border-celik-200 px-3 py-1.5 text-sm text-celik-700 transition hover:border-bakir-400 hover:text-bakir-600"
                >
                  {i.ad} Hurdacı
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
