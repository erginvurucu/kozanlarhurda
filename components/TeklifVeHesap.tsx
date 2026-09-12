import { fiyatGruplari } from "@/data/fiyatlar";
import { usdKuru, tlyeCevir } from "@/lib/kur";
import { LeadForm } from "./LeadForm";
import {
  HesapMakinesi,
  HesapMakinesiBos,
  type HesapGrubu,
} from "./HesapMakinesi";

/**
 * Teklif formu ile hesap makinesini yan yana veren bolum.
 *
 * Fiyat cevirisi sunucuda yapilir; istemciye TL degerleri gider.
 * Boylece kur cagrisi tarayiciya tasinmaz ve USD marjlari disari sizmaz.
 */
export async function TeklifVeHesap({ varsayilanIlce }: { varsayilanIlce?: string }) {
  const kur = await usdKuru();

  const gruplar: HesapGrubu[] = fiyatGruplari
    .map((g) => ({
      kategori: g.baslik,
      kalemler: g.kalemler
        .filter((k) => k.usdMin !== null && k.usdMax !== null)
        .map((k) => ({
          ad: k.ad,
          birim: k.birim,
          alt: tlyeCevir(k.usdMin as number, kur.usd),
          ust: tlyeCevir(k.usdMax as number, kur.usd),
        })),
    }))
    .filter((g) => g.kalemler.length > 0);

  return (
    <section className="zemin-kareli-koyu" aria-labelledby="teklif-hesap-baslik">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="teklif-hesap-baslik" className="sr-only">
          Teklif formu ve fiyat hesaplama
        </h2>

        {/* items-stretch (varsayılan): iki kart aynı yükseklikte kalsın.
            Hesap makinesi fiyat girilmeden kısa olduğu için items-start
            sağda boşluk bırakıyordu. */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div id="teklif" className="scroll-mt-24">
            <LeadForm varsayilanIlce={varsayilanIlce} />
          </div>

          <div id="hesapla" className="scroll-mt-24">
            {gruplar.length > 0 ? (
              <HesapMakinesi gruplar={gruplar} kurTarihi={kur.tarih} />
            ) : (
              <HesapMakinesiBos />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
