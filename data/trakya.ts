import type { Ilce } from "./types";

/**
 * TRAKYA — TEKİRDAĞ ve KIRKLARELİ
 *
 * Bu bolge Istanbul'dan farkli bir is modeli demek: agirlik ev musterisi
 * degil SANAYI. Tesisler kurumsaldir, evrak zorunludur, tonaj yuksektir
 * ve is randevuyla planlanir.
 *
 * BILINCLI TERCIH: Her ilce icin sayfa acilmadi.
 * Demirkoy, Kofcaz, Pehlivankoy, Sarkoy gibi sanayisi olmayan ilcelere
 * sayfa acmak, icerigi olmayan sayfa uretmek olurdu - Google bunu
 * doorway/thin content sayar ve sitenin tamamina zarar verir.
 * Yalnizca gercekten OSB'si veya sanayi yogunlugu olan ilceler var.
 */

export const trakyaIlceleri: Ilce[] = [
  // ───────────────── TEKİRDAĞ ─────────────────
  {
    slug: "cerkezkoy",
    ad: "Çerkezköy",
    sehir: "Tekirdağ",
    oncelik: true,
    mahalleler: [
      "Fevzipaşa",
      "Gazi Mustafa Kemal Paşa",
      "Bağlık",
      "Kızılpınar",
      "Veliköy",
    ],
    sanayi: [
      "Çerkezköy Organize Sanayi Bölgesi",
      "Veliköy Sanayi Bölgesi",
      "Kızılpınar sanayi hattı",
    ],
    profil:
      "Çerkezköy, Trakya sanayisinin kalbi sayılır ve Türkiye'nin en büyük organize sanayi bölgelerinden birini barındırır. Bölgede tekstil ve konfeksiyon, kimya, ilaç, plastik ambalaj ve otomotiv yan sanayi yoğunlaşmıştır. Buradan çıkan hurda ağırlıklı olarak üretim firesi karakterlidir: pres ve giyotin artığı sac, tornadan çıkan talaş, ambalaj teli ve çemberi, hurdaya ayrılmış tezgâh ve konveyör. Makine yenilemesi dönemlerinde tonajlı konstrüksiyon ve çelik çatı da çıkar. Elektrik panosu, kablo ve trafo gibi bakır ağırlıklı kalemler bölgede düzenli olarak değerlendirilir.",
    erisim:
      "OSB içi yollar tır ve damperli araç trafiğine uygundur, yükleme için vinç ve forklift erişimi sorunsuzdur. Tesis girişleri kayıtlı olduğu için araç ve personel bilgisinin bir gün önceden bildirilmesi gerekir. İş güvenliği donanımı (baret, yelek, çelik burunlu ayakkabı) saha içinde zorunludur.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["kapakli", "corlu", "saray", "ergene"],
    sss: [
      {
        s: "Çerkezköy OSB'de düzenli alım yapıyor musunuz?",
        c: "Evet. Bölgede düzenli fire çıkaran tesislerle periyodik anlaşma yapıyoruz; belirlenen sıklıkta veya belirli tonaja ulaşıldığında ekip yönlendiriliyor. Bu, sahanızın sürekli boş kalmasını sağlar ve her seferinde yeniden teklif toplamanızı önler.",
      },
      {
        s: "OSB giriş prosedürü için ne gerekiyor?",
        c: "Araç plakası, sürücü ve personel bilgilerini bize iletmeniz yeterli; giriş kaydını tesisinizle birlikte önceden yaptırıyoruz. İş güvenliği donanımımız ekipte standart olarak bulunur.",
      },
      {
        s: "İrsaliye ve fatura düzenleniyor mu?",
        c: "Evet. Kurumsal alımlarda sevk irsaliyesi ve fatura zinciri eksiksiz yürütülür, kantar fişinin bir nüshası size teslim edilir.",
      },
    ],
  },
  {
    slug: "corlu",
    ad: "Çorlu",
    sehir: "Tekirdağ",
    oncelik: true,
    mahalleler: [
      "Nusratiye",
      "Hıdırağa",
      "Şeyhsinan",
      "Kazimiye",
      "Muhittin",
      "Cemaliye",
    ],
    sanayi: [
      "Çorlu Deri Organize Sanayi Bölgesi",
      "Avrupa Serbest Bölgesi",
      "Çorlu–Çerkezköy sanayi koridoru",
      "Ulaş sanayi hattı",
    ],
    profil:
      "Çorlu, Trakya'nın en kalabalık sanayi ve ticaret merkezidir; deri, tekstil, gıda, ambalaj ve lojistik tesisleri bir arada bulunur. Deri OSB ve serbest bölge nedeniyle burada paslanmaz ekipman, proses tankı ve hat malzemesi diğer ilçelere göre belirgin biçimde daha çok çıkar. Tekstil tarafında makine yenilemesinden çıkan tezgâh ve konstrüksiyon; ambalaj tarafında kalıp, pres firesi ve çember ağırlıktadır. Lojistik depolarda ise raf sistemi sökümü ve hurdaya ayrılmış forklift düzenli iş kalemleridir.",
    erisim:
      "D-100 ve otoyol bağlantıları sayesinde ağır araç erişimi rahattır. Serbest bölge ve OSB içindeki tesislerde giriş izni ve gümrüklü saha prosedürleri devreye girebilir; bu durumda evrak akışı normalden uzun sürer, planlamayı buna göre yapıyoruz.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["cerkezkoy", "ergene", "muratli", "luleburgaz"],
    sss: [
      {
        s: "Serbest bölgedeki tesisimizden alım yapabilir misiniz?",
        c: "Evet, ancak serbest bölge çıkışlı mallarda gümrük ve evrak prosedürü farklı işler. Tesisinizin dış ticaret biriminin yönlendirmesiyle süreci birlikte yürütüyoruz; keşif sırasında bunu netleştiriyoruz.",
      },
      {
        s: "Paslanmaz tank ve proses hattı alıyor musunuz?",
        c: "Evet. Paslanmaz, bölgede en sık çıkan yüksek değerli kalemlerden biri. Söküm gerektiren işlerde kesim ekipmanı ve ekiple geliyoruz; teklif hurdanın değeri ile söküm maliyeti birlikte değerlendirilerek veriliyor.",
      },
    ],
  },
  {
    slug: "ergene",
    ad: "Ergene",
    sehir: "Tekirdağ",
    oncelik: true,
    mahalleler: ["Velimeşe", "Ulaş", "Marmaracık", "Vakıflar", "Sağlık"],
    sanayi: [
      "Ergene 1 Organize Sanayi Bölgesi",
      "Ergene 2 Organize Sanayi Bölgesi",
      "Velimeşe Organize Sanayi Bölgesi",
      "Marmaracık sanayi hattı",
    ],
    profil:
      "Ergene, adını taşıdığı ovada neredeyse tamamen sanayiye ayrılmış bir ilçedir; Velimeşe ve Ergene OSB'leri bölgenin en yoğun üretim alanları arasındadır. Tekstil boya-apre, plastik, kimya ve metal işleme tesisleri yoğundur. Metal işleme atölyelerinden düzenli talaş ve sac firesi, boyahanelerden paslanmaz tank ve hat, plastik tesislerinden kalıp ve konstrüksiyon çıkar. İlçede tesis yenilemesi ve kapasite değişimi sık olduğu için tonajlı söküm işleri de düzenli gündeme gelir.",
    erisim:
      "OSB içi altyapı ağır araca uygundur; yükleme alanları geniştir. Ovada yer aldığı için kış aylarında saha zemini yumuşayabilir, bu durumda araç seçimi ve yükleme noktası keşifte birlikte belirlenir.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["corlu", "cerkezkoy", "muratli"],
    sss: [
      {
        s: "Tesis sökümü yapıyor musunuz?",
        c: "Evet. Çelik çatı, konstrüksiyon, tank ve hat sökümü ekipman ve ekip gerektiren ayrı bir kalemdir. Keşifte kapsam, süre ve iş güvenliği sorumluluğu yazılı olarak netleştirilir.",
      },
      {
        s: "Talaş gibi düzenli fireler için anlaşma yapılabilir mi?",
        c: "Evet, en verimli çalışma şekli budur. Talaş ve sac firesi düzenli biriktiği için periyodik alım hem sahanızı boş tutar hem de her seferinde pazarlık yapmanızı önler.",
      },
    ],
  },
  {
    slug: "kapakli",
    ad: "Kapaklı",
    sehir: "Tekirdağ",
    mahalleler: ["Karaağaç", "Bahçeağıl", "Pınarça", "Atatürk", "Cumhuriyet"],
    sanayi: [
      "Çerkezköy OSB'ye komşu sanayi hattı",
      "Karaağaç sanayi bölgesi",
    ],
    profil:
      "Kapaklı, Çerkezköy OSB'nin hemen yanında büyümüş, sanayi ile yoğun konutun iç içe geçtiği bir ilçedir. Bu ikili yapı hurda profilini de belirler: bir yanda OSB çevresindeki atölye ve yan sanayiden çıkan metal fire, sac ve profil artığı; diğer yanda hızla artan konut stokundan çıkan beyaz eşya, kombi, petek ve tadilat hurdası. İlçede küçük ve orta ölçekli imalathane sayısı yüksek olduğu için tonajı düşük ama düzenli iş hacmi vardır.",
    erisim:
      "Sanayi hattında ağır araç erişimi rahat; konut bölgelerinde ise sokaklar dar ve park yoğunluğu yüksek olabilir. Konut alımlarında kat ve asansör bilgisini önceden almamız, ekibi doğru planlamamızı sağlıyor.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["cerkezkoy", "saray"],
    sss: [
      {
        s: "Küçük atölyeyim, düşük tonaj için de geliyor musunuz?",
        c: "Geliyoruz. Tonaj düşükse güzergâh üzerindeki diğer alımlarla birlikte planlanır; bu yüzden randevu birkaç gün ileriye verilebilir.",
      },
    ],
  },
  {
    slug: "muratli",
    ad: "Muratlı",
    sehir: "Tekirdağ",
    mahalleler: ["Cumhuriyet", "İnönü", "Fatih", "Yeni"],
    sanayi: ["Muratlı Organize Sanayi Bölgesi", "Demiryolu lojistik hattı"],
    profil:
      "Muratlı, demiryolu bağlantısı sayesinde lojistik avantajı olan, orta ölçekli bir sanayi ilçesidir. OSB'de gıda, yem, ambalaj ve metal işleme tesisleri bulunur. Buradan çıkan hurdanın önemli bölümü depolama ve taşıma ekipmanıdır: raf sistemi, konteyner, silo ve konveyör aksamı. Tarımsal sanayi ağırlığı nedeniyle hurdaya ayrılmış tarım makinesi ve ekipmanı da düzenli olarak değerlendirilir.",
    erisim:
      "OSB ve çevresinde ağır araç erişimi sorunsuzdur. Silo ve tank gibi yüksek yapıların sökümünde vinç gerekir; bu keşifte planlanır.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["corlu", "ergene", "suleymanpasa"],
    sss: [
      {
        s: "Silo ve tank sökümü yapıyor musunuz?",
        c: "Evet. Yüksek yapıların sökümü vinç ve kesim ekipmanı gerektirir; keşif sonrası kapsam ve iş güvenliği planı birlikte belirlenir.",
      },
    ],
  },
  {
    slug: "saray",
    ad: "Saray",
    sehir: "Tekirdağ",
    mahalleler: ["Kurtdere", "Büyükyoncalı", "Fatih", "Yeni"],
    sanayi: ["Saray Organize Sanayi Bölgesi", "Büyükyoncalı sanayi hattı"],
    profil:
      "Saray, Çerkezköy hattının kuzey ucunda yer alan ve son yıllarda sanayi yatırımı artan bir ilçedir. OSB'de mobilya, ahşap işleme, plastik ve metal imalat tesisleri bulunur. Metal tarafında sac fire ve profil artığı; mobilya ve ahşap tesislerinde ise makine yenilemesinden çıkan tezgâh, konstrüksiyon ve toz toplama hattı ağırlıklı kalemlerdir. İlçede orman ürünleri sanayisi de bulunduğu için hurdaya ayrılmış ağır iş makinesi aksamı zaman zaman gündeme gelir.",
    erisim:
      "OSB içi erişim uygundur. İlçe merkezi dışındaki tesislere ulaşım daha uzun sürdüğü için randevu planlaması güzergâh üzerinden yapılır.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["cerkezkoy", "kapakli", "vize"],
    sss: [
      {
        s: "Hurdaya ayrılmış iş makinesi alıyor musunuz?",
        c: "Evet. Ağır iş makinesi ve aksamı hem tonaj hem cins olarak değerlidir. Aracın veya makinenin çekilmesi gerekiyorsa bunu keşifte planlıyoruz.",
      },
    ],
  },
  {
    slug: "suleymanpasa",
    ad: "Süleymanpaşa",
    sehir: "Tekirdağ",
    mahalleler: ["Değirmenaltı", "Zafer", "Hürriyet", "100. Yıl", "Barbaros"],
    sanayi: [
      "Tekirdağ Organize Sanayi Bölgesi",
      "Tekirdağ Limanı ve çevresi",
      "Değirmenaltı sanayi hattı",
    ],
    profil:
      "Süleymanpaşa, Tekirdağ'ın merkez ilçesidir; liman, ticaret ve kamu yoğunluğu sanayiyle bir aradadır. Liman çevresinde gemi ve deniz ekipmanı kaynaklı hurda, halat makarası, konteyner aksamı ve ağır çelik parçalar çıkar. Merkezde ise ticari mutfak ekipmanı, otel ve işyeri tadilatlarından çıkan paslanmaz ve alüminyum doğrama düzenli kalemlerdir. Konut yoğunluğu nedeniyle beyaz eşya ve ev hurdası da ilçede sürekli iş hacmi oluşturur.",
    erisim:
      "Merkez ve liman çevresinde ağır araç erişimi uygundur. Sahil ve eski yerleşim sokaklarında araç girişi kısıtlı olabilir; bu bölgelerde küçük araçla çalışıyoruz.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["muratli", "corlu"],
    sss: [
      {
        s: "Ticari mutfak ekipmanı alıyor musunuz?",
        c: "Evet. Paslanmaz tezgâh, davlumbaz, ocak ve soğutma ekipmanı hem hurda hem ikinci el değeri açısından değerlendirilir. Çalışır durumdaki cihazlarda genellikle hurda kilo fiyatının üzerinde teklif çıkar.",
      },
    ],
  },

  // ───────────────── KIRKLARELİ ─────────────────
  {
    slug: "luleburgaz",
    ad: "Lüleburgaz",
    sehir: "Kırklareli",
    oncelik: true,
    mahalleler: ["Kocasinan", "Yıldırım", "Durak", "Sakızköy", "Ahmetbey"],
    sanayi: [
      "Lüleburgaz Organize Sanayi Bölgesi",
      "Büyükkarıştıran sanayi hattı",
      "E-5 üzeri sanayi tesisleri",
    ],
    profil:
      "Lüleburgaz, Kırklareli'nin en büyük sanayi merkezi ve Trakya'nın ana üretim hatlarından biridir. Cam, tekstil, gıda ve otomotiv yan sanayi tesisleri yoğundur. Cam ve ağır sanayi tesislerinden çıkan hurda karakter olarak diğer ilçelerden ayrılır: fırın ve ocak konstrüksiyonu, refrakter taşıyıcı çelik, ağır tonajlı hat ekipmanı. Tekstil ve gıda tarafında ise makine yenilemesinden çıkan tezgâh, paslanmaz hat ve konveyör düzenli kalemlerdir. Büyükkarıştıran hattında lojistik depoları nedeniyle raf sistemi sökümü sık iş konusudur.",
    erisim:
      "D-100 üzerinde bulunması ağır araç erişimini kolaylaştırır. Büyük tesislerde vinç ve ağır kesim ekipmanı gerektiren işler yaygındır; bunlar keşif sonrası ayrı planlanır.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["babaeski", "corlu", "kirklareli"],
    sss: [
      {
        s: "Ağır tonajlı hat sökümü yapıyor musunuz?",
        c: "Evet. Tonajlı söküm işlerinde vinç, oksijenli kesim ve deneyimli ekip gerekir. Kapsam, süre ve iş güvenliği sorumluluğu keşifte yazılı olarak belirlenir.",
      },
      {
        s: "Lüleburgaz OSB'ye düzenli geliyor musunuz?",
        c: "Evet. Lüleburgaz, Trakya güzergâhımızın düzenli duraklarından biri. Periyodik anlaşması olan tesislerle belirlenen sıklıkta çalışıyoruz.",
      },
    ],
  },
  {
    slug: "babaeski",
    ad: "Babaeski",
    sehir: "Kırklareli",
    mahalleler: ["Cumhuriyet", "Gazi Osman Paşa", "Alpullu", "Büyükmandıra"],
    sanayi: ["Babaeski Organize Sanayi Bölgesi", "Alpullu sanayi hattı"],
    profil:
      "Babaeski, tarımsal sanayinin belirleyici olduğu bir ilçedir; un, yem, gıda işleme ve ambalaj tesisleri yoğundur. Buradan çıkan hurdanın karakteri depolama ve taşıma ekipmanı ağırlıklıdır: silo, elevatör, konveyör, paslanmaz hat ve ambalaj makinesi. Tarımsal faaliyet nedeniyle hurdaya ayrılmış traktör, römork ve tarım makinesi de düzenli olarak değerlendirilir. Alpullu hattında eski sanayi yapıları nedeniyle konstrüksiyon ve çelik çatı sökümü gündeme gelebilir.",
    erisim:
      "İlçe merkezi ve OSB'de ağır araç erişimi uygundur. Köy ve kırsal noktalarda yol durumu değişkendir; keşifte araç tipini buna göre belirliyoruz.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["luleburgaz", "kirklareli"],
    sss: [
      {
        s: "Tarım makinesi ve traktör alıyor musunuz?",
        c: "Evet. Hurdaya ayrılmış tarım makinesi hem tonaj hem metal cinsi bakımından değerlidir. Araç niteliğindeki makinelerde trafik kaydı varsa hurdaya ayırma işlemi ayrı bir süreçtir, bunu birlikte planlıyoruz.",
      },
    ],
  },
  {
    slug: "kirklareli",
    ad: "Kırklareli",
    sehir: "Kırklareli",
    mahalleler: ["Karacaibrahim", "Camiikebir", "Doğu", "Bademlik", "İstasyon"],
    sanayi: [
      "Kırklareli Organize Sanayi Bölgesi",
      "Kavaklı sanayi hattı",
      "Üniversite ve kamu yerleşkeleri",
    ],
    profil:
      "Kırklareli merkez, il idaresi, üniversite ve orta ölçekli sanayinin bir arada bulunduğu bir ilçedir. OSB'de gıda, içecek, ambalaj ve metal işleme tesisleri yer alır. Kamu ve üniversite yerleşkeleri nedeniyle ilçede kurumsal tasfiye işleri — hurdaya ayrılmış mobilya iskeleti, laboratuvar ekipmanı, klima ve elektrik panosu — diğer ilçelere göre daha sık gündeme gelir. Sanayi tarafında ise paslanmaz hat, ambalaj makinesi ve konstrüksiyon ağırlıktadır.",
    erisim:
      "Merkez ve OSB'de ağır araç erişimi uygundur. Kamu kurumlarında tasfiye işlemleri kendi prosedürüne tabidir; bu süreçte evrak akışını kurumun ilgili birimiyle birlikte yürütüyoruz.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["luleburgaz", "babaeski", "pinarhisar", "vize"],
    sss: [
      {
        s: "Kamu kurumu tasfiyesine katılıyor musunuz?",
        c: "Evet. Kamu tasfiyelerinde süreç kurumun ihale ve satış prosedürüne göre yürür. Evrak ve tartım tarafında eksiksiz çalışıyoruz; kurumun talep ettiği belgeleri sağlıyoruz.",
      },
    ],
  },
  {
    slug: "vize",
    ad: "Vize",
    sehir: "Kırklareli",
    mahalleler: ["Cumhuriyet", "Hasbuğa", "Sofular", "Kışlacık"],
    sanayi: ["Vize Organize Sanayi Bölgesi", "Kışlacık sanayi hattı"],
    profil:
      "Vize, tarım ve ormancılığın yanında son yıllarda sanayi yatırımı artan bir ilçedir. OSB'de ahşap işleme, gıda ve metal imalat tesisleri bulunur. Ahşap ve orman ürünleri tesislerinden çıkan hurda çoğunlukla makine ve konstrüksiyon karakterlidir: kesim tezgâhı, toz toplama hattı, konveyör. Metal atölyelerinde sac fire ve profil artığı; kırsal kesimde ise hurdaya ayrılmış tarım ekipmanı düzenli olarak değerlendirilir.",
    erisim:
      "OSB ve ilçe merkezinde erişim uygundur. Orman içi ve kırsal noktalarda yol durumu mevsime göre değişir; keşifte araç tipi buna göre seçilir.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["kirklareli", "pinarhisar", "saray"],
    sss: [
      {
        s: "Kırsal noktalara da geliyor musunuz?",
        c: "Geliyoruz. Yol durumu ve tonaja göre araç tipi seçiyoruz; uzak noktalarda randevu güzergâh planına göre verilir.",
      },
    ],
  },
  {
    slug: "pinarhisar",
    ad: "Pınarhisar",
    sehir: "Kırklareli",
    mahalleler: ["Cumhuriyet", "Yeni", "Erenler", "Kaynarca"],
    sanayi: ["Çimento ve yapı malzemesi tesisleri", "Taş ocakları hattı"],
    profil:
      "Pınarhisar, çimento ve yapı malzemesi sanayisiyle öne çıkan bir ilçedir. Bu yapı hurda profilini doğrudan belirler: ağır aşınma parçaları, değirmen ve kırıcı aksamı, konveyör bandı taşıyıcıları, silo ve baca konstrüksiyonu. Taş ocağı faaliyeti nedeniyle hurdaya ayrılmış ağır iş makinesi aksamı, paletli parçalar ve kepçe dişi gibi kalemler de düzenli çıkar. Bu tür malzeme yüksek tonajlı ve ağır olduğu için yükleme ekipmanı gerektirir.",
    erisim:
      "Tesis içi yollar ağır araca uygundur. Ağır aşınma parçaları ve konstrüksiyon için vinç ve kesim ekipmanı gerekir; bu işler keşif sonrası ayrı planlanır.",
    varis: "Randevulu — tonaja göre planlanır",
    komsu: ["kirklareli", "vize"],
    sss: [
      {
        s: "Ağır aşınma parçası ve döküm alıyor musunuz?",
        c: "Evet. Değirmen ve kırıcı aksamı, kepçe dişi gibi ağır döküm parçalar tonaj olarak değerlidir. Yükleme ekipmanı gerektirdiği için bu işleri randevuyla ve uygun araçla planlıyoruz.",
      },
    ],
  },
];
