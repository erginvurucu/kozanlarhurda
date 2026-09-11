import type { Ilce } from "./types";

/**
 * ONCELIKLI ILCELER - elle, ozenle yazildi.
 * Bu dosyadaki icerik sablon degildir; her ilce kendi sahasini anlatir.
 */
export const oncelikliIlceler: Ilce[] = [
  {
    slug: "esenyurt",
    ad: "Esenyurt",
    yaka: "avrupa",
    oncelik: true,
    mahalleler: [
      "Kıraç", "Saadetdere", "Yenikent", "Balıkyolu", "Namık Kemal",
      "Mehterçeşme", "İncirtepe", "Akçaburgaz", "Güzelyurt", "Pınar",
      "Zafer", "Örnek", "Battalgazi", "Fatih", "Süleymaniye",
      "Cumhuriyet", "Barbaros Hayrettin Paşa", "Talatpaşa", "Çınar", "Aşık Veysel",
    ],
    sanayi: [
      "Kıraç Sanayi Bölgesi",
      "Akçaburgaz Sanayi Sitesi",
      "Esenyurt Sanayi Sitesi",
      "Haramidere Sanayi Bölgesi",
    ],
    profil:
      "Esenyurt, İstanbul'un en kalabalık ilçesi olması nedeniyle hem ev hurdası hem sanayi hurdası açısından yoğun bir bölge. İlçenin kuzeyi ve Kıraç hattı fabrika, imalathane ve depo ağırlıklı; buradan çıkan hurda genellikle tonajlı demir profil, sac fire, palet bandı, üretim artığı alüminyum ve kablo oluyor. Güneydeki yoğun konut bölgelerinde ise tablo tamamen değişiyor: taşınma ve tadilat kaynaklı beyaz eşya, kombi, petek, klima, eski mobilya demiri ve kapı-pencere doğraması ağırlıkta. Bu iki farklı ihtiyaca aynı araçla gidilmez; Esenyurt'ta konut için kapalı kasa kamyonet, sanayi için kantarlı kamyon ayrı planlanır.",
    erisim:
      "İlçenin güney konut bölgelerinde sokaklar dar ve park yoğunluğu yüksek, bu yüzden büyük kamyon yerine kamyonetle giriş yapılır. Kıraç ve Akçaburgaz tarafında tır/kamyon erişimi rahattır, fabrika içi yükleme yapılabilir. Asansörsüz binalarda üst kat beyaz eşya indirme için ek personel gönderilir.",
    varis: "Ortalama 30-45 dakika, Kıraç hattında 20-30 dakika",
    komsu: ["beylikduzu", "avcilar", "buyukcekmece", "basaksehir", "kucukcekmece"],
    sss: [
      {
        s: "Esenyurt'ta hurda alımı için minimum miktar şartı var mı?",
        c: "Konut bölgelerinde tek parça beyaz eşya veya birkaç kalem hurda için de geliyoruz. Kıraç ve sanayi bölgesinde ise 500 kg üzeri partiler için kantarlı araçla, altındaki miktarlar için kamyonetle hizmet veriyoruz.",
      },
      {
        s: "Kıraç'taki fabrikamdan düzenli hurda çıkıyor, anlaşma yapabilir miyiz?",
        c: "Evet. Kıraç Sanayi Bölgesi ve Akçaburgaz'da düzenli fire çıkaran imalathanelerle periyodik alım anlaşması yapılıyor. Sahaya konteyner bırakılıp dolunca alınması şeklinde de çalışılabiliyor.",
      },
      {
        s: "Esenyurt'ta aynı gün gelebiliyor musunuz?",
        c: "Sabah saatlerinde verilen taleplerde aynı gün, öğleden sonraki taleplerde çoğunlukla ertesi sabah ekip yönlendiriliyor. Esenyurt sürekli araç bulundurulan bir bölge olduğu için bekleme süresi kısa.",
      },
      {
        s: "Apartmanın 4. katındayım, asansör yok. Beyaz eşyayı indirir misiniz?",
        c: "Evet, indirme dahil. Esenyurt'ta asansörsüz bina oranı yüksek olduğu için ekipler bu duruma göre planlanıyor. Talep formunda kat ve asansör bilgisini belirtmeniz yeterli.",
      },
      {
        s: "Tadilat sonrası çıkan karışık demiri alıyor musunuz?",
        c: "Demir, doğrama ve metal aksamı alıyoruz. Ancak moloz, beton ve inşaat atığı hurda kapsamına girmiyor; bunlar için ilçe belediyesinin moloz toplama hizmetine yönlendiriyoruz.",
      },
    ],
    altSayfalar: [
      {
        slug: "kirac",
        ad: "Kıraç",
        profil:
          "Kıraç, Esenyurt'un sanayi yüzü. Tekstil, plastik, metal işleme ve lojistik depolarının yoğunlaştığı bu bölgede çıkan hurda ev hurdasından tamamen farklı: sac fire, talaş, profil artığı, hurda kalıp, endüstriyel kablo ve paletli metal ambalaj. Kıraç'ta iş genellikle tonajla konuşulur ve kantar fişi talep edilir. Fabrika içine kamyon girişi mümkün olduğu için yükleme forklift destekli yapılabiliyor, bu da alım fiyatını olumlu etkiliyor.",
        sss: [
          {
            s: "Kıraç'ta kantarlı alım yapıyor musunuz?",
            c: "Evet. Tonajlı partilerde araç dolu-boş tartılıp kantar fişi teslim ediliyor, ödeme fiş üzerinden yapılıyor.",
          },
          {
            s: "Fabrika hurdası için irsaliye düzenleniyor mu?",
            c: "Evet, kurumsal alımlarda irsaliye ve gerekli evrak düzenleniyor. Şirket hurda satışlarında bu evrak muhasebe açısından zorunlu.",
          },
        ],
      },
      {
        slug: "saadetdere",
        ad: "Saadetdere",
        profil:
          "Saadetdere yoğun konut dokusuna sahip, taşınma trafiğinin yüksek olduğu bir mahalle. Buradan çıkan hurdanın büyük kısmı ev eşyası kaynaklı: buzdolabı, çamaşır makinesi, kombi, petek, klima dış ünitesi ve hurda mobilya iskeleti. Sokaklar dar olduğundan alım kamyonetle yapılıyor ve genellikle randevu saati komşu park yoğunluğuna göre belirleniyor.",
      },
      {
        slug: "akcaburgaz",
        ad: "Akçaburgaz",
        profil:
          "Akçaburgaz, depo ve imalathane yoğunluğuyla öne çıkıyor. Bölgeden düzenli olarak karton-metal karışık ambalaj, hurda raf sistemi, çelik konstrüksiyon parçası ve makine sökümü kaynaklı metal çıkıyor. Raf söküm işleri genellikle randevulu ve ekiple yapılıyor.",
      },
    ],
  },
  {
    slug: "beylikduzu",
    ad: "Beylikdüzü",
    yaka: "avrupa",
    oncelik: true,
    mahalleler: [
      "Cumhuriyet", "Adnan Kahveci", "Barış", "Büyükşehir", "Dereağzı",
      "Gürpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu", "Beykent",
    ],
    sanayi: [
      "Yakuplu Sanayi Bölgesi",
      "Beylikdüzü Organize Sanayi Bölgesi (BOSB)",
      "Gürpınar Sanayi Sitesi",
    ],
    profil:
      "Beylikdüzü, İstanbul'un en planlı konut bölgelerinden biri ve bu durum çıkan hurdanın niteliğini doğrudan belirliyor. İlçede site ve rezidans oranı çok yüksek; dolayısıyla gelen taleplerin büyük çoğunluğu ev yenileme kaynaklı beyaz eşya, ankastre set, klima ve kombi değişimi. Eski yapı stoku az olduğu için çıkan eşya genelde görece yeni ve iyi durumda — bu da kilo fiyatının üzerinde değerlendirme imkânı sağlıyor. Yakuplu ve BOSB hattı ise tamamen ayrı bir dünya: burada makine, kalıp ve üretim firesi ağırlıklı kurumsal alım yapılıyor.",
    erisim:
      "Site ve rezidanslarda yönetim izni ve yük asansörü rezervasyonu gerekiyor; bu yüzden randevu saati site yönetimiyle koordineli belirleniyor. Cadde üzeri geniş, araç erişimi rahat. Yakuplu sanayi tarafında kamyon girişi sorunsuz.",
    varis: "Ortalama 25-40 dakika",
    komsu: ["esenyurt", "buyukcekmece", "avcilar"],
    sss: [
      {
        s: "Sitede oturuyorum, yönetim izni gerekiyor mu?",
        c: "Genellikle evet. Beylikdüzü'ndeki çoğu site yük asansörü kullanımı için önceden bildirim istiyor. Randevu öncesi yönetime bilgi vermeniz süreci hızlandırır; gerekirse ekip araç plakası ve personel bilgisini iletir.",
      },
      {
        s: "Çalışır durumdaki beyaz eşyam için kilo fiyatı mı veriyorsunuz?",
        c: "Hayır. Çalışır ve görece yeni cihazlarda hurda kilo fiyatı değil, ikinci el değeri üzerinden teklif veriliyor. Beylikdüzü'nde gelen eşyaların önemli kısmı bu kategoriye giriyor, bu yüzden yerinde görmek fiyatı ciddi şekilde değiştirebiliyor.",
      },
      {
        s: "Ankastre mutfak sökümü yapıyor musunuz?",
        c: "Evet. Ankastre fırın, davlumbaz, ocak ve set üstü cihazların sökümü ekip tarafından yapılıyor. Mutfak tadilatlarında dolap metal aksamı da birlikte alınabiliyor.",
      },
      {
        s: "BOSB'daki firmamız için düzenli hizmet alabilir miyiz?",
        c: "Evet. Beylikdüzü OSB ve Yakuplu'daki üretici firmalarla periyodik fire alımı anlaşması yapılıyor; irsaliyeli ve kantarlı çalışılıyor.",
      },
      {
        s: "Klima sökümünü siz mi yapıyorsunuz?",
        c: "Dış ünite ve iç ünite sökümü yapılıyor. Gaz tahliyesi gereken durumlarda sertifikalı ekiple çalışıldığı için randevu bir gün öncesinden planlanıyor.",
      },
    ],
    altSayfalar: [
      {
        slug: "yakuplu",
        ad: "Yakuplu",
        profil:
          "Yakuplu, Beylikdüzü'nün sanayi ve ticaret ağırlıklı bölgesi. Bölgede hem küçük imalathaneler hem de büyük ölçekli depo ve showroomlar bulunuyor. Çıkan hurda; hurda raf, vitrin metali, makine parçası, hurda kablo ve sac fire olarak öne çıkıyor. Kamyon erişimi rahat olduğu için tonajlı alım Yakuplu'da sorunsuz yapılıyor.",
      },
      {
        slug: "adnan-kahveci",
        ad: "Adnan Kahveci",
        profil:
          "Adnan Kahveci, Beylikdüzü'nün en yoğun konut mahallelerinden. Büyük siteler ve yüksek katlı bloklar nedeniyle taleplerin neredeyse tamamı beyaz eşya ve ev yenileme kaynaklı. Yük asansörü kullanımı standart olduğundan alım hızlı tamamlanıyor; randevular genellikle site yönetiminin belirlediği saat aralıklarında veriliyor.",
      },
    ],
  },
  {
    slug: "avcilar",
    ad: "Avcılar",
    yaka: "avrupa",
    oncelik: true,
    mahalleler: [
      "Cihangir", "Tahtakale", "Yeşilkent", "Firuzköy", "Ambarlı",
      "Denizköşkler", "Merkez", "Mustafa Kemal Paşa", "Üniversite", "Gümüşpala",
    ],
    sanayi: ["Ambarlı Liman Bölgesi", "Firuzköy Sanayi Sitesi", "Avcılar Sanayi Sitesi"],
    profil:
      "Avcılar'ın hurda profilini iki şey belirliyor: üniversite ve liman. Kampüs nedeniyle ilçede çok yoğun bir öğrenci kiracı sirkülasyonu var; dönem sonlarında ve yaz aylarında taşınma kaynaklı hurda talebi belirgin şekilde artıyor. Bu taleplerde çıkan tipik kalemler küçük ev aletleri, tek kapılı buzdolabı, hurda karyola ve metal mobilya. İlçenin diğer ucundaki Ambarlı Limanı ve Firuzköy hattı ise tamamen endüstriyel: hurda konteyner aksamı, çelik halat, paletli metal ve nakliye ekipmanı. Ayrıca Avcılar, kentsel dönüşümün yoğun yaşandığı bir ilçe; bina yenilemelerinden çıkan doğrama, korkuluk ve çatı sacı düzenli bir hurda kaynağı oluşturuyor.",
    erisim:
      "E-5 ve sahil yolu bağlantısı sayesinde araç erişimi hızlı. Cihangir ve Tahtakale'nin iç sokakları dar olduğundan kamyonet tercih ediliyor. Yeşilkent ve Firuzköy tarafında geniş yol yapısı kamyon girişine uygun. Kentsel dönüşüm şantiyelerinde alım, şantiye şefiyle koordineli ve iş güvenliği kurallarına uygun yapılıyor.",
    varis: "Ortalama 25-40 dakika",
    komsu: ["kucukcekmece", "esenyurt", "beylikduzu", "basaksehir"],
    sss: [
      {
        s: "Öğrenci eviyim, az miktarda eşya var. Yine de geliyor musunuz?",
        c: "Evet. Avcılar'da öğrenci taşınmaları çok yoğun olduğu için küçük partiler için de ekip yönlendiriliyor. Birkaç komşu aynı gün için birleşirse hem randevu hızlanıyor hem de değerlendirme daha iyi oluyor.",
      },
      {
        s: "Kentsel dönüşüme giren binamızdan çıkan demiri alıyor musunuz?",
        c: "Evet. Avcılar'da kentsel dönüşüm kaynaklı doğrama, korkuluk, çatı sacı ve tesisat metali düzenli olarak alınıyor. Bina yıkımı öncesi toplu sökümlerde müteahhit ile anlaşmalı çalışılabiliyor.",
      },
      {
        s: "Ambarlı'daki depomuzdan tonajlı hurda çıkıyor, kantar var mı?",
        c: "Evet. Ambarlı ve Firuzköy hattında kantarlı kamyonla çalışılıyor, dolu-boş tartım sonrası kantar fişi teslim ediliyor ve kurumsal alımlarda irsaliye düzenleniyor.",
      },
      {
        s: "Hurda aracımı alıyor musunuz?",
        c: "Hurdaya ayrılan araçlar için ayrı bir süreç işliyor. Aracın noter ve trafik tescil işlemleri tamamlanmadan alım yapılmıyor; hurda belgesi süreci konusunda yönlendirme sağlanıyor.",
      },
      {
        s: "Hafta sonu hizmet veriyor musunuz?",
        c: "Cumartesi tam gün hizmet veriliyor. Pazar günü yalnızca önceden randevulu toplu alımlar için ekip çıkıyor.",
      },
    ],
    altSayfalar: [
      {
        slug: "cihangir",
        ad: "Cihangir",
        profil:
          "Avcılar Cihangir, yoğun apartman dokusuna sahip ve ilçenin en çok talep gelen mahallesi. Eski yapı stoku fazla olduğu için kombi, petek, doğrama ve hurda mobilya çıkışı yüksek. Sokaklar dar ve park yoğunluğu fazla olduğundan alım kamyonetle ve genellikle sabah erken saatlerde planlanıyor.",
      },
      {
        slug: "tahtakale",
        ad: "Tahtakale",
        profil:
          "Tahtakale, ticari dükkân ve küçük işletme yoğunluğuyla farklılaşıyor. Buradan çıkan hurda ev tipi değil işletme tipi: hurda vitrin, raf, tezgâh metali, soğutucu dolap ve ticari mutfak ekipmanı. Dükkân devir ve tadilatlarında toplu alım sık yapılıyor.",
      },
      {
        slug: "yesilkent",
        ad: "Yeşilkent",
        profil:
          "Yeşilkent, Avcılar'ın planlı ve site ağırlıklı bölgesi. Geniş yollar ve yük asansörlü bloklar sayesinde alım pratik ilerliyor. Çıkan eşya çoğunlukla ev yenileme kaynaklı beyaz eşya ve klima; cihazlar görece yeni olduğu için sık sık ikinci el değeri üzerinden teklif veriliyor.",
      },
      {
        slug: "firuzkoy",
        ad: "Firuzköy",
        profil:
          "Firuzköy, konut ve küçük sanayinin iç içe geçtiği bir bölge. Hem müstakil ev hurdası hem de atölye kaynaklı metal fire çıkıyor. Yol yapısı geniş olduğu için kamyon girişi mümkün; bahçeli evlerden çıkan hurda demir ve bahçe ekipmanı da düzenli alım kalemleri arasında.",
      },
    ],
  },
];
