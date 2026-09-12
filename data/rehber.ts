/**
 * REHBER YAZILARI
 *
 * Icerik stratejisi:
 * - Agirlik B2B/sanayi tarafinda; isletmenin hedefi Trakya OSB'leri
 *   (Cerkezkoy, Corlu, Ergene, Luleburgaz, Kirklareli) ve Istanbul sanayi.
 * - Her yazi GERCEK bir soruya cevap verir. Anahtar kelime doldurulmus
 *   dolgu metin yok; boyle icerik siralanmaz ve guveni de bitirir.
 * - Mevsimsellik: Google Trends'te "hurda" araligi Aralik-Ocak'ta zirve
 *   (endeks 100), yazin dip (32). Yil sonu tasfiyesi yazisi bu yuzden var.
 */

export type Blok =
  | { tip: "p"; metin: string }
  | { tip: "liste"; maddeler: string[] }
  | { tip: "sirali"; maddeler: string[] }
  | { tip: "not"; baslik: string; metin: string };

export type Bolum = { baslik: string; bloklar: Blok[] };

export type Yazi = {
  slug: string;
  baslik: string;
  /** Arama sonucunda gorunen aciklama. */
  ozet: string;
  kategori: "Sanayi" | "Rehber" | "Fiyat";
  tarih: string; // ISO
  /** Yazinin ana fikri - liste sayfasinda gorunur. */
  girizgah: string;
  bolumler: Bolum[];
  sss?: { s: string; c: string }[];
};

