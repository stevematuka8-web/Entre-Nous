export type ServiceCategory =
  | "Intelligence artificielle"
  | "Développement web & mobile"
  | "Solutions SaaS"
  | "Transformation numérique"
  | "Intégration API"
  | "Produits numériques"
  | "Produits physiques"
  | "Services professionnels"
  | "Commerce"
  | "Artisanat";

export type ServiceSpace = "digital" | "marketplace";

export interface PortfolioItem {
  title: string;
  cover: string;
}

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  space: ServiceSpace;
  provider: string;
  providerRole: string;
  price: string;
  rating: number;
  reviews: number;
  cover: string;
  description: string;
  /** Long description shown on the detail page. */
  fullDescription?: string;
  deliveryTime?: string;
  providerBio?: string;
  providerLocation?: string;
  providerSince?: string;
  providerCompleted?: number;
  commissionRate?: string;
  portfolio?: PortfolioItem[];
}

export const services: Service[] = [
  {
    id: "ia-agent-support",
    title: "Agent IA pour support client 24/7",
    category: "Intelligence artificielle",
    space: "digital",
    provider: "Léa Kouadio",
    providerRole: "Développeuse IA freelance",
    price: "à partir de 890 €",
    rating: 4.9,
    reviews: 37,
    cover: "linear-gradient(135deg,#8b5cf6,#5b21b6)",
    description:
      "Mise en place d'un agent conversationnel entraîné sur vos données, intégré à votre site ou votre CRM en moins de deux semaines.",
    fullDescription:
      "Je conçois un agent conversationnel sur mesure, entraîné sur vos documents, votre FAQ et votre ton de marque. L'agent est connecté à votre site, votre CRM ou votre messagerie, et peut escalader vers un humain quand c'est nécessaire. Livré avec un tableau de suivi des conversations et des statistiques de résolution.",
    deliveryTime: "10 à 14 jours",
    providerBio:
      "Développeuse IA freelance depuis 5 ans, spécialisée en agents conversationnels et intégration LLM pour PME et startups.",
    providerLocation: "Lyon, France — à distance",
    providerSince: "Membre depuis 2022",
    providerCompleted: 64,
    commissionRate: "jusqu'à 8%",
    portfolio: [
      { title: "Agent support — e-commerce mode", cover: "linear-gradient(135deg,#8b5cf6,#3b0764)" },
      { title: "Assistant devis — BTP", cover: "linear-gradient(135deg,#a78bfa,#5b21b6)" },
      { title: "Bot FAQ — SaaS RH", cover: "linear-gradient(135deg,#c4b5fd,#7c3aed)" },
    ],
  },
  {
    id: "ia-workflow-automation",
    title: "Automatisation de workflows avec IA",
    category: "Intelligence artificielle",
    space: "digital",
    provider: "Karim Belhadj",
    providerRole: "Automaticien no-code & IA",
    price: "à partir de 650 €",
    rating: 4.8,
    reviews: 26,
    cover: "linear-gradient(135deg,#5b21b6,#8b5cf6)",
    description:
      "Connectez vos outils et laissez l'IA traiter vos tâches répétitives : tri d'emails, génération de rapports, relances automatiques.",
    fullDescription:
      "J'analyse vos process actuels et je construis des automatisations connectant vos outils (CRM, emailing, tableurs) avec des étapes IA pour trier, résumer ou générer du contenu automatiquement. Objectif : vous faire gagner plusieurs heures par semaine, avec une documentation claire pour votre équipe.",
    deliveryTime: "5 à 8 jours",
    providerBio:
      "Automaticien indépendant, ancien chef de projet digital, j'aide les PME à automatiser leurs tâches répétitives sans développement lourd.",
    providerLocation: "Bordeaux, France — à distance",
    providerSince: "Membre depuis 2023",
    providerCompleted: 38,
    commissionRate: "jusqu'à 8%",
    portfolio: [
      { title: "Tri automatique de leads", cover: "linear-gradient(135deg,#fb7a2a,#5b21b6)" },
      { title: "Reporting hebdo automatisé", cover: "linear-gradient(135deg,#8b5cf6,#fb7a2a)" },
    ],
  },
  {
    id: "app-mobile-mvp",
    title: "MVP application mobile iOS & Android",
    category: "Développement web & mobile",
    space: "digital",
    provider: "Studio Nova",
    providerRole: "Agence produit",
    price: "sur devis",
    rating: 4.8,
    reviews: 52,
    cover: "linear-gradient(135deg,#fb7a2a,#8b5cf6)",
    description:
      "Conception et développement d'un MVP natif, du wireframe au déploiement sur les stores, avec design system inclus.",
    fullDescription:
      "Nous accompagnons les porteurs de projet de l'idée au store : ateliers de cadrage, wireframes, design system, développement React Native, tests et mise en ligne sur l'App Store et le Play Store. Un interlocuteur unique du début à la fin.",
    deliveryTime: "4 à 8 semaines",
    providerBio:
      "Agence produit de 6 personnes, spécialisée en MVP mobile pour startups early-stage. Plus de 40 applications lancées.",
    providerLocation: "Nantes, France",
    providerSince: "Membre depuis 2021",
    providerCompleted: 41,
    commissionRate: "jusqu'à 6%",
    portfolio: [
      { title: "App mobilité urbaine", cover: "linear-gradient(135deg,#fb7a2a,#8b5cf6)" },
      { title: "App fitness communautaire", cover: "linear-gradient(135deg,#8b5cf6,#ffb37a)" },
      { title: "Marketplace de seconde main", cover: "linear-gradient(135deg,#5b21b6,#fb7a2a)" },
    ],
  },
  {
    id: "site-vitrine-nextjs",
    title: "Site vitrine Next.js haute performance",
    category: "Développement web & mobile",
    space: "digital",
    provider: "Yasmine Ortiz",
    providerRole: "Développeuse front-end",
    price: "à partir de 980 €",
    rating: 4.9,
    reviews: 33,
    cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)",
    description:
      "Site vitrine rapide, animé et optimisé SEO, livré avec un espace d'administration simple pour modifier vos contenus.",
    fullDescription:
      "Je développe des sites vitrines sur-mesure avec Next.js et Tailwind : design soigné, animations légères, performance maximale et bonnes pratiques SEO. Un espace d'administration simple vous permet de modifier textes et images sans toucher au code.",
    deliveryTime: "2 à 3 semaines",
    providerBio:
      "Développeuse front-end freelance, 7 ans d'expérience, ex-agence digitale. J'aime les interfaces propres et rapides.",
    providerLocation: "Toulouse, France — à distance",
    providerSince: "Membre depuis 2022",
    providerCompleted: 57,
    commissionRate: "jusqu'à 8%",
    portfolio: [
      { title: "Vitrine cabinet d'architecte", cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)" },
      { title: "Landing page SaaS B2B", cover: "linear-gradient(135deg,#8b5cf6,#5b21b6)" },
    ],
  },
  {
    id: "saas-dashboard",
    title: "Tableau de bord SaaS sur mesure",
    category: "Solutions SaaS",
    space: "digital",
    provider: "Yann Picard",
    providerRole: "Développeur full-stack",
    price: "à partir de 1 400 €",
    rating: 5,
    reviews: 21,
    cover: "linear-gradient(135deg,#5b21b6,#fb7a2a)",
    description:
      "Dashboard temps réel avec authentification, rôles multiples et visualisation de données, prêt pour la production.",
    fullDescription:
      "Développement d'un tableau de bord SaaS complet : authentification, gestion des rôles, graphiques temps réel et export de données. Architecture pensée pour scaler, code livré propre et documenté, avec passation technique incluse.",
    deliveryTime: "3 à 5 semaines",
    providerBio:
      "Développeur full-stack indépendant, spécialisé en applications SaaS B2B depuis 8 ans.",
    providerLocation: "Paris, France — à distance",
    providerSince: "Membre depuis 2020",
    providerCompleted: 72,
    commissionRate: "jusqu'à 6%",
    portfolio: [
      { title: "Dashboard analytics e-commerce", cover: "linear-gradient(135deg,#5b21b6,#fb7a2a)" },
      { title: "Back-office gestion de stock", cover: "linear-gradient(135deg,#8b5cf6,#a78bfa)" },
      { title: "Dashboard RH multi-équipes", cover: "linear-gradient(135deg,#fb7a2a,#5b21b6)" },
    ],
  },
  {
    id: "api-integration",
    title: "Intégration API paiement & CRM",
    category: "Intégration API",
    space: "digital",
    provider: "Connective",
    providerRole: "Collectif d'intégrateurs",
    price: "à partir de 650 €",
    rating: 4.7,
    reviews: 18,
    cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)",
    description:
      "Connexion fiable entre vos outils existants : paiement, CRM, ERP, avec documentation et tests automatisés.",
    fullDescription:
      "Nous connectons vos outils métier entre eux : paiement, CRM, ERP, facturation. Chaque intégration est testée automatiquement et documentée, avec un plan de reprise en cas d'incident. Idéal pour fiabiliser des process déjà en place.",
    deliveryTime: "1 à 3 semaines",
    providerBio:
      "Collectif de 4 intégrateurs spécialisés API, issus du monde fintech. Nous privilégions la fiabilité avant tout.",
    providerLocation: "Lille, France — à distance",
    providerSince: "Membre depuis 2023",
    providerCompleted: 25,
    commissionRate: "jusqu'à 7%",
    portfolio: [
      { title: "Intégration Stripe + CRM", cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)" },
      { title: "Synchronisation ERP ↔ e-commerce", cover: "linear-gradient(135deg,#8b5cf6,#fb7a2a)" },
    ],
  },
  {
    id: "transfo-numerique",
    title: "Accompagnement transformation numérique",
    category: "Transformation numérique",
    space: "digital",
    provider: "Awa Diallo",
    providerRole: "Consultante digitale",
    price: "sur devis",
    rating: 4.9,
    reviews: 29,
    cover: "linear-gradient(135deg,#8b5cf6,#fb7a2a)",
    description:
      "Audit, feuille de route et accompagnement du changement pour digitaliser vos process pas à pas.",
    fullDescription:
      "J'accompagne les PME et associations dans leur transformation numérique : audit des outils actuels, feuille de route priorisée, formation des équipes et suivi de la mise en œuvre. Une approche pragmatique, étape par étape.",
    deliveryTime: "Accompagnement 1 à 3 mois",
    providerBio:
      "Consultante digitale depuis 10 ans, ancienne responsable transformation dans un grand groupe, aujourd'hui indépendante.",
    providerLocation: "Marseille, France",
    providerSince: "Membre depuis 2021",
    providerCompleted: 33,
    commissionRate: "jusqu'à 5%",
    portfolio: [
      { title: "Digitalisation d'une PME de 40 salariés", cover: "linear-gradient(135deg,#8b5cf6,#fb7a2a)" },
      { title: "Feuille de route numérique — association", cover: "linear-gradient(135deg,#5b21b6,#a78bfa)" },
    ],
  },
  {
    id: "produit-numerique-uikit",
    title: "Pack UI Kit futuriste pour Figma",
    category: "Produits numériques",
    space: "digital",
    provider: "Atelier Oria",
    providerRole: "Studio de design",
    price: "49 €",
    rating: 4.8,
    reviews: 71,
    cover: "linear-gradient(135deg,#fb7a2a,#a78bfa)",
    description:
      "Un kit de composants prêts à l'emploi, style sombre et néon, pour lancer vos maquettes SaaS en quelques heures.",
    fullDescription:
      "Un fichier Figma complet avec plus de 120 composants : navigation, cartes, formulaires, tableaux de bord, dans un style sombre et futuriste. Variables de couleurs modifiables en un clic pour l'adapter à votre marque.",
    deliveryTime: "Livraison immédiate",
    providerBio:
      "Studio de design spécialisé en identité visuelle et design system pour le digital.",
    providerLocation: "Remote",
    providerSince: "Membre depuis 2022",
    providerCompleted: 112,
    commissionRate: "jusqu'à 10%",
    portfolio: [
      { title: "UI Kit — version claire", cover: "linear-gradient(135deg,#ffb37a,#fb7a2a)" },
      { title: "UI Kit — version sombre", cover: "linear-gradient(135deg,#5b21b6,#fb7a2a)" },
    ],
  },
  {
    id: "identite-visuelle",
    title: "Identité visuelle & design system",
    category: "Services professionnels",
    space: "marketplace",
    provider: "Atelier Oria",
    providerRole: "Studio de design",
    price: "à partir de 790 €",
    rating: 4.8,
    reviews: 44,
    cover: "linear-gradient(135deg,#fb7a2a,#ffb37a)",
    description:
      "Logo, charte graphique et déclinaisons prêtes à l'emploi pour une marque cohérente sur tous les supports.",
    fullDescription:
      "Je conçois une identité visuelle complète : logo, palette, typographies, et un mini design system pour décliner votre marque sur tous vos supports (site, réseaux, print). Livraison avec fichiers sources et guide d'utilisation.",
    deliveryTime: "2 à 3 semaines",
    providerBio:
      "Studio de design spécialisé en identité visuelle pour indépendants et petites entreprises.",
    providerLocation: "Remote",
    providerSince: "Membre depuis 2022",
    providerCompleted: 58,
    commissionRate: "jusqu'à 10%",
    portfolio: [
      { title: "Identité — café de quartier", cover: "linear-gradient(135deg,#fb7a2a,#ffb37a)" },
      { title: "Identité — marque de cosmétique", cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)" },
    ],
  },
  {
    id: "artisanat-boutique",
    title: "Pièces artisanales en édition limitée",
    category: "Artisanat",
    space: "marketplace",
    provider: "Maison Verrier",
    providerRole: "Artisan indépendant",
    price: "dès 45 €",
    rating: 4.9,
    reviews: 63,
    cover: "linear-gradient(135deg,#5b21b6,#a78bfa)",
    description:
      "Objets faits main, production limitée, livraison suivie partout en France et en Europe.",
    fullDescription:
      "Chaque pièce est soufflée et façonnée à la main dans mon atelier, en série très limitée. Vases, luminaires et objets de décoration, pensés pour durer et se transmettre. Livraison soignée et suivie.",
    deliveryTime: "5 à 10 jours",
    providerBio:
      "Artisan verrier indépendant depuis 12 ans, formé aux techniques traditionnelles du verre soufflé.",
    providerLocation: "Biot, France",
    providerSince: "Membre depuis 2021",
    providerCompleted: 210,
    commissionRate: "jusqu'à 10%",
    portfolio: [
      { title: "Collection Vases Oria", cover: "linear-gradient(135deg,#5b21b6,#a78bfa)" },
      { title: "Suspensions en verre soufflé", cover: "linear-gradient(135deg,#8b5cf6,#5b21b6)" },
    ],
  },
  {
    id: "conciergerie-business",
    title: "Service de conciergerie pour professionnels",
    category: "Services professionnels",
    space: "marketplace",
    provider: "Bastien Roux",
    providerRole: "Prestataire indépendant",
    price: "à partir de 120 €/jour",
    rating: 4.6,
    reviews: 15,
    cover: "linear-gradient(135deg,#fb7a2a,#5b21b6)",
    description:
      "Organisation d'événements professionnels, logistique et mise en relation avec des fournisseurs locaux de confiance.",
    fullDescription:
      "J'organise vos événements professionnels de A à Z : recherche de lieu, traiteurs, prestataires techniques, logistique le jour J. Un seul interlocuteur, un réseau de fournisseurs locaux de confiance.",
    deliveryTime: "Selon l'événement",
    providerBio:
      "Ancien responsable événementiel en entreprise, indépendant depuis 4 ans, réseau de confiance dans toute la région.",
    providerLocation: "Lyon, France",
    providerSince: "Membre depuis 2023",
    providerCompleted: 19,
    commissionRate: "jusqu'à 7%",
    portfolio: [
      { title: "Séminaire d'entreprise — 80 personnes", cover: "linear-gradient(135deg,#fb7a2a,#5b21b6)" },
      { title: "Lancement produit — showroom", cover: "linear-gradient(135deg,#8b5cf6,#fb7a2a)" },
    ],
  },
  {
    id: "mobilier-design",
    title: "Mobilier design fait main",
    category: "Produits physiques",
    space: "marketplace",
    provider: "Atelier Bois & Lin",
    providerRole: "Ébéniste indépendant",
    price: "à partir de 320 €",
    rating: 4.9,
    reviews: 27,
    cover: "linear-gradient(135deg,#8b5cf6,#5b21b6)",
    description:
      "Meubles en bois massif conçus et fabriqués à la main, sur-mesure ou en petite série.",
    fullDescription:
      "Je dessine et fabrique des meubles en bois massif dans mon atelier : tables, étagères, assises. Chaque pièce peut être adaptée à vos dimensions et à vos finitions. Bois issus de forêts gérées durablement.",
    deliveryTime: "3 à 6 semaines",
    providerBio:
      "Ébéniste indépendant depuis 9 ans, formé aux Compagnons du Devoir, spécialisé en mobilier contemporain.",
    providerLocation: "Annecy, France",
    providerSince: "Membre depuis 2022",
    providerCompleted: 46,
    commissionRate: "jusqu'à 9%",
    portfolio: [
      { title: "Table à manger chêne massif", cover: "linear-gradient(135deg,#8b5cf6,#5b21b6)" },
      { title: "Étagère modulaire", cover: "linear-gradient(135deg,#a78bfa,#5b21b6)" },
    ],
  },
  {
    id: "presets-photo",
    title: "Pack de presets photo Lightroom",
    category: "Produits numériques",
    space: "marketplace",
    provider: "Camille Faure",
    providerRole: "Photographe & créatrice de contenu",
    price: "29 €",
    rating: 4.7,
    reviews: 95,
    cover: "linear-gradient(135deg,#fb7a2a,#a78bfa)",
    description:
      "30 presets professionnels pour sublimer vos photos en quelques clics, compatibles mobile et desktop.",
    fullDescription:
      "Un pack de 30 presets Lightroom testés sur des centaines de photos : portraits, voyage, lifestyle. Compatible avec l'application mobile et desktop. Inclut un guide d'installation et d'ajustement rapide.",
    deliveryTime: "Livraison immédiate",
    providerBio:
      "Photographe professionnelle et créatrice de contenu, j'aide les indépendants à avoir un feed cohérent.",
    providerLocation: "Remote",
    providerSince: "Membre depuis 2023",
    providerCompleted: 140,
    commissionRate: "jusqu'à 10%",
    portfolio: [
      { title: "Preset — Golden Hour", cover: "linear-gradient(135deg,#fb7a2a,#ffb37a)" },
      { title: "Preset — Moody Travel", cover: "linear-gradient(135deg,#5b21b6,#a78bfa)" },
    ],
  },
  {
    id: "epicerie-circuit-court",
    title: "Épicerie fine en circuit court",
    category: "Commerce",
    space: "marketplace",
    provider: "Maison Thym",
    providerRole: "Commerçante indépendante",
    price: "dès 12 €",
    rating: 4.8,
    reviews: 58,
    cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)",
    description:
      "Produits d'épicerie fine sélectionnés auprès de petits producteurs locaux, livrés chez vous ou en point relais.",
    fullDescription:
      "Je sélectionne des produits d'épicerie fine (conserves, condiments, douceurs) auprès de petits producteurs locaux. Paniers composés ou à la carte, livraison chez vous ou en point relais partenaire.",
    deliveryTime: "2 à 4 jours",
    providerBio:
      "Ancienne restauratrice, je mets aujourd'hui en avant les producteurs locaux que j'ai découverts au fil des années.",
    providerLocation: "Avignon, France",
    providerSince: "Membre depuis 2022",
    providerCompleted: 320,
    commissionRate: "jusqu'à 8%",
    portfolio: [
      { title: "Panier découverte", cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)" },
      { title: "Coffret cadeau gourmand", cover: "linear-gradient(135deg,#fb7a2a,#ffb37a)" },
    ],
  },
  {
    id: "coaching-independants",
    title: "Coaching business pour indépendants",
    category: "Services professionnels",
    space: "marketplace",
    provider: "Nadia Ferreira",
    providerRole: "Coach business certifiée",
    price: "à partir de 90 €/séance",
    rating: 4.9,
    reviews: 41,
    cover: "linear-gradient(135deg,#5b21b6,#fb7a2a)",
    description:
      "Accompagnement individuel pour structurer votre activité, clarifier votre offre et trouver vos premiers clients.",
    fullDescription:
      "J'accompagne les indépendants et créateurs d'entreprise à structurer leur offre, clarifier leur positionnement et mettre en place une stratégie concrète pour trouver leurs premiers clients. Séances individuelles en visio.",
    deliveryTime: "Séances hebdomadaires",
    providerBio:
      "Coach business certifiée, ancienne entrepreneuse, j'accompagne les indépendants depuis 6 ans.",
    providerLocation: "Remote",
    providerSince: "Membre depuis 2021",
    providerCompleted: 97,
    commissionRate: "jusqu'à 6%",
    portfolio: [
      { title: "Programme 'Premiers clients en 90 jours'", cover: "linear-gradient(135deg,#5b21b6,#fb7a2a)" },
      { title: "Atelier positionnement d'offre", cover: "linear-gradient(135deg,#8b5cf6,#a78bfa)" },
    ],
  },
  {
    id: "bijoux-argent-recycle",
    title: "Bijoux artisanaux en argent recyclé",
    category: "Artisanat",
    space: "marketplace",
    provider: "Atelier Lune",
    providerRole: "Bijoutière indépendante",
    price: "dès 38 €",
    rating: 4.9,
    reviews: 86,
    cover: "linear-gradient(135deg,#fb7a2a,#5b21b6)",
    description:
      "Bijoux façonnés à la main à partir d'argent recyclé, en pièces uniques ou petites séries.",
    fullDescription:
      "Je façonne chaque bijou à la main dans mon atelier, à partir d'argent recyclé. Bagues, boucles d'oreilles et colliers en pièces uniques ou petites séries, pour une consommation plus responsable sans compromis sur le style.",
    deliveryTime: "5 à 8 jours",
    providerBio:
      "Bijoutière indépendante depuis 7 ans, engagée dans une démarche de fabrication responsable.",
    providerLocation: "Rennes, France",
    providerSince: "Membre depuis 2022",
    providerCompleted: 180,
    commissionRate: "jusqu'à 10%",
    portfolio: [
      { title: "Collection Croissant de lune", cover: "linear-gradient(135deg,#fb7a2a,#5b21b6)" },
      { title: "Bagues empilables", cover: "linear-gradient(135deg,#a78bfa,#fb7a2a)" },
    ],
  },
];

