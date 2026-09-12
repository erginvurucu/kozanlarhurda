import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { yazilar } from "@/data/rehber";
import { ilceler, tumMahalleRotalari } from "@/data/ilceler";

export default function sitemap(): MetadataRoute.Sitemap {
  const simdi = new Date();

  const sabit: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: simdi, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/hurda-fiyatlari`,
      lastModified: simdi,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${site.url}/bolgeler`,
      lastModified: simdi,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/kurumsal`,
      lastModified: simdi,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${site.url}/rehber`,
      lastModified: simdi,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...yazilar.map((y) => ({
      url: `${site.url}/rehber/${y.slug}`,
      lastModified: new Date(y.tarih),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${site.url}/kvkk`, lastModified: simdi, priority: 0.2 },
    { url: `${site.url}/gizlilik`, lastModified: simdi, priority: 0.2 },
  ];

  const ilceRotalari: MetadataRoute.Sitemap = ilceler.map((i) => ({
    url: `${site.url}/${i.slug}`,
    lastModified: simdi,
    changeFrequency: "monthly",
    priority: i.oncelik ? 0.9 : 0.7,
  }));

  const mahalleRotalari: MetadataRoute.Sitemap = tumMahalleRotalari().map((r) => ({
    url: `${site.url}/${r.ilce}/${r.mahalle}`,
    lastModified: simdi,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...sabit, ...ilceRotalari, ...mahalleRotalari];
}
