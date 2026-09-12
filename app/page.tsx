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
    no: "01",
    ikon: "📸",
    baslik: "Fotoğrafı gönderin",
    metin:
      "WhatsApp'tan hurdanızın fotoğrafını atın veya formu doldurun. Ne kadar net görürsek fiyat o kadar net olur.",
    renk: "from-kirmizi-500 to-kirmizi-700",
  },
  {
    no: "02",
    ikon: "💬",
    baslik: "Fiyatı öğrenin",
    metin:
      "Güncel piyasa üzerinden fiyat aralığını hemen söyleyelim. Anlaşırsak randevu saatini birlikte belirleriz.",
    renk: "from-yesil-500 to-yesil-700",
  },
  {
    no: "03",
    ikon: "💰",
    baslik: "Ekip gelsin, ödemeyi alın",
    metin:
      "Söküm, indirme ve taşıma bize ait — kat farkı gözetmeyiz. Tartım kalibreli kantarla, ödeme teslim anında nakit.",
    renk: "from-kirmizi-500 to-yesil-600",
  },
];

const ISTATISTIKLER = [
  { sayi: "39", birim: "İlçe", aciklama: "İstanbul geneli hizmet" },
  { sayi: "7/24", birim: "Destek", aciklama: "Her zaman ulaşabilirsiniz" },
  { sayi: "0", birim: "TL", aciklama: "Keşif & nakliye ücreti" },
];

