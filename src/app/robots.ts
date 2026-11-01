import type { MetadataRoute } from "next";

const SITE_URL = "https://www.entre-nous.shop";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/compte", "/connexion", "/inscription"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