export const yazilar: Yazi[] = [
  // ─────────────────────────────────────────────────────────
  {
    slug: "fabrika-hurdasi-nasil-satilir",
    baslik: "Fabrika hurdası nasıl satılır? Sanayi tesisleri için adım adım rehber",
    ozet:
      "Üretim tesisinde biriken hurdayı satmanın doğru sırası: ayrıştırma, tartım, evrak ve ödeme. Satın alma ve idari işler birimleri için pratik rehber.",
    kategori: "Sanayi",
    tarih: "2026-09-12",
    girizgah:
      "Fabrika hurdası, ev hurdasından tamamen farklı bir süreçtir. Tutar büyüktür, evrak zorunludur ve iş güvenliği devreye girer.",
    bolumler: [
      {
        baslik: "Önce hurdanızın ne olduğunu bilin",
        bloklar: [
          {
            tip: "p",
            metin:
              "Sanayi hurdasında fiyatı belirleyen tek şey ağırlık değildir. Aynı tonajdaki iki parti arasında ciddi fark olabilir, çünkü belirleyici olan cins ve temizliktir. Üretimden çıkan talaş ile sökümden çıkan kalın sac aynı kalemde değerlendirilmez.",
          },
          {
            tip: "p",
            metin:
              "Tesisinizde tipik olarak şu gruplar birikir: pres ve giyotin fireleri, tornadan çıkan talaş, ambalaj teli ve çemberi, hurdaya ayrılmış makine ve tezgâh, elektrik panosu ve kablo, raf sistemi, çelik çatı ve sandviç panel. Bunları karışık bir yığın hâlinde satmak, en değerli kalemin fiyatını en ucuzuna çekmek demektir.",
          },
          {
            tip: "not",
            baslik: "Ayrıştırma doğrudan paradır",
            metin:
              "Bakır ve pirinç, demirin onlarca katı değerindedir. Karışık yığında bunlar demir fiyatına gider. Üretim sahasında ayrı bidon veya kafes kullanmak, hiçbir maliyeti olmayan ama getirisi yüksek bir alışkanlıktır.",
          },
        ],
      },
      {
        baslik: "Keşif ve teklif aşaması",
        bloklar: [
          {
            tip: "p",
            metin:
              "Ciddi bir alıcı, tonajlı işte fotoğrafla yetinmez; sahaya gelip görmek ister. Keşifte bakılan şeyler: malzemenin cinsi ve yaklaşık miktarı, sahanın araç erişimi, yükleme için vinç veya forklift gerekip gerekmediği, sökülmesi gereken bir yapı olup olmadığı.",
          },
          {
            tip: "p",
            metin:
              "Teklif bu keşiften sonra verilir ve genellikle kilo başına TL cinsindendir. Hurda fiyatları dolara endeksli olduğu için verilen teklifin bir geçerlilik süresi olur; bir hafta önceki rakam bugün geçerli olmayabilir.",
          },
        ],
      },
      {
        baslik: "Tartım ve teslim",
        bloklar: [
          {
            tip: "p",
            metin:
              "Tonajlı alımda standart yöntem dolu-boş tartımdır: araç yüklenmeden önce ve yüklendikten sonra kantara girer, aradaki fark net hurda ağırlığıdır. Kantar fişi mutlaka size de verilmelidir; bu hem muhasebe kaydınızın hem de anlaşmazlık halinde elinizdeki tek belgenin dayanağıdır.",
          },
          {
            tip: "liste",
            maddeler: [
              "Tartımın hangi kantarda yapılacağını önceden konuşun",
              "Kantar fişinin bir nüshasını isteyin",
              "Yükleme sırasında tesis yetkilinizin sahada bulunmasını sağlayın",
              "Sökme işi varsa iş güvenliği sorumluluğunun kimde olduğunu yazılı netleştirin",
            ],
          },
        ],
      },
      {
        baslik: "Evrak ve ödeme",
        bloklar: [
          {
            tip: "p",
            metin:
              "Şirketler hurdayı belgesiz satamaz. Satış bir mal hareketi olduğu için sevk irsaliyesi düzenlenir ve muhasebeleştirilir. Bu, alıcının da kurumsal olmasını gerektirir; faturasız çalışan bir alıcıyla ilerlemek muhasebe tarafında sorun çıkarır.",
          },
          {
            tip: "p",
            metin:
              "Hurda satışında KDV uygulaması ve tevkifat oranları mevzuata bağlıdır ve dönem dönem değişebilir. Tutar büyükse işlemi başlatmadan önce mali müşavirinizle teyit etmeniz en doğrusudur — bu, alıcının değil sizin muhasebenizin sorumluluğundadır.",
          },
          {
            tip: "not",
            baslik: "Kurumsal alımda ödeme",
            metin:
              "Perakende alımda ödeme nakit yapılır. Kurumsal ve tonajlı işlerde ise banka havalesi tercih edilir; evrak akışıyla ödeme akışı birbirini takip eder.",
          },
        ],
      },
    ],
    sss: [
      {
        s: "Tesisimizde düzenli hurda çıkıyor, periyodik anlaşma yapılabilir mi?",
        c: "Evet. Düzenli fire çıkaran tesislerde aylık veya belirlenen tonaja ulaşıldığında alım yapılacak şekilde periyodik anlaşma yaygındır. Bu hem sahanızın sürekli boş kalmasını sağlar hem de her seferinde yeniden pazarlık yapmanızı önler.",
      },
      {
        s: "Sökme işini de siz yapıyor musunuz?",
        c: "Çelik çatı, raf sistemi, tank ve makine söküm işleri ayrı bir kalemdir ve ekipman gerektirir. Keşifte söküm kapsamı netleştirilir; teklif hurdanın değeri ile söküm maliyeti birlikte değerlendirilerek verilir.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  {
    slug: "irsaliyeli-hurda-alimi",
    baslik: "İrsaliyeli hurda alımı: şirketler hurdayı nasıl satar?",
    ozet:
      "Kurumsal hurda satışında evrak akışı nasıl işler? Sevk irsaliyesi, kantar fişi ve fatura zinciri; satın alma birimlerinin en çok sorduğu konu.",
    kategori: "Sanayi",
    tarih: "2026-09-12",
    girizgah:
      "Bir satın alma müdürünün hurdacıya sorduğu ilk soru fiyat değildir. İlk soru şudur: irsaliye kesiyor musunuz?",
    bolumler: [
      {
        baslik: "Neden evrak bu kadar önemli",
        bloklar: [
          {
            tip: "p",
            metin:
              "Bir şirketin deposunda duran hurda, muhasebe kayıtlarında bir varlıktır. Sahadan çıktığı anda bu hareketin belgelenmesi gerekir. Belgesiz çıkan mal, envanterde açık bırakır ve denetimde sorun yaratır.",
          },
          {
            tip: "p",
            metin:
              "Bu yüzden kurumsal bir tesis, ne kadar iyi fiyat verirse versin, evrak düzenleyemeyen bir alıcıyla çalışamaz. Fiyat pazarlığı ancak bu şart sağlandıktan sonra başlar.",
          },
        ],
      },
      {
        baslik: "Tipik evrak akışı",
        bloklar: [
          {
            tip: "sirali",
            maddeler: [
              "Keşif yapılır, cins ve yaklaşık tonaj belirlenir, kilo fiyatı üzerinden teklif verilir",
              "Anlaşma sağlanınca yükleme günü planlanır",
              "Araç boş tartılır, yüklenir, dolu tartılır; kantar fişi düzenlenir",
              "Satıcı firma sevk irsaliyesi düzenler; mal hareketi belgelenmiş olur",
              "Tartım ve cins teyit edildikten sonra fatura kesilir",
              "Ödeme, anlaşılan yönteme göre yapılır",
            ],
          },
          {
            tip: "not",
            baslik: "Kantar fişi neden ayrı bir belge",
            metin:
              "Kantar fişi, faturadaki tutarın nasıl hesaplandığının kanıtıdır. Fatura tutarı ile kantar fişindeki tonaj birbirini tutmalıdır. Fiş elinizde yoksa, sonradan itiraz etmek için dayanağınız kalmaz.",
          },
        ],
      },
      {
        baslik: "Dikkat edilmesi gereken noktalar",
        bloklar: [
          {
            tip: "liste",
            maddeler: [
              "Tartımın hangi kantarda, kimin gözetiminde yapılacağını önceden yazılı netleştirin",
              "Cins ayrımı yapılacaksa (bakır, alüminyum, demir ayrı) bunun tartımda nasıl ayrıştırılacağını konuşun",
              "Teklifin geçerlilik süresini sorun; hurda fiyatı dolara endekslidir ve günlük değişir",
              "Söküm varsa iş güvenliği ve sigorta sorumluluğunu sözleşmede belirtin",
            ],
          },
          {
            tip: "p",
            metin:
              "KDV, tevkifat ve istisna uygulamaları mevzuata tabidir ve zaman içinde değişir. Bu rehber genel işleyişi anlatır; kendi işleminizin vergisel boyutu için mali müşavirinize danışın.",
          },
        ],
      },
    ],
    sss: [
      {
        s: "Şahıs olarak hurda satıyorum, irsaliye gerekir mi?",
        c: "Şahıs satışlarında süreç farklı işler; irsaliye yükümlülüğü ticari faaliyet yürüten taraflar içindir. Bireysel satışlarda ödeme yerinde nakit yapılır ve evrak zinciri devreye girmez.",
      },
      {
        s: "Tonajlı işte ödeme ne zaman yapılıyor?",
        c: "Tartım tamamlanıp cins teyit edildikten sonra yapılır. Perakende alımda ödeme teslim anında nakittir; kurumsal işlerde evrak akışıyla birlikte havale yaygındır.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  {
    slug: "osb-hurda-tasfiyesi-trakya",
    baslik: "OSB'lerde hurda tasfiyesi: Çerkezköy, Çorlu, Ergene ve Lüleburgaz",
    ozet:
      "Trakya organize sanayi bölgelerinde hurda alımı nasıl yürür? Saha erişimi, tonaj, evrak ve periyodik alım düzeni üzerine pratik bilgiler.",
    kategori: "Sanayi",
    tarih: "2026-09-12",
    girizgah:
      "Trakya, Türkiye'nin en yoğun sanayi koridorlarından biri. Tekstil, plastik, gıda, otomotiv yan sanayi ve metal işleme tesisleri burada yoğunlaşmış durumda.",
    bolumler: [
      {
        baslik: "Bölgede ne tür hurda çıkıyor",
        bloklar: [
          {
            tip: "p",
            metin:
              "Trakya sanayisinin profili, çıkan hurdanın cinsini de belirliyor. Tekstil tesislerinde makine yenilemesinden çıkan tezgâh ve konstrüksiyon; plastik ve ambalaj tesislerinde kalıp, pres firesi ve çember; gıda tesislerinde paslanmaz tank, hat ve ticari mutfak ekipmanı; metal işleme atölyelerinde ise talaş, sac fire ve profil artığı ağırlıkta.",
          },
          {
            tip: "p",
            metin:
              "Bunlara ek olarak her tesiste ortak kalemler var: elektrik panosu ve kablo, raf sistemi, çelik çatı ve sandviç panel, hurdaya ayrılmış forklift ve jeneratör.",
          },
        ],
      },
      {
        baslik: "OSB'de çalışmanın kendine özgü tarafları",
        bloklar: [
          {
            tip: "liste",
            maddeler: [
              "Giriş izni: OSB'ler kapalı alanlardır; araç ve personel için önceden giriş kaydı gerekir",
              "Çalışma saatleri: yükleme genellikle mesai saatleri içinde, üretimi aksatmayacak şekilde planlanır",
              "İş güvenliği: tesis içinde baret, yelek ve ayakkabı zorunluluğu standarttır; söküm varsa ek prosedür devreye girer",
              "Tartım: OSB içinde veya yakınında kantar bulunur; dolu-boş tartım yaygın uygulamadır",
              "Evrak: kurumsal tesis olduğu için irsaliye ve fatura zinciri şarttır",
            ],
          },
        ],
      },
      {
        baslik: "Periyodik alım neden mantıklı",
        bloklar: [
          {
            tip: "p",
            metin:
              "Düzenli üretim yapan bir tesiste hurda da düzenli birikir. Her seferinde yeniden alıcı aramak, teklif toplamak ve saha izni çıkarmak hem zaman kaybıdır hem de sahada yer işgal eder.",
          },
          {
            tip: "p",
            metin:
              "Periyodik anlaşmada belirlenen sıklıkta veya belirli bir tonaja ulaşıldığında alım yapılır. Tesis için avantajı öngörülebilirlik ve sahanın sürekli boş kalması; alıcı için avantajı ise düzenli tedarik.",
          },
          {
            tip: "not",
            baslik: "Yıl sonu yoğunluğu",
            metin:
              "Aralık ve ocak, hurda tasfiyesinin en yoğun olduğu dönemdir. Tesisler envanter ve yıl sonu kapanışı öncesi sahayı boşaltmak ister. Bu dönemde alıcıların programı dolar; planınızı erken yapmanız beklemenizi önler.",
          },
        ],
      },
    ],
    sss: [
      {
        s: "Hangi bölgelere hizmet veriyorsunuz?",
        c: "İstanbul'un tamamına, ayrıca Tekirdağ ve Kırklareli organize sanayi bölgelerine hizmet veriyoruz. Çerkezköy, Kapaklı, Çorlu, Ergene, Velimeşe, Lüleburgaz ve Babaeski hattı düzenli çalıştığımız güzergâh üzerindedir.",
      },
      {
        s: "Küçük tonajlı işler için de geliyor musunuz?",
        c: "Geliyoruz. Tonaj düşükse güzergâh üzerindeki diğer alımlarla birlikte planlanır; bu yüzden randevu birkaç gün ileriye verilebilir.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  {
    slug: "yil-sonu-hurda-tasfiyesi",
    baslik: "Yıl sonu hurda tasfiyesi: aralık ayında neden herkes hurda satar?",
    ozet:
      "Aralık ve ocak, hurda piyasasının en hareketli dönemi. Sebepleri, bu dönemde fiyatların nasıl davrandığı ve erken planlamanın neden işe yaradığı.",
    kategori: "Rehber",
    tarih: "2026-09-12",
    girizgah:
      "Hurda aramaları aralık ayında yılın en yüksek seviyesine çıkıyor, yaz aylarında ise yarıya iniyor. Bu tesadüf değil.",
    bolumler: [
      {
        baslik: "Yıl sonunda ne oluyor",
        bloklar: [
          {
            tip: "p",
            metin:
              "Aralık, şirketler için kapanış ayıdır. Envanter sayımı yapılır, kayıtlar kapatılır, depo ve saha düzenlenir. Yıl boyunca köşede biriken fire, hurdaya ayrılmış makine ve kullanılmayan konstrüksiyon bu dönemde elden çıkarılır.",
          },
          {
            tip: "p",
            metin:
              "Aynı dönemde ev tarafında da hareket artar: yıl sonu temizliği, taşınmalar ve yenileme alışverişleri eski beyaz eşyanın çıkmasına yol açar. İki akım üst üste binince piyasa yılın en yoğun haftalarını yaşar.",
          },
        ],
      },
      {
        baslik: "Bu dönem fiyatı nasıl etkiliyor",
        bloklar: [
          {
            tip: "p",
            metin:
              "Arz artınca alıcıların programı dolar. Bu, fiyatın mutlaka düşeceği anlamına gelmez — hurda fiyatını asıl belirleyen metal piyasası ve kurdur. Ama pratikte şu olur: randevular uzar, tonajlı işlere öncelik verilir, küçük partiler beklemek zorunda kalır.",
          },
          {
            tip: "not",
            baslik: "Erken planlayın",
            metin:
              "Aralıkta tasfiye edecek hurdanız olduğunu biliyorsanız, kasım içinde keşif yaptırıp randevunuzu almak beklemenizi önler. Yıl sonunun son iki haftası her yıl sıkışır.",
          },
        ],
      },
      {
        baslik: "Yaz aylarında durum tersine döner",
        bloklar: [
          {
            tip: "p",
            metin:
              "Temmuz ve ağustosta aramalar yılın en düşük seviyesine iner. Üretim izinleri, tatil dönemi ve sıcak hava saha işlerini yavaşlatır. Acelesi olmayan ve tonajı düşük işler için bu dönem aslında avantajlıdır: alıcıların programı boştur, randevu kolay alınır.",
          },
        ],
      },
    ],
    sss: [
      {
        s: "Yıl sonunda fiyatlar düşer mi?",
        c: "Hurda fiyatını belirleyen esas etken metal piyasası ve döviz kurudur, mevsim değil. Yıl sonunda değişen şey fiyattan çok yoğunluktur: randevular uzar ve tonajlı işlere öncelik verilir.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  {
    slug: "hurdaciya-ne-verilir-ne-verilmez",
    baslik: "Hurdacıya ne verilir, ne verilmez?",
    ozet:
      "Elinizdekinin hurda değeri var mı? Alınan ve alınmayan malzemeler, sık karıştırılan kalemler ve boşuna telefon etmemenin yolu.",
    kategori: "Rehber",
    tarih: "2026-09-12",
    girizgah:
      "En sık yaşanan zaman kaybı şu: insanlar hurda sanıp aradıkları şeyin aslında alınmadığını telefonda öğreniyor.",
    bolumler: [
      {
        baslik: "Alınanlar",
        bloklar: [
          {
            tip: "p",
            metin:
              "Kural basit: içinde metal varsa değeri vardır. Metalin cinsi ve oranı değerini belirler.",
          },
          {
            tip: "liste",
            maddeler: [
              "Bakır: soyma, lama, boru, talaş; kalorifer ve klima bakırı",
              "Sarı ve pirinç: musluk, tesisat armatürü, çubuk, talaş",
              "Alüminyum: profil, doğrama, jant, radyatör, ofset kalıbı, döküm",
              "Demir ve çelik: sac, profil, döküm, talaş, teneke",
              "Paslanmaz ve krom: mutfak tezgâhı, tank, hat ekipmanı",
              "Kablo: her kesit; fiyat bakır oranına göre belirlenir",
              "Beyaz eşya: buzdolabı, çamaşır ve bulaşık makinesi, fırın, klima",
              "Kombi, petek, kalorifer kazanı",
              "Sanayi hurdası: tezgâh, jeneratör, raf sistemi, çelik çatı, sandviç panel",
            ],
          },
        ],
      },
      {
        baslik: "Alınmayanlar",
        bloklar: [
          {
            tip: "liste",
            maddeler: [
              "Kâğıt, karton ve ambalaj atığı",
              "Plastik, cam ve inşaat molozu",
              "Tekstil ve mobilya",
              "Evsel çöp ve organik atık",
              "Tehlikeli atık: kimyasal, tıbbi atık, atık yağ",
            ],
          },
          {
            tip: "p",
            metin:
              "Bunlar hurdacının değil, belediyenin atık toplama sisteminin veya lisanslı atık firmalarının konusudur. Tehlikeli atıkta özellikle dikkatli olun; bunların taşınması ve bertarafı ayrı bir lisans gerektirir.",
          },
        ],
      },
      {
        baslik: "Sık karıştırılan kalemler",
        bloklar: [
          {
            tip: "not",
            baslik: "Kombi ve petek beyaz eşya sayılmaz",
            metin:
              "Çoğu kişi kombiyi ve panel radyatörü beyaz eşya zannedip sormuyor. Oysa ikisi de metal ağırlıklıdır ve alınır.",
          },
          {
            tip: "liste",
            maddeler: [
              "Çalışır durumdaki cihaz: hurda kilo fiyatı yerine ikinci el değeri konuşulur, genellikle daha yüksektir",
              "Karışık yük: metal olanlar ayrılır, kalanı size bırakılır",
              "Hurda araç: alınır ancak trafikten çekme ve hurdaya ayırma işlemleri ayrı bir süreçtir",
              "Elektronik: içindeki metal nedeniyle değerlidir, ancak cinsine göre değişir",
            ],
          },
          {
            tip: "p",
            metin:
              "Emin değilseniz en pratik yol fotoğraf göndermektir. Bakıp birkaç dakikada söyleyebiliriz; ne siz boşuna beklersiniz ne biz boşuna yola çıkarız.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  {
    slug: "hurda-satarken-dikkat-edilecekler",
    baslik: "Hurda satarken nelere dikkat edilmeli?",
    ozet:
      "Tartım, fiyat, indirme ve ödeme. Hurda satışında yaşanan anlaşmazlıkların neredeyse tamamı bu dört başlıktan çıkıyor.",
    kategori: "Rehber",
    tarih: "2026-09-12",
    girizgah:
      "Hurda satışında en sık duyulan şikâyet fiyatın düşüklüğü değil: «geldi ama söylediği fiyatı vermedi».",
    bolumler: [
      {
        baslik: "Tartım",
        bloklar: [
          {
            tip: "p",
            metin:
              "Tartım, bu işin güven noktasıdır. Perakende alımda kantar yanınızda kurulur ve rakam sizin gözünüzün önünde okunur. Tonajlı işte araç dolu ve boş tartılır, fark net ağırlığı verir.",
          },
          {
            tip: "liste",
            maddeler: [
              "Tartımı kendiniz görün, rakamı birlikte okuyun",
              "Kantarın kalibrasyonlu olup olmadığını sormaktan çekinmeyin",
              "Tonajlı işte kantar fişinin bir nüshasını isteyin",
              "Malzeme ıslaksa ağırlığın arttığını unutmayın; bu ikisi için de geçerlidir",
            ],
          },
        ],
      },
      {
        baslik: "Fiyat",
        bloklar: [
          {
            tip: "p",
            metin:
              "Telefonda verilen fiyat bir aralıktır, taahhüt değil — çünkü malzemeyi görmeden cins ve temizlik bilinemez. Ama yerinde verilen fiyatın telefondakinden ciddi biçimde sapması normal değildir. Sapıyorsa sebebinin açıklanmasını isteyin.",
          },
          {
            tip: "p",
            metin:
              "Hurda fiyatları dolara endekslidir ve günlük değişir. Bir hafta önce duyduğunuz rakam bugün geçerli olmayabilir; bu bir oyun değil, piyasanın gerçeğidir.",
          },
        ],
      },
      {
        baslik: "İndirme ve taşıma",
        bloklar: [
          {
            tip: "p",
            metin:
              "Asansörsüz binada üst kattan eşya indirmek gerçek bir emek gerektirir ve bu yüzden bazı alıcılar üste ücret talep eder. Bunu baştan sormak, kapıda tartışma yaşamanızı önler.",
          },
          {
            tip: "not",
            baslik: "Önceden söyleyin",
            metin:
              "Kaçıncı katta olduğunuzu, asansör bulunup bulunmadığını ve yaklaşık miktarı önceden belirtin. Ekip buna göre kişi ve araç planlar; hem randevu gecikmez hem fiyat sonradan değişmez.",
          },
        ],
      },
      {
        baslik: "Ödeme",
        bloklar: [
          {
            tip: "liste",
            maddeler: [
              "Perakende alımda ödeme teslim anında ve nakit olmalıdır",
              "«Sonra getiririm» diyen alıcıyla çalışmayın",
              "Kurumsal ve tonajlı işlerde havale normaldir; evrak akışıyla birlikte yürür",
              "Tutarı teslimden önce netleştirin, tartımdan sonra birlikte hesaplayın",
            ],
          },
        ],
      },
    ],
    sss: [
      {
        s: "Fiyatı beğenmezsem ne olur?",
        c: "Hiçbir şey. Keşif ve fiyat verme ücretsizdir, hiçbir yükümlülük doğurmaz. Malzemeniz yerinde kalır.",
      },
      {
        s: "Hurdayı ben mi taşımalıyım?",
        c: "Hayır. Söküm, indirme ve taşıma hizmete dahildir. Kat farkı gözetmiyoruz ve indirme için ayrıca ücret talep etmiyoruz.",
      },
    ],
  },
];

export const yaziBul = (slug: string) => yazilar.find((y) => y.slug === slug);

/** Okuma suresi - ortalama 200 kelime/dakika. */
export function okumaSuresi(y: Yazi): number {
  const kelime = y.bolumler
    .flatMap((b) => b.bloklar)
    .reduce((t, b) => {
      if (b.tip === "p") return t + b.metin.split(/\s+/).length;
      if (b.tip === "not") return t + b.metin.split(/\s+/).length;
      return t + b.maddeler.join(" ").split(/\s+/).length;
    }, 0);
  return Math.max(2, Math.round(kelime / 200));
}
