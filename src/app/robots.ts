import type { MetadataRoute } from "next";

const SITE_URL = "https://www.entre-nous.shop";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/dashboard",
        "/compte",
        "/connexion",
        "/inscription",
        "/mot-de-passe-oublie",
        "/reinitialiser-mot-de-passe",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
