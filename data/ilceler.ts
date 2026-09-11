import type { Ilce, Mahalle } from "./types";
import { oncelikliIlceler } from "./oncelikli";
import { avrupaIlceleri } from "./avrupa";
import { anadoluIlceleri } from "./anadolu";

export type { Ilce, Mahalle };

/** Tum Istanbul ilceleri (39). */
export const ilceler: Ilce[] = [
  ...oncelikliIlceler,
  ...avrupaIlceleri,
  ...anadoluIlceleri,
].sort((a, b) => a.ad.localeCompare(b.ad, "tr"));

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
