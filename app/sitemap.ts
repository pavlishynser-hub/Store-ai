import type { MetadataRoute } from "next";
import { getProductIds } from "@/lib/products";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurorabeauty.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const productEntries = getProductIds().map<MetadataRoute.Sitemap[number]>(
    (id) => ({
      url: `${siteUrl}/products/${id}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productEntries,
  ];
}
