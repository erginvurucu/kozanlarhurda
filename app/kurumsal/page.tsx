import type { Metadata } from "next";
import Link from "next/link";
import { site, telLink, mailLink } from "@/lib/site";
import { sehreGore } from "@/data/ilceler";
import { LeadForm } from "@/components/LeadForm";
import { StickyCallBar, PhoneIcon, OnayIkon } from "@/components/Cta";
import { faqSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kurumsal Hurda Alımı — Fabrika, OSB ve Tesis Hurdası",
  description:
    "Sanayi tesisleri için tonajlı hurda alımı: irsaliyeli süreç, kantar fişi, periyodik anlaşma ve söküm. İstanbul sanayi bölgeleri ile Tekirdağ ve Kırklareli OSB'lerinde yerinde alım.",
  alternates: { canonical: "/kurumsal" },
};

const SUREC = [
  {
    baslik: "Keşif",
    metin:
      "Sahaya gelir, malzemenin cinsini ve yaklaşık tonajını yerinde görürüz. Araç erişimi, yükleme ekipmanı ve söküm gerekip gerekmediği bu aşamada netleşir.",
  },
  {
    baslik: "Teklif",
    metin:
      "Kilo başına TL cinsinden, cins ayrımıyla teklif veririz. Hurda fiyatı dolara endeksli olduğu için teklifin geçerlilik süresini birlikte belirleriz.",
  },
  {
    baslik: "Yükleme ve tartım",
    metin:
      "Araç boş ve dolu tartılır; aradaki fark net ağırlıktır. Kantar fişinin bir nüshası size teslim edilir — fatura tutarının dayanağı budur.",
  },
  {
    baslik: "Evrak ve ödeme",
    metin:
      "Sevk irsaliyesi ve fatura zinciri eksiksiz yürütülür. Ödeme anlaşılan yönteme göre yapılır; kurumsal işlerde banka havalesi yaygındır.",
  },
];

const KAPSAM = [
  {
    baslik: "Üretim firesi",
    detay:
      "Pres ve giyotin artığı, torna talaşı, sac fire, profil artığı, ambalaj teli ve çemberi",
  },
  {
    baslik: "Makine ve tezgâh",
    detay:
      "Hurdaya ayrılmış tezgâh, konveyör, jeneratör, kompresör, forklift",
  },
  {
    baslik: "Paslanmaz ve proses",
    detay:
      "Tank, hat ekipmanı, boru tesisatı, ticari mutfak ve gıda hattı malzemesi",
  },
  {
    baslik: "Elektrik ve kablo",
    detay: "Pano, trafo, her kesit kablo, bakır bara ve sargı",
  },
  {
    baslik: "Konstrüksiyon",
    detay:
      "Çelik çatı, sandviç panel, raf sistemi, platform ve merdiven, silo",
  },
  {
    baslik: "Tesis tasfiyesi",
    detay:
      "Kapanan veya taşınan tesislerde komple saha boşaltma ve söküm",
  },
];

const SSS = [
  {
    s: "İrsaliye ve fatura düzenliyor musunuz?",
    c: "Evet. Kurumsal alımlarda sevk irsaliyesi ve fatura zinciri eksiksiz yürütülür, kantar fişinin bir nüshası size teslim edilir. Bu, hem sizin muhasebe kaydınızın hem de tutarın dayanağıdır. KDV ve tevkifat uygulaması mevzuata tabidir; işleminizin vergisel boyutu için mali müşavirinize danışmanızı öneririz.",
  },
  {
    s: "Periyodik anlaşma nasıl işliyor?",
    c: "Düzenli fire çıkaran tesislerde belirlenen sıklıkta veya belirli bir tonaja ulaşıldığında ekip yönlendirilir. Bu, sahanızın sürekli boş kalmasını sağlar ve her seferinde yeniden teklif toplamanızı önler. Fiyat, alım anındaki güncel piyasa üzerinden hesaplanır.",
  },
  {
    s: "Söküm işi de yapıyor musunuz?",
    c: "Evet. Çelik çatı, konstrüksiyon, tank, hat ve raf sistemi sökümü ekipman ve ekip gerektiren ayrı bir kalemdir. Keşifte kapsam, süre ve iş güvenliği sorumluluğu yazılı olarak netleştirilir; teklif hurdanın değeri ile söküm maliyeti birlikte değerlendirilerek verilir.",
  },
  {
    s: "OSB giriş prosedürü için ne gerekiyor?",
    c: "Araç plakası, sürücü ve personel bilgilerini bize iletmeniz yeterli; giriş kaydını tesisinizle birlikte önceden yaptırıyoruz. İş güvenliği donanımı (baret, yelek, çelik burunlu ayakkabı) ekipte standart olarak bulunur.",
  },
  {
    s: "Tartıma güvenmek zorunda mıyım?",
    c: "Hayır, güvenmek zorunda değilsiniz — görmeniz için çalışıyoruz. Tartım sizin belirlediğiniz veya onayladığınız kantarda yapılır, tesis yetkiliniz sahada bulunur ve kantar fişi size teslim edilir. Anlaşmazlık halinde elinizde belge olur.",
  },
  {
    s: "Minimum tonaj şartınız var mı?",
    c: "Katı bir alt sınır koymuyoruz. Tonaj düşükse iş, güzergâh üzerindeki diğer alımlarla birlikte planlanır; bu durumda randevu birkaç gün ileriye verilebilir.",
  },
];

