import type { ServiceCategory } from "@/lib/mock-data";

/**
 * Real photos for social-share previews (Open Graph), keyed by category.
 * The `cover` field on services/listings is a CSS gradient used for the
 * site's card UI, not an actual image, so it can't serve as an og:image.
 */
export const categoryImages: Record<ServiceCategory, string> = {
  "Intelligence artificielle": "/og/intelligence-artificielle.jpg",
  "Développement web & mobile": "/og/dev-web-mobile.jpg",
  "Solutions SaaS": "/og/solutions-saas.jpg",
  "Transformation numérique": "/og/transformation-numerique.jpg",
  "Intégration API": "/og/integration-api.jpg",
  "Produits numériques": "/og/produits-numeriques.jpg",
  "Produits physiques": "/og/produits-physiques.jpg",
  "Services professionnels": "/og/services-professionnels.jpg",
  Commerce: "/og/commerce.jpg",
  Artisanat: "/og/artisanat.jpg",
};
