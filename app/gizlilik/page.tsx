import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { YasalMetin, Bolum } from "@/components/YasalMetin";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Kişisel verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuza dair gizlilik politikamız.",
  alternates: { canonical: "/gizlilik" },
};

export default function GizlilikSayfasi() {
  return (
    <YasalMetin baslik="Gizlilik Politikası" guncelleme="2026-09-11">
      <Bolum baslik="Hangi bilgileri topluyoruz?">
        <p>
          Yalnızca talep formu aracılığıyla bize kendi isteğinizle ilettiğiniz
          bilgileri topluyoruz: adınız, telefon numaranız, bölgeniz, hurda türü
          ve varsa gönderdiğiniz fotoğraflar ile notlar.
        </p>
      </Bolum>

      <Bolum baslik="Bu bilgileri ne için kullanıyoruz?">
        <p>
          Sizi arayıp fiyat verebilmek ve randevu planlayabilmek için. Başka
          hiçbir amaçla kullanmıyoruz.
        </p>
      </Bolum>

      <Bolum baslik="Kimlerle paylaşıyoruz?">
        <p>
          Talebinizi karşılayabilmek için bölgenizdeki anlaşmalı hurda alım
          firmasıyla paylaşıyoruz. Bunun dışında hiçbir üçüncü tarafla
          paylaşmıyor, verilerinizi satmıyoruz. Ayrıntı için{" "}
          <Link href="/kvkk" className="font-medium underline">
            Aydınlatma Metni
          </Link>
          &apos;ne bakabilirsiniz.
        </p>
      </Bolum>

      <Bolum baslik="Çerezler">
        <p>
          Sitemiz çalışması için zorunlu olanlar dışında çerez kullanmaz. Ziyaret
          istatistiklerini ölçmek için analitik araç kullanılması durumunda, bu
          araçlar kimliğinizi tespit etmeye yönelik veri toplamayacak şekilde
          yapılandırılır.
        </p>
      </Bolum>

      <Bolum baslik="Verilerinizin güvenliği">
        <p>
          Form gönderimleri şifreli bağlantı (HTTPS) üzerinden iletilir.
          Verileriniz talebiniz sonuçlandıktan sonra en fazla 12 ay saklanır.
        </p>
      </Bolum>

      <Bolum baslik="İletişim">
        <p>
          Gizlilikle ilgili her türlü soru ve talebiniz için:{" "}
          <a href={`mailto:${site.email}`} className="font-medium underline">
            {site.email}
          </a>
        </p>
      </Bolum>
    </YasalMetin>
  );
}