export default function KurumsalSayfasi() {
  const tekirdag = sehreGore("Tekirdağ");
  const kirklareli = sehreGore("Kırklareli");

  return (
    <>
      {/* HERO */}
      <section className="zemin-kareli-koyu text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-18">
          <div>
            <p className="etiket etiket-acik">Kurumsal hurda alımı</p>

            <h1 className="mt-5 text-[36px] leading-[1.1] text-white sm:text-[46px]">
              Tesisinizin hurdası,
              <br className="hidden sm:block" />{" "}
              <span className="text-fistik-400">söküm dahil alıyoruz</span>
            </h1>

            <p className="mt-6 max-w-prose text-lg leading-relaxed text-kurum-300">
              Fabrika, atölye ve OSB tesisleri için tonajlı alım. Şeffaf
              tartım, sevk irsaliyesi ve kantar fişi standarttır; düzenli
              fire çıkaran tesislerle periyodik anlaşma yapıyoruz.
            </p>

            <ul className="mt-8 flex flex-col">
              {[
                "İrsaliye ve fatura zinciri eksiksiz",
                "Kantar fişi size teslim edilir",
                "Söküm, kesim ve yükleme bize ait",
                "Periyodik anlaşma ile düzenli alım",
              ].map((s) => (
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
                data-bolge="kurumsal"
                className="dugme dugme-fistik px-7 py-4 text-lg"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                <span className="rakam">{site.phoneDisplay}</span>
              </a>
              <a
                href={mailLink}
                className="dugme dugme-cerceve-acik px-7 py-4 text-lg"
              >
                E-posta ile teklif iste
              </a>
            </div>
          </div>

          <div id="teklif" className="scroll-mt-24">
            <LeadForm kurumsal />
          </div>
        </div>
      </section>

      <div className="serit" />

      {/* KAPSAM */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="kural max-w-2xl">
            <p className="etiket">Kapsam</p>
            <h2 className="mt-2 text-[32px] leading-tight sm:text-[38px]">
              Sanayide neyi alıyoruz
            </h2>
            <p className="mt-3 text-lg text-kurum-600">
              Tek kalemlik fireden komple tesis tasfiyesine kadar.
            </p>
          </div>

          <ul className="mt-12 grid gap-px border border-kurum-200 bg-kurum-200 sm:grid-cols-2 lg:grid-cols-3">
            {KAPSAM.map((k) => (
              <li key={k.baslik} className="bg-white p-6">
                <h3 className="text-lg">{k.baslik}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kurum-600">
                  {k.detay}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="zemin-kareli border-y border-kurum-200 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="kural max-w-2xl">
            <p className="etiket">Süreç</p>
            <h2 className="mt-2 text-[32px] leading-tight sm:text-[38px]">
              Keşiften ödemeye
            </h2>
            <p className="mt-3 text-lg text-kurum-600">
              Satın alma biriminizin görmek isteyeceği düzen.
            </p>
          </div>

          <ol className="mt-12 grid gap-px border border-kurum-200 bg-kurum-200 md:grid-cols-2 lg:grid-cols-4">
            {SUREC.map((a, i) => (
              <li key={a.baslik} className="bg-white p-6">
                <span className="rakam text-[32px] font-semibold leading-none text-kurum-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg">{a.baslik}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kurum-600">
                  {a.metin}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BÖLGELER */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="kural max-w-2xl">
            <p className="etiket">Saha</p>
            <h2 className="mt-2 text-[32px] leading-tight sm:text-[38px]">
              Trakya sanayi hattı
            </h2>
            <p className="mt-3 text-lg text-kurum-600">
              İstanbul sanayi bölgelerinin yanı sıra Tekirdağ ve Kırklareli
              organize sanayi bölgeleri düzenli güzergâhımız üzerindedir.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              { ad: "Tekirdağ", liste: tekirdag },
              { ad: "Kırklareli", liste: kirklareli },
            ].map((g) => (
              <div key={g.ad}>
                <p className="etiket etiket-fistik">{g.ad}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.liste.map((i) => (
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
            ))}
          </div>

          <Link
            href="/bolgeler"
            className="dugme dugme-cerceve mt-9 px-5 py-3 text-[15px]"
          >
            Tüm bölgeleri gör
          </Link>
        </div>
      </section>

      {/* SSS */}
      <section className="zemin-kareli border-t border-kurum-200 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="kural">
            <p className="etiket">Satın alma birimlerinin sorduğu</p>
            <h2 className="mt-2 text-[32px] leading-tight sm:text-[38px]">
              Sık sorulan sorular
            </h2>
          </div>

          <div className="mt-10 border-t border-kurum-200">
            {SSS.map((x) => (
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

          <div className="evrak-vurgu mt-10 p-6">
            <p className="etiket">Devamı</p>
            <p className="mt-2 leading-relaxed text-kurum-700">
              Süreci daha ayrıntılı anlattığımız yazılar:{" "}
              <Link
                href="/rehber/fabrika-hurdasi-nasil-satilir"
                className="font-semibold text-lacivert-700 underline underline-offset-2"
              >
                fabrika hurdası nasıl satılır
              </Link>{" "}
              ve{" "}
              <Link
                href="/rehber/irsaliyeli-hurda-alimi"
                className="font-semibold text-lacivert-700 underline underline-offset-2"
              >
                irsaliyeli hurda alımı
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <StickyCallBar bolge="kurumsal" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(SSS))}
      />
    </>
  );
}
