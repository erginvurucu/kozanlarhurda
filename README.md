# Kozanlar Hurda — İstanbul Hurdacı Lead-Gen Sitesi

Next.js 15 (App Router) + Tailwind v4. Vercel'de statik üretimle yayınlanmak üzere kuruldu.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
```

## Yayına almadan önce MUTLAKA yapılacaklar

### 1. `lib/site.ts` — gerçek bilgileri gir
Telefon, WhatsApp ve e-posta şu an **placeholder**. Bunlar değişmeden site
yayına alınırsa gelen aramalar boşa gider.

```ts
phone: "+90555...",      // ← gerçek numara
whatsapp: "90555...",    // ← ülke kodu + numara, + ve boşluk YOK
email: "...",
domain / url             // ← kozanlarhurda.com (alınacak)
```

### 2. `data/fiyatlar.ts` — fiyatları gir
Tüm `min`/`max` değerleri bilerek `null` bırakıldı; tabloda "Günlük fiyat"
yazıyor. **Uydurma rakam yayınlamamak için böyle yapıldı.** Gerçek alım
fiyatlarını girince tablo otomatik dolar.

Fiyat girdiğinde `guncelleme` tarihini de güncelle — tazelik sinyali SEO için önemli.

### 3. Lead bildirimi — env değişkenleri
Vercel > Settings > Environment Variables:

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

Tanımlı değilse lead kaybolmaz, sunucu loguna yazılır — ama **canlıda mutlaka tanımla.**

### 4. KVKK metnini avukata kontrol ettir
`app/kvkk/page.tsx` bir şablondur. Veri sorumlusu unvanı/adresi doldurulmalı,
lead aktarılan firmalar netleştirilmeli. VERBİS kayıt yükümlülüğü çalışan
sayısı ve ciro eşiğine bağlı — değerlendirilmeli.

## Mimari

```
data/
  types.ts        Ilce/Mahalle tip tanimlari
  oncelikli.ts    Esenyurt, Beylikduzu, Avcilar — elle yazilmis zengin icerik
  avrupa.ts       Avrupa yakasi diger 22 ilce
  anadolu.ts      Anadolu yakasi 14 ilce
  ilceler.ts      Birlestirme + yardimci fonksiyonlar
  fiyatlar.ts     Fiyat tablosu verisi
app/
  [ilce]/                  39 ilce sayfasi (SSG)
  [ilce]/[mahalle]/        9 mahalle sayfasi (SSG)
  hurda-fiyatlari/         Trafik motoru
  api/teklif/              Lead alma ucu
```

### İçerik farklılaşması — en kritik nokta

39 ilçe sayfası aynı şablonu kullanır ama **içerik veriden gelir ve her ilçede
farklıdır**: gerçek mahalle listesi, bölgedeki sanayi siteleri, o bölgeye özgü
hurda profili, araç erişim notu ve ilçeye özel SSS.

Aynı metni ilçe adı değiştirerek çoğaltmak Google'ın "doorway page" filtresine
takılır ve **hiçbir sayfa sıralanmaz.** Yeni ilçe içeriği yazarken bu kurala uy.

Farklılaşmayı ölçmek için (dev sunucu açıkken):

```bash
node /tmp/thin-test.mjs   # Jaccard benzerligi; %75 alti hedef
```

## Yeni mahalle sayfası ekleme

İlgili ilçenin `altSayfalar` dizisine ekle — rota, sitemap ve iç linkler
otomatik oluşur:

```ts
altSayfalar: [
  { slug: "ornek-mahalle", ad: "Örnek Mahalle", profil: "…o mahalleye özgü metin…" },
]
```

## Yapılanlar / Kalanlar

- [x] Proje iskeleti, tasarım sistemi, layout
- [x] Lead formu + WhatsApp/çağrı CTA + KVKK onayı
- [x] 39 ilçe + 9 mahalle sayfası, farklılaştırılmış içerik
- [x] Hurda fiyatları sayfası (veri yapısı hazır, rakamlar bekliyor)
- [x] JSON-LD (Service, FAQPage, BreadcrumbList, Organization), sitemap, robots
- [ ] Gerçek iletişim bilgileri ve fiyatlar
- [ ] Google Search Console + GA4 kurulumu
- [ ] Google Business Profile kararı (bkz. plan dosyası)
- [ ] Kalan mahalle sayfaları, hizmet türü sayfaları, blog

## Marka kimliği

| | |
|---|---|
| **Kısa marka** | Kozanlar Hurda — her yerde görünen isim, halk dili, ev müşterisi |
| **Resmî unvan** | Kozanlar Metal Geri Dönüşüm — yasal metinler, irsaliye, fabrika yazışmaları |
| **Ana domain** | kozanlarhurda.com *(müsait, alınacak)* |
| **Yedek domain** | kozanlarmetal.com *(müsait — alıp ana domaine yönlendir)* |

`-lar` kalıbı Türk hurda piyasasında "köklü aile firması" sinyali verir
(örn. piyasadaki "Arpacıklar Hurda Metal"). Aranan kurumsallık buradan geliyor.

⚠️ Yayına almadan önce TÜRKPATENT marka sorgusundan geçir.

## Saha araştırması bulguları (11 Eylül 2026)

Rakip ve müşteri yorumu taramasından çıkan, siteye işlenmiş kararlar:

- **Mesaj ekseni fiyat değil, indirme + şeffaf tartım.** Gerçek müşteri
  yorumlarında "iyi fiyat" neredeyse geçmiyor; şeffaf tartım, hız, anında
  nakit ve dürüstlük geçiyor. "En yüksek fiyat" ifadesi sadece firmaların
  kendi reklam metinlerinde var.
- **"İndirme dahil, üste para istemeyiz"** — sektörün en bilinen şikâyetine
  (hurdacının eşyayı indirmek için üste para istemesi) doğrudan cevap.
  Hiçbir rakip bunu yazmıyor. Ana ayrışma noktamız.
- **7/24 ayrıcalık değil**, sektör normu. Bunun yerine ölçülebilir varış
  süresi vaat ediliyor.
- **Fiyat sayfası artık zorunlu.** Ciddi rakip (ozkutlusan.com) her metal için
  ayrı sayfada günlük gerçek rakam yayınlıyor. `data/fiyatlar.ts` doldurulmadan
  yayına çıkmak bu alanda kayıp demek.
- **Rakibin zayıf noktası derinlik.** 81 ile yayılmış, ilçe sayfaları düz link
  listesi. Bizim ilçe–mahalle içeriğimiz tam o boşluğa oturuyor.

Tam rapor: oturumdaki "Hurda Pazarı Saha Notları" artifact'i.
