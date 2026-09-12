import type { Metadata } from "next";
import { site } from "@/lib/site";
import { YasalMetin, Bolum } from "@/components/YasalMetin";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
  robots: { index: true, follow: true },
};

export default function KvkkSayfasi() {
  return (
    <YasalMetin baslik="KVKK Aydınlatma Metni" guncelleme="2026-09-11">
      {/* 
        ⚠️ Bu metin bir sablondur. Yayina almadan once:
        - Veri sorumlusu unvani, adresi ve vergi bilgileri doldurulmali
        - Lead aktarilan firmalar netlestirilmeli
        - Bir avukata kontrol ettirilmeli
        - VERBIS kayit yukumlulugu (calisan sayisi / ciro esigi) degerlendirilmeli
      */}
      <p className="rounded-sm bg-kurum-50 p-4 text-sm">
        Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (&quot;KVKK&quot;) uyarınca hazırlanmıştır.
      </p>

      <Bolum baslik="1. Veri Sorumlusu">
        <p>
          Kişisel verileriniz, veri sorumlusu sıfatıyla {site.legalName}{" "}
          tarafından aşağıda açıklanan kapsamda işlenmektedir.
        </p>
        <p className="text-sm text-kurum-500">
          İletişim: {site.email} · {site.phoneDisplay}
        </p>
      </Bolum>

      <Bolum baslik="2. İşlenen Kişisel Veriler">
        <p>
          Sitemizdeki talep formu aracılığıyla aşağıdaki veriler işlenmektedir:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Kimlik verisi: ad ve soyad</li>
          <li>İletişim verisi: telefon numarası</li>
          <li>Konum verisi: ilçe / bölge bilgisi</li>
          <li>
            Talep içeriği: hurda türü, tarafınızca iletilen görseller ve
            eklediğiniz notlar
          </li>
        </ul>
      </Bolum>

      <Bolum baslik="3. İşleme Amacı">
        <p>
          Verileriniz yalnızca; talebinizin değerlendirilmesi, size fiyat
          bilgisi verilmesi, randevu planlanması ve hizmetin yerine getirilmesi
          amacıyla işlenir. Bu amaçlar dışında kullanılmaz.
        </p>
      </Bolum>

      <Bolum baslik="4. Verilerin Aktarılması">
        <p>
          <strong>Önemli:</strong> Talebinizi karşılayabilmek için iletişim
          bilgileriniz ve talep detaylarınız, bulunduğunuz bölgede hizmet veren{" "}
          <strong>anlaşmalı hurda alım firmasına aktarılmaktadır.</strong> Bu
          aktarım, formu gönderirken verdiğiniz açık rızaya dayanır.
        </p>
        <p>
          Verileriniz bunun dışında üçüncü kişilerle paylaşılmaz, pazarlama
          amacıyla satılmaz veya devredilmez.
        </p>
      </Bolum>

      <Bolum baslik="5. Hukuki Sebep">
        <p>
          Kişisel verileriniz, KVKK md. 5/1 uyarınca <strong>açık rızanıza</strong>{" "}
          dayanılarak işlenmektedir. Rızanızı dilediğiniz zaman geri
          çekebilirsiniz.
        </p>
      </Bolum>

      <Bolum baslik="6. Saklama Süresi">
        <p>
          Verileriniz, talebinizin sonuçlanmasının ardından en fazla 12 ay
          süreyle saklanır ve bu sürenin sonunda silinir veya anonim hale
          getirilir.
        </p>
      </Bolum>

      <Bolum baslik="7. Haklarınız">
        <p>KVKK md. 11 uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Kişisel verinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Silinmesini veya yok edilmesini isteme</li>
          <li>Zararınız varsa giderilmesini talep etme</li>
        </ul>
        <p>
          Taleplerinizi{" "}
          <a href={`mailto:${site.email}`} className="font-medium underline">
            {site.email}
          </a>{" "}
          adresine iletebilirsiniz. Başvurunuz en geç 30 gün içinde
          sonuçlandırılır.
        </p>
      </Bolum>
    </YasalMetin>
  );
}
