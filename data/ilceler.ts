import type { Ilce, Mahalle, Sehir } from "./types";
import { oncelikliIlceler } from "./oncelikli";
import { avrupaIlceleri } from "./avrupa";
import { anadoluIlceleri } from "./anadolu";
import { trakyaIlceleri } from "./trakya";

export type { Ilce, Mahalle, Sehir };

/**
 * Hizmet verilen tum ilceler.
 * Istanbul 39 ilce + Trakya'nin sanayi ilceleri (Tekirdag, Kirklareli).
 */
export const ilceler: Ilce[] = [
  ...oncelikliIlceler,
  ...avrupaIlceleri,
  ...anadoluIlceleri,
  ...trakyaIlceleri,
].sort((a, b) => a.ad.localeCompare(b.ad, "tr"));

/** Ilcenin ilini verir; belirtilmemisse Istanbul. */
export const sehri = (i: Ilce): Sehir => i.sehir ?? "İstanbul";

export const sehreGore = (sehir: Sehir) =>
  ilceler.filter((i) => sehri(i) === sehir);

/** Menu ve footer icin il sirasi. */
export const sehirler: Sehir[] = ["İstanbul", "Tekirdağ", "Kırklareli"];

export const ilceBul = (slug: string) => ilceler.find((i) => i.slug === slug);

export const mahalleBul = (ilceSlug: string, mahalleSlug: string) =>
  ilceBul(ilceSlug)?.altSayfalar?.find((m) => m.slug === mahalleSlug);

/** Sitemap ve generateStaticParams icin tum mahalle rotalari. */
export const tumMahalleRotalari = () =>
  ilceler.flatMap((i) =>
    (i.altSayfalar ?? []).map((m) => ({ ilce: i.slug, mahalle: m.slug }))
  );

export const oncelikliler = () => ilceler.filter((i) => i.oncelik);

export const yakayaGore = (yaka: "avrupa" | "anadolu") =>
  ilceler.filter((i) => i.yaka === yaka);
