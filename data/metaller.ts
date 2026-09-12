import type { SSS } from "./types";

/**
 * METAL BAZLI FIYAT SAYFALARI
 *
 * Neden ayri sayfa: "bakir hurda fiyati", "kablo hurda fiyati",
 * "paslanmaz hurda fiyati" ayri ayri aranan terimlerdir. Hepsini tek
 * sayfada toplamak, her birinde zayif kalmak demek.
 *
 * `grup` alani data/fiyatlar.ts icindeki grup basligiyla BIREBIR
 * eslesmelidir; fiyat tablosu oradan cekilir.
 */

export type MetalSayfa = {
  slug: string;
  /** data/fiyatlar.ts icindeki grup basligi. */
  grup: string;
  /** Sayfa basligi - arama terimiyle ayni olmali. */
  baslik: string;
  h1: string;
  ozet: string;
  girizgah: string;
  /** Fiyati ne belirliyor - bu metale ozgu. */
  fiyatiEtkileyen: { baslik: string; metin: string }[];
  /** Satis oncesi hazirlik onerileri. */
  hazirlik: string[];
  sss: SSS[];
};

export const metalSayfalari: MetalSayfa[] = [
  {
    slug: "bakir",
    grup: "Bakır",
    baslik: "Hurda Bakır Fiyatları",
    h1: "Hurda bakır fiyatları",
    ozet:
      "Soyma, lama, boru ve kırkambar bakır güncel alım fiyatları. Bakır hurdasının cinsi ve temizliği fiyatı nasıl değiştirir?",
    girizgah:
      "Bakır, hurdanın en değerli kalemidir. Aynı ağırlıktaki iki parti arasında iki katına varan fark olabilir — belirleyen şey cins ve temizliktir.",
    fiyatiEtkileyen: [
      {
        baslik: "Cins",
        metin:
          "Soyma ve lama bakır en üst fiyattan değerlendirilir. Kırkambar, yani karışık ve kirli bakır, belirgin biçimde altında kalır. Boru bakırı arada bir yerdedir.",
      },
      {
        baslik: "Temizlik",
        metin:
          "Üzerinde lehim, izolasyon, boya, vida veya demir aksam bulunan bakır düşük sınıfa iner. Bunları ayıklamak çoğu zaman harcadığınız zamandan fazlasını geri verir.",
      },
      {
        baslik: "Yanık olup olmaması",
        metin:
          "Yakılarak izolasyonundan ayrılmış bakır, yüzeyi oksitlendiği için temiz bakırın altında fiyatlanır. Ayrıca kablo yakmak çevreye zararlıdır ve yasaktır; soyma yöntemi hem yasal hem daha kârlıdır.",
      },
      {
        baslik: "Talaş ve toz",
        metin:
          "Torna talaşı bakır olsa da yoğunluğu düşük, kirlilik ihtimali yüksek olduğu için ayrı bir kalemdir. Yağlı talaş ayrıca değer kaybeder.",
      },
    ],
    hazirlik: [
      "Bakırı demir ve alüminyumdan ayırın; karışık yığında hepsi en ucuzunun fiyatına gider",
      "Lehimli ve vidalı parçaları mümkünse temizleyin",
      "Kabloyu yakmayın; soyma bakır hem yasal hem daha değerli",
      "Talaşı ayrı biriktirin, yağını mümkün olduğunca süzdürün",
    ],
    sss: [
      {
        s: "Soyma bakır ile lama bakır arasında fark var mı?",
        c: "İkisi de üst sınıftır ve fiyatları birbirine yakındır. Soyma bakır kablodan çıkarılmış iletkendir; lama bakır ise levha veya bara formundadır. Temizlik durumu ikisinde de belirleyicidir.",
      },
      {
        s: "Kırkambar bakır neden daha ucuz?",
        c: "Kırkambar, karışık ve üzerinde yabancı madde bulunan bakırdır. Alıcı bunu işleyip ayrıştırmak zorunda olduğu için fiyat buna göre belirlenir.",
      },
      {
        s: "Bakır fiyatı neden her gün değişiyor?",
        c: "Bakır dünya metal piyasasında işlem gören bir emtiadır ve fiyatı dolara endekslidir. Bu yüzden hem borsa hareketi hem kur değişimi günlük fiyatı etkiler.",
      },
    ],
  },
  {
    slug: "kablo",
    grup: "Kablo",
    baslik: "Hurda Kablo Fiyatları",
    h1: "Hurda kablo fiyatları",
    ozet:
      "PTT kablo, şantiye kablosu ve karışık kablo alım fiyatları. Kablo hurdasında fiyat bakır oranına göre nasıl belirlenir?",
    girizgah:
      "Kablo hurdasında ödediğimiz şey plastik değil, içindeki bakırdır. Bu yüzden fiyatı belirleyen tek şey kablonun bakır oranıdır.",
    fiyatiEtkileyen: [
      {
        baslik: "Kesit kalınlığı",
        metin:
          "Kalın kesitli kabloda iletken oranı yüksek, izolasyon oranı düşüktür; bu yüzden kilo başına daha yüksek fiyat alır. İnce telefon ve data kablosunda ise plastik ağırlığı baskındır.",
      },
      {
        baslik: "İletken cinsi",
        metin:
          "Bakır iletkenli kablo ile alüminyum iletkenli kablo aynı fiyattan alınmaz. Enerji nakil hatlarında sıkça kullanılan alüminyum iletken ayrı değerlendirilir.",
      },
      {
        baslik: "Zırh ve dolgu",
        metin:
          "Çelik zırhlı, kurşun kılıflı veya yoğun dolgu malzemesi içeren kablolarda net bakır oranı düşer; fiyat buna göre hesaplanır.",
      },
    ],
    hazirlik: [
      "Kabloyu kesit kalınlığına göre ayırın; kalın ve ince karışınca hepsi ortalamadan fiyatlanır",
      "Bakır ve alüminyum iletkenli kabloları ayrı tutun",
      "Kabloyu asla yakmayın — yasaktır, çevreye zararlıdır ve yanık bakır daha ucuza gider",
      "Soymaya vaktiniz varsa soyma bakır olarak satmak genellikle daha kârlıdır",
    ],
    sss: [
      {
        s: "Kabloyu soyup satmak mı daha kârlı?",
        c: "Genellikle evet, çünkü soyma bakır en üst sınıftan değerlendirilir. Ancak bu emek ve zaman ister. Tonaj yüksekse soyma işini biz üstleniyoruz; fiyat buna göre hesaplanır.",
      },
      {
        s: "Kablo hurdası kilo mu, metre mi hesaplanır?",
        c: "Kilo üzerinden. Metre bilgisi yalnızca yaklaşık tonaj tahmini için işe yarar; ödeme her zaman tartım sonucuna göre yapılır.",
      },
    ],
  },
  {
    slug: "sari-pirinc",
    grup: "Sarı (pirinç)",
    baslik: "Hurda Sarı ve Pirinç Fiyatları",
    h1: "Hurda sarı ve pirinç fiyatları",
    ozet:
      "Araiş sarı MS70 ve MS64, musluk sarısı, sarı talaş ve çubuk alım fiyatları. Alaşım oranı fiyatı nasıl etkiler?",
    girizgah:
      "Sarı, bakır ve çinko alaşımıdır. Fiyatını belirleyen şey içindeki bakır oranıdır; bu yüzden alaşım kodu doğrudan paraya çevrilir.",
    fiyatiEtkileyen: [
      {
        baslik: "Alaşım oranı",
        metin:
          "MS70, adından anlaşılacağı üzere yaklaşık %70 bakır içerir ve MS64'ten daha yüksek fiyattan değerlendirilir. Bakır oranı arttıkça fiyat yükselir.",
      },
      {
        baslik: "Yabancı madde",
        metin:
          "Musluk ve tesisat armatürlerinde krom kaplama, conta, plastik ve çelik vida bulunur. Bunlar net sarı ağırlığını düşürdüğü için fiyat buna göre belirlenir.",
      },
      {
        baslik: "Talaş formu",
        metin:
          "Sarı talaş, işleme sırasında yağ ve diğer metallerle karışabildiği için külçe ve parça sarının altında fiyatlanır.",
      },
    ],
    hazirlik: [
      "Sarıyı bakırdan ayırın; renkleri yakın olduğu için karışması sık görülür",
      "Musluk ve armatürlerde plastik ve conta parçalarını sökün",
      "Mümkünse alaşım kodunu belirtin; belirtemiyorsanız keşifte biz ayırırız",
      "Talaşı ayrı biriktirin",
    ],
    sss: [
      {
        s: "Sarı ile pirinç aynı şey mi?",
        c: "Evet, piyasada aynı malzeme için kullanılır. Pirinç bakır-çinko alaşımıdır; hurda piyasasında yaygın olarak 'sarı' denir.",
      },
      {
        s: "Musluk sarısı neden daha düşük fiyatlı?",
        c: "Musluk ve armatürlerde krom kaplama, conta ve çelik aksam bulunur. Net sarı oranı düştüğü için fiyat da buna göre hesaplanır.",
      },
    ],
  },
  {
    slug: "aluminyum",
    grup: "Alüminyum",
    baslik: "Hurda Alüminyum Fiyatları",
    h1: "Hurda alüminyum fiyatları",
    ozet:
      "Alüminyum profil, tel, ofset, jant ve döküm alım fiyatları. Alüminyum hurdasında cins farkı fiyatı nasıl değiştirir?",
    girizgah:
      "Alüminyum, cinsleri arasında en çok fiyat farkı olan gruplardan biridir. Temiz profil ile yağlı talaş arasında kat kat fark vardır.",
    fiyatiEtkileyen: [
      {
        baslik: "Cins ve saflık",
        metin:
          "Temiz profil ve tel en üst sınıftır. Döküm alüminyum, içindeki silisyum ve diğer alaşım elementleri nedeniyle daha düşük fiyatlanır.",
      },
      {
        baslik: "Kaplama ve aksam",
        metin:
          "Doğrama profillerinde bulunan plastik fitil, cam, conta ve çelik vida net alüminyum ağırlığını düşürür. Sökülmesi fiyatı yükseltir.",
      },
      {
        baslik: "Radyatör ve motor parçaları",
        metin:
          "Alüminyum radyatörlerde bakır boru ve çelik bağlantı bulunabilir. Bu tür karma parçalar ayrı değerlendirilir.",
      },
      {
        baslik: "Talaş ve yağ",
        metin:
          "Alüminyum talaş yoğunluğu düşük, yağ tutma oranı yüksek olduğu için en alt sınıfta fiyatlanır.",
      },
    ],
    hazirlik: [
      "Profil doğramalardaki cam, fitil ve vidaları sökün",
      "Döküm ile profili ayrı tutun; farklı fiyatlandırılır",
      "Jantlarda lastik ve balans ağırlıklarını çıkarın",
      "Talaşın yağını mümkün olduğunca süzdürün",
    ],
    sss: [
      {
        s: "Alüminyum doğrama camlı hâlde alınır mı?",
        c: "Alınır ancak cam ve fitil net ağırlığı düşürdüğü için fiyat buna göre belirlenir. Sökebilirseniz belirgin fark yaratır.",
      },
      {
        s: "Jant alüminyum mu, hurda demir mi sayılır?",
        c: "Alüminyum jant alüminyum sınıfındadır ve çelik jantın kat kat üzerinde fiyatlanır. Çelik jant demir hurdası olarak değerlendirilir.",
      },
    ],
  },
  {
    slug: "demir-celik",
    grup: "Demir ve çelik",
    baslik: "Hurda Demir Fiyatları",
    h1: "Hurda demir ve çelik fiyatları",
    ozet:
      "DKP, ekstra, toplama ve teneke hurda ile demir talaşı alım fiyatları. Tonajlı işlerde kilo fiyatı nasıl belirlenir?",
    girizgah:
      "Demir, kilo fiyatı en düşük ama tonajı en yüksek kalemdir. Sanayi işlerinin ana gövdesini bu grup oluşturur.",
    fiyatiEtkileyen: [
      {
        baslik: "Sınıf",
        metin:
          "DKP ve ekstra hurda — kalın sac, profil, konstrüksiyon — üst sınıftır. Toplama hurda karışık ve ince malzemedir, altında kalır. Teneke ve talaş en alt sınıftadır.",
      },
      {
        baslik: "Kalınlık",
        metin:
          "Kalın kesitli malzeme, ergitmede daha verimli olduğu için daha yüksek fiyat alır. İnce sac ve teneke düşük fiyatlanır.",
      },
      {
        baslik: "Tonaj",
        metin:
          "Demirde miktar fiyatı doğrudan etkiler. Tonajlı partilerde kilo fiyatı perakende alımdan belirgin şekilde yukarı çekilir.",
      },
      {
        baslik: "Yabancı madde",
        metin:
          "Beton, ahşap, plastik ve toprak karışmış malzeme net ağırlığı düşürür ve sınıfı aşağı çeker.",
      },
    ],
    hazirlik: [
      "Kalın ve ince malzemeyi ayrı yığın yapın",
      "Beton, ahşap ve toprak karışmasını önleyin",
      "Paslanmaz ve krom parçaları demirden ayırın — kat kat değerlidir",
      "Tonaj yüksekse önceden haber verin, uygun araç planlayalım",
    ],
    sss: [
      {
        s: "Tonajlı demirde fiyat neden daha yüksek?",
        c: "Yükleme, nakliye ve işleme maliyeti tonaj arttıkça birim başına düşer. Bu avantaj kilo fiyatına yansıtılır.",
      },
      {
        s: "Paslanmaz da demir hurdası mı sayılır?",
        c: "Hayır. Paslanmaz ve krom ayrı bir gruptur ve demirin kat kat üzerinde fiyatlanır. Karışık yığında gönderilirse demir fiyatına gider — mutlaka ayırın.",
      },
    ],
  },
  {
    slug: "krom-paslanmaz",
    grup: "Krom ve paslanmaz",
    baslik: "Hurda Paslanmaz ve Krom Fiyatları",
    h1: "Hurda paslanmaz ve krom fiyatları",
    ozet:
      "Paslanmaz 304 ve 316 ile krom hurdası alım fiyatları. Kaliteler arasındaki fark ve mıknatısla ayırt etme yöntemi.",
    girizgah:
      "Paslanmaz, demirle karıştırıldığında en çok para kaybedilen gruptur. Görünüşü çeliğe benzer ama değeri kat kat yüksektir.",
    fiyatiEtkileyen: [
      {
        baslik: "Kalite sınıfı",
        metin:
          "316 kalite, içindeki molibden nedeniyle 304'ten daha yüksek fiyatlanır. 304 ise en yaygın kullanılan paslanmaz türüdür.",
      },
      {
        baslik: "Manyetik olup olmaması",
        metin:
          "304 ve 316 genellikle mıknatıs tutmaz. Mıknatıs tutan paslanmaz türleri (430 gibi) daha düşük sınıftadır. Basit bir mıknatıs testi kaba ayrımı yapmaya yeter.",
      },
      {
        baslik: "Yüzey ve aksam",
        metin:
          "Ticari mutfak ekipmanında çelik ayak, plastik kulp ve motor bulunur. Bunlar net paslanmaz ağırlığını düşürür.",
      },
    ],
    hazirlik: [
      "Mıknatısla kaba ayrım yapın; tutmuyorsa büyük olasılıkla 304 veya 316",
      "Paslanmazı asla demir yığınına atmayın",
      "Mutfak ekipmanında motor, plastik ve çelik ayakları sökün",
      "Kalite kodunu biliyorsanız belirtin; bilmiyorsanız keşifte biz ayırırız",
    ],
    sss: [
      {
        s: "Paslanmaz olduğunu nasıl anlarım?",
        c: "En pratik yöntem mıknatıs testidir. 304 ve 316 genellikle mıknatıs tutmaz, normal çelik tutar. Kesin ayrım için keşifte biz bakıyoruz.",
      },
      {
        s: "304 ile 316 arasındaki fiyat farkı büyük mü?",
        c: "Evet, kayda değer bir fark vardır. 316 içindeki molibden nedeniyle daha değerlidir ve ayrı fiyatlandırılır.",
      },
    ],
  },
  {
    slug: "beyaz-esya",
    grup: "Beyaz eşya ve ev hurdası",
    baslik: "Beyaz Eşya Hurda Fiyatları",
    h1: "Beyaz eşya hurda fiyatları",
    ozet:
      "Buzdolabı, çamaşır makinesi, fırın, kombi ve klima hurda alım fiyatları. Çalışan cihazda ikinci el değeri nasıl hesaplanır?",
    girizgah:
      "Beyaz eşyada iki ayrı fiyat vardır: cihaz çalışıyorsa ikinci el değeri, çalışmıyorsa içindeki metalin karşılığı.",
    fiyatiEtkileyen: [
      {
        baslik: "Çalışır durumda mı",
        metin:
          "Çalışan ve bakımlı bir cihaz hurda kilo fiyatından değil, ikinci el değerinden değerlendirilir. Bu genellikle belirgin şekilde daha yüksek bir rakam demektir.",
      },
      {
        baslik: "İçindeki metal",
        metin:
          "Çamaşır makinesinde motor ve karşı ağırlık, buzdolabında kompresör ve bakır boru, klimada bakır ve alüminyum eşanjör bulunur. Cihazın değeri büyük ölçüde bunlardan gelir.",
      },
      {
        baslik: "Eksik parça",
        metin:
          "Motoru veya kompresörü sökülmüş cihazlarda değer belirgin biçimde düşer, çünkü en değerli kısım çıkarılmış olur.",
      },
    ],
    hazirlik: [
      "Cihaz çalışıyorsa mutlaka belirtin — fiyat değişir",
      "Marka, model ve yaklaşık yaşını söylemeniz teklifi netleştirir",
      "Fotoğraf gönderin; görmeden verilen rakam hep aralık olarak kalır",
      "Kat ve asansör durumunu önceden bildirin, ekibi ona göre planlayalım",
    ],
    sss: [
      {
        s: "Çalışan buzdolabımı hurdaya vermeli miyim?",
        c: "Çalışır ve bakımlı durumdaysa ikinci el değeri üzerinden değerlendiriyoruz; bu hurda kilo fiyatının üzerindedir. Fotoğraf gönderdiğinizde hangisinin daha avantajlı olduğunu birlikte görürüz.",
      },
      {
        s: "Kombi beyaz eşya sayılır mı?",
        c: "Halk arasında öyle sanılır ama kombi ve panel radyatör metal ağırlıklıdır ve alınır. Karışıklığa en çok sebep olan kalemlerden biri budur.",
      },
      {
        s: "Eşyayı ben mi indirmeliyim?",
        c: "Hayır. İndirme, söküm ve taşıma hizmete dahildir; kat farkı gözetmiyoruz ve bunun için ayrıca ücret talep etmiyoruz.",
      },
    ],
  },
];

export const metalBul = (slug: string) =>
  metalSayfalari.find((m) => m.slug === slug);
