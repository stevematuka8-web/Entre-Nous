import type { MetadataRoute } from "next";
import { digitalServices, marketplaceServices, providers } from "@/lib/mock-data";

const SITE_URL = "https://www.entre-nous.shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/digital",
    "/marketplace",
    "/business",
    "/connect",
    "/a-propos",
    "/aide",
    "/conditions",
    "/confidentialite",
    "/mentions-legales",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const digitalRoutes = digitalServices.map((service) => ({
    url: `${SITE_URL}/digital/${service.id}`,
    lastModified: new Date(),
  }));

  const marketplaceRoutes = marketplaceServices.map((service) => ({
    url: `${SITE_URL}/marketplace/${service.id}`,
    lastModified: new Date(),
  }));

  const profileRoutes = providers.map((provider) => ({
    url: `${SITE_URL}/profil/${provider.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...digitalRoutes, ...marketplaceRoutes, ...profileRoutes];
}