export const digitalCategories: ServiceCategory[] = [
  "Intelligence artificielle",
  "Développement web & mobile",
  "Solutions SaaS",
  "Transformation numérique",
  "Intégration API",
  "Produits numériques",
];

export const marketplaceCategories: ServiceCategory[] = [
  "Produits physiques",
  "Produits numériques",
  "Services professionnels",
  "Commerce",
  "Artisanat",
];

export const digitalServices = services.filter((s) => s.space === "digital");
export const marketplaceServices = services.filter((s) => s.space === "marketplace");

export const popularServices = digitalServices.slice(0, 6);
export const popularMarketplaceServices = marketplaceServices.slice(0, 6);

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getRelatedServices(service: Service, max = 3): Service[] {
  const pool = services.filter((s) => s.space === service.space && s.id !== service.id);
  return pool
    .filter((s) => s.category === service.category)
    .concat(pool.filter((s) => s.category !== service.category))
    .slice(0, max);
}

export function slugifyProviderName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface ProviderProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  memberSince: string;
  completedProjects: number;
  rating: number;
  reviews: number;
  services: Service[];
  portfolio: PortfolioItem[];
}

export const providers: ProviderProfile[] = (() => {
  const byName = new Map<string, Service[]>();
  for (const service of services) {
    const list = byName.get(service.provider) ?? [];
    list.push(service);
    byName.set(service.provider, list);
  }

  return Array.from(byName.entries()).map(([name, list]) => {
    const [first] = list;
    const totalReviews = list.reduce((sum, s) => sum + s.reviews, 0);
    const rating =
      totalReviews > 0
        ? list.reduce((sum, s) => sum + s.rating * s.reviews, 0) / totalReviews
        : first.rating;
    const completedProjects = list.reduce(
      (sum, s) => sum + (s.providerCompleted ?? 0),
      0
    );
    const portfolio = list.flatMap((s) => s.portfolio ?? []);

    return {
      id: slugifyProviderName(name),
      name,
      role: first.providerRole,
      bio: first.providerBio ?? first.description,
      location: first.providerLocation ?? "Remote",
      memberSince: first.providerSince ?? "Nouveau membre",
      completedProjects,
      rating: Math.round(rating * 10) / 10,
      reviews: totalReviews,
      services: list,
      portfolio,
    };
  });
})();

export function getProviderById(id: string): ProviderProfile | undefined {
  return providers.find((p) => p.id === id);
}

export function getProviderIdForService(service: Service): string {
  return slugifyProviderName(service.provider);
}

export const opportunityRoles = [
  {
    key: "prestataire",
    title: "Prestataire",
    description:
      "Créez votre boutique, publiez vos services ou vos produits, et gérez vos clients depuis un seul tableau de bord.",
    accent: "violet" as const,
  },
  {
    key: "acheteur",
    title: "Acheteur",
    description:
      "Trouvez le bon service ou le bon produit en quelques clics, échangez directement avec les prestataires via Connect.",
    accent: "orange" as const,
  },
  {
    key: "apporteur",
    title: "Apporteur d'affaires",
    description:
      "Mettez en relation vendeurs et acheteurs, suivez vos opportunités et touchez une commission sur chaque affaire conclue.",
    accent: "violet" as const,
  },
];