export default function AnaSayfa() {
  const one = oncelikliler();

  return (
    <>
      {/* ── TICKER BANDI ── */}
      <div className="bg-karanlik-900 text-white py-2 overflow-hidden">
        <div className="animate-ticker flex gap-16 text-sm font-medium">
          {[...Array(2)].map((_, outer) => (
            <span key={outer} className="flex gap-16 shrink-0">
              {[
                "♻ Bakır Alımı",
                "♻ Alüminyum Alımı",
                "♻ Demir & Çelik",
                "♻ Beyaz Eşya",
                "♻ Kombi & Kazan",
                "♻ Hurda Araç",
                "♻ Sanayi Hurdası",
                "♻ Klima & Elektronik",
              ].map((item) => (
                <span key={item} className="text-karanlik-300">
                  <span className="text-yesil-400 mr-2">●</span>
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-karanlik-900 via-karanlik-800 to-karanlik-900 text-white">
        {/* Arka plan dekorasyon küreleri */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-kirmizi-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yesil-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kirmizi-900/10 rounded-full blur-3xl" />
        </div>

        {/* Metal grid arka planı */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            {/* Üst badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-yesil-700/50 bg-yesil-900/30 px-4 py-2 text-sm font-medium text-yesil-300 mb-6">
              <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin-slow text-yesil-400" fill="currentColor" aria-hidden="true">
                <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4C7.58 4 4 7.58 4 12s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
              İstanbul&apos;un 39 ilçesinde hizmet
            </div>

            {/* Ana başlık */}
            <h1 className="text-4xl font-black leading-[1.1] sm:text-5xl lg:text-6xl font-heading">
              Hurdanızı{" "}
              <span className="text-gradient-kirmizi">biz indiririz</span>
              ,
              <br />
              tartımı siz{" "}
              <span className="text-gradient-yesil">izlersiniz</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-karanlik-300">
              Kat farkı yok, asansör şartı yok, indirmek için üste para
              istemiyoruz. Kalibreli kantarla yerinde tartım, ödeme teslim
              anında nakit.
            </p>

            {/* Vaatler */}
            <ul className="mt-6 flex flex-col gap-2.5">
              {site.sozler.map((s) => (
                <li key={s} className="flex items-center gap-3 text-karanlik-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yesil-500 text-white text-xs font-bold">
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            {/* CTA butonları */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telLink}
                data-cta="tel"
                className="inline-flex items-center justify-center gap-2.5 btn-kirmizi text-white rounded-2xl px-7 py-4 text-lg font-bold"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
              <a
                href={waLink("Merhaba, hurda satmak istiyorum.")}
                data-cta="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 btn-yesil text-white rounded-2xl px-7 py-4 text-lg font-bold"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
                WhatsApp&apos;tan sor
              </a>
            </div>

            {/* İstatistikler */}
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {ISTATISTIKLER.map(({ sayi, birim, aciklama }) => (
                <div key={birim}>
                  <dt className="text-2xl font-black text-white font-heading">
                    {sayi}
                    <span className="text-kirmizi-400 ml-0.5 text-xl">{birim === "TL" ? " TL" : ""}</span>
                    {birim !== "TL" && <span className="block text-xs font-medium text-yesil-400 mt-0.5 uppercase tracking-wider">{birim}</span>}
                  </dt>
                  <dd className="mt-0.5 text-xs text-karanlik-400">{aciklama}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Form tarafı */}
          <div id="teklif" className="scroll-mt-24 flex items-center">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section id="nasil" className="scroll-mt-20 py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-kirmizi-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Basit Süreç
            </span>
            <h2 className="text-3xl font-black text-karanlik-900 sm:text-4xl font-heading">
              Nasıl çalışır?
            </h2>
            <p className="mt-3 max-w-prose mx-auto text-karanlik-500">
              Üç adım, tek gün. İndirme bizden, sürprizli maliyet veya gizli kesinti yok.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-3">
            {ADIMLAR.map((a, i) => (
              <li
                key={a.baslik}
                className="relative rounded-3xl bg-white border-2 border-karanlik-100 p-8 hover:border-kirmizi-200 hover:shadow-xl hover:shadow-kirmizi-50 transition-all duration-300 group"
              >
                {/* Bağlantı oku */}
                {i < ADIMLAR.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-2xl text-karanlik-200">
                    →
                  </div>
                )}

                {/* Numara badge */}
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.renk} text-white shadow-lg mb-5`}
                >
                  <span className="text-2xl">{a.ikon}</span>
                </div>

                <div className="text-xs font-bold text-karanlik-300 tracking-widest uppercase mb-2">
                  ADIM {a.no}
                </div>
                <h3 className="text-xl font-bold text-karanlik-900 font-heading group-hover:text-kirmizi-600 transition-colors">
                  {a.baslik}
                </h3>
                <p className="mt-2 leading-relaxed text-karanlik-500">{a.metin}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── ÖNCELİKLİ BÖLGELER ── */}
      <section className="py-20 bg-karanlik-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <span className="inline-block text-yesil-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Hizmet Bölgeleri
            </span>
            <h2 className="text-3xl font-black text-karanlik-900 sm:text-4xl font-heading">
              En yoğun çalıştığımız bölgeler
            </h2>
            <p className="mt-3 max-w-prose text-karanlik-500">
              Her bölgenin hurdası farklıdır. Sizin bölgenizde neyin çıktığını ve
              nasıl çalıştığımızı ilçe sayfasında anlattık.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {one.map((i) => (
              <Link
                key={i.slug}
                href={`/${i.slug}`}
                className="group relative rounded-2xl bg-white border-2 border-transparent p-6 transition-all duration-300 hover:border-kirmizi-400 hover:shadow-xl hover:shadow-kirmizi-50 overflow-hidden"
              >
                {/* Hover arka plan efekti */}
                <div className="absolute inset-0 bg-gradient-to-br from-kirmizi-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Geri dönüşüm ikonu */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-yesil-100 text-yesil-600 text-lg font-bold group-hover:bg-kirmizi-100 group-hover:text-kirmizi-600 transition-colors">
                      ♻
                    </span>
                    <span className="text-sm font-semibold text-kirmizi-500 group-hover:translate-x-1 transition-transform">
                      {i.varis} →
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-karanlik-900 group-hover:text-kirmizi-700 font-heading transition-colors">
                    {i.ad} Hurdacı
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-karanlik-500">
                    {i.profil}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/bolgeler"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border-2 border-karanlik-200 px-5 py-3 font-semibold text-karanlik-700 hover:border-kirmizi-400 hover:text-kirmizi-600 transition-all duration-200"
          >
            39 ilçenin tamamını gör
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* ── SSS ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-kirmizi-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Merak Edilenler
            </span>
            <h2 className="text-3xl font-black text-karanlik-900 sm:text-4xl font-heading">
              Sık sorulan sorular
            </h2>
          </div>

          <div className="space-y-3">
            {GENEL_SSS.map((x, i) => (
              <details
                key={x.s}
                className="group rounded-2xl border-2 border-karanlik-100 bg-white overflow-hidden hover:border-kirmizi-200 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-karanlik-900 list-none">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-kirmizi-100 text-kirmizi-600 text-xs font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {x.s}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-karanlik-100 text-karanlik-600 text-xl font-light group-open:bg-kirmizi-100 group-open:text-kirmizi-600 group-open:rotate-45 transition-all duration-300"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <div className="h-px bg-karanlik-100 mb-4" />
                  <p className="leading-relaxed text-karanlik-600">{x.c}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÜM İLÇELER ── */}
      <section className="border-t-2 border-karanlik-100 py-16 bg-karanlik-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-karanlik-900 font-heading flex items-center gap-3 mb-6">
            <span className="h-1 w-6 rounded bg-kirmizi-500 inline-block" />
            İstanbul geneli hurda alımı
          </h2>
          <ul className="flex flex-wrap gap-2">
            {ilceler.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/${i.slug}`}
                  className="inline-block rounded-lg border border-karanlik-200 bg-white px-3 py-1.5 text-sm text-karanlik-600 transition-all duration-150 hover:border-kirmizi-400 hover:text-kirmizi-600 hover:shadow-sm"
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
