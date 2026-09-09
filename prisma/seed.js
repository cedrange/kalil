const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

function slug(text) {
  return slugify(text, { lower: true, strict: true, locale: "fr" });
}

const properties = [
  {
    title: "Villa moderne avec piscine à Kipé",
    type: "villa",
    transactionType: "vente",
    price: 1200000000,
    city: "Conakry",
    neighborhood: "Kipé",
    surface: 450,
    bedrooms: 5,
    bathrooms: 4,
    featured: true,
    description:
      "Magnifique villa neuve de standing, construite sur un terrain clôturé de 600 m², avec piscine, jardin paysager, garage double et groupe électrogène. Idéale pour une famille de la diaspora souhaitant s'installer ou investir à Conakry. Quartier calme et sécurisé, proche des grands axes.",
    images: [
      "https://picsum.photos/seed/kalil-villa-kipe-1/1200/800",
      "https://picsum.photos/seed/kalil-villa-kipe-2/1200/800",
      "https://picsum.photos/seed/kalil-villa-kipe-3/1200/800",
    ],
  },
  {
    title: "Appartement 3 pièces vue mer à Kaloum",
    type: "appartement",
    transactionType: "vente",
    price: 650000000,
    city: "Conakry",
    neighborhood: "Kaloum",
    surface: 120,
    bedrooms: 3,
    bathrooms: 2,
    featured: true,
    description:
      "Appartement lumineux au 4ème étage avec vue dégagée sur la mer, situé dans une résidence sécurisée avec ascenseur et parking privé. Proche des administrations, banques et commerces du centre-ville. Livré avec cuisine équipée et climatisation dans chaque pièce.",
    images: [
      "https://picsum.photos/seed/kalil-appart-kaloum-1/1200/800",
      "https://picsum.photos/seed/kalil-appart-kaloum-2/1200/800",
    ],
  },
  {
    title: "Terrain constructible à Dubréka",
    type: "terrain",
    transactionType: "vente",
    price: 180000000,
    city: "Dubréka",
    neighborhood: "Centre-ville",
    surface: 1000,
    featured: true,
    description:
      "Terrain plat de 1000 m² avec titre foncier en règle, situé à 5 minutes de la route nationale. Idéal pour projet résidentiel ou agricole. Zone en plein développement, accès facile à l'eau et à l'électricité. Documents disponibles pour vérification à distance.",
    images: [
      "https://picsum.photos/seed/kalil-terrain-dubreka-1/1200/800",
      "https://picsum.photos/seed/kalil-terrain-dubreka-2/1200/800",
    ],
  },
  {
    title: "Boutique commerciale au marché de Madina",
    type: "boutique",
    transactionType: "location",
    price: 3500000,
    city: "Conakry",
    neighborhood: "Madina",
    surface: 35,
    featured: false,
    description:
      "Local commercial idéalement situé au cœur du marché de Madina, fort passage piéton toute la journée. Rideau métallique, électricité triphasée, idéal pour commerce de détail, téléphonie ou textile. Loyer mensuel, caution de 3 mois exigée.",
    images: [
      "https://picsum.photos/seed/kalil-boutique-madina-1/1200/800",
      "https://picsum.photos/seed/kalil-boutique-madina-2/1200/800",
    ],
  },
  {
    title: "Maison familiale à Matam",
    type: "maison",
    transactionType: "vente",
    price: 420000000,
    city: "Conakry",
    neighborhood: "Matam",
    surface: 250,
    bedrooms: 4,
    bathrooms: 3,
    featured: false,
    description:
      "Maison de plain-pied entièrement carrelée, avec cour intérieure, cuisine extérieure et petit jardin. Quartier résidentiel calme, à proximité des écoles et centres de santé. Possibilité de rehausse pour un étage supplémentaire.",
    images: [
      "https://picsum.photos/seed/kalil-maison-matam-1/1200/800",
      "https://picsum.photos/seed/kalil-maison-matam-2/1200/800",
    ],
  },
  {
    title: "Terrain agricole à Kindia",
    type: "terrain",
    transactionType: "vente",
    price: 95000000,
    city: "Kindia",
    neighborhood: "Route de Mamou",
    surface: 5000,
    featured: false,
    description:
      "Vaste terrain de 5000 m² à vocation agricole, sol fertile, proche d'un point d'eau naturel. Convient pour plantation de fruitiers, maraîchage ou projet agro-industriel. Terrain immatriculé, arpentage disponible.",
    images: ["https://picsum.photos/seed/kalil-terrain-kindia-1/1200/800"],
  },
  {
    title: "Appartement meublé à louer à Ratoma",
    type: "appartement",
    transactionType: "location",
    price: 8000000,
    city: "Conakry",
    neighborhood: "Ratoma",
    surface: 90,
    bedrooms: 2,
    bathrooms: 2,
    featured: false,
    description:
      "Bel appartement meublé et climatisé, résidence avec gardiennage 24h/24, générateur de secours et forage d'eau. Idéal pour expatrié ou membre de la diaspora en séjour temporaire. Loyer mensuel payable en avance.",
    images: [
      "https://picsum.photos/seed/kalil-appart-ratoma-1/1200/800",
      "https://picsum.photos/seed/kalil-appart-ratoma-2/1200/800",
    ],
  },
  {
    title: "Immeuble de rapport à Labé",
    type: "immeuble",
    transactionType: "vente",
    price: 780000000,
    city: "Labé",
    neighborhood: "Centre-ville",
    surface: 300,
    bedrooms: 8,
    bathrooms: 6,
    featured: false,
    description:
      "Immeuble R+2 comprenant 6 appartements loués, situé en centre-ville de Labé. Bon rendement locatif, idéal pour investisseur cherchant un revenu passif stable. Vente motivée, documents en règle.",
    images: ["https://picsum.photos/seed/kalil-immeuble-labe-1/1200/800"],
  },
  {
    title: "Villa avec vue sur mer à Nongo",
    type: "villa",
    transactionType: "location",
    price: 15000000,
    city: "Conakry",
    neighborhood: "Nongo",
    surface: 380,
    bedrooms: 4,
    bathrooms: 4,
    featured: true,
    description:
      "Superbe villa en bord de mer avec grande terrasse, jardin tropical et accès direct à la plage. Résidence haut standing, idéale pour location saisonnière ou longue durée pour cadre ou diplomate.",
    images: [
      "https://picsum.photos/seed/kalil-villa-nongo-1/1200/800",
      "https://picsum.photos/seed/kalil-villa-nongo-2/1200/800",
    ],
  },
  {
    title: "Terrain viabilisé à Coyah",
    type: "terrain",
    transactionType: "vente",
    price: 65000000,
    city: "Coyah",
    neighborhood: "Sud",
    surface: 600,
    featured: false,
    description:
      "Terrain de 600 m² viabilisé (eau et électricité en bordure), dans un lotissement clôturé. Zone calme à 30 minutes de Conakry, parfait pour un premier projet de construction pour la diaspora.",
    images: ["https://picsum.photos/seed/kalil-terrain-coyah-1/1200/800"],
  },
];

const posts = [
  {
    title: "Guide 2026 : acheter un terrain en Guinée depuis l'Europe",
    excerpt:
      "Les étapes essentielles pour sécuriser l'achat d'un terrain en Guinée quand on vit à l'étranger : procuration, vérification du titre foncier, et accompagnement local.",
    content: `Acheter un terrain en Guinée lorsqu'on réside en Europe peut sembler complexe, mais avec les bonnes précautions, c'est tout à fait réalisable.

**1. Vérifier le titre foncier**
Avant tout engagement, faites vérifier le titre de propriété auprès de la Direction Nationale des Domaines et du Cadastre. Un acte de vente sans titre foncier clair expose à des litiges.

**2. Établir une procuration**
Si vous ne pouvez pas vous déplacer, une procuration notariée permet à une personne de confiance (avocat, notaire ou membre de la famille) de signer en votre nom.

**3. Passer par un professionnel local**
Faites-vous accompagner par une agence sérieuse ou un notaire qui pourra vérifier l'authenticité des documents et s'assurer que le terrain n'est pas grevé de litiges.

**4. Prévoir les frais annexes**
Frais de notaire, d'enregistrement et de bornage doivent être budgétisés en plus du prix d'achat.

Chez Kalil Immo, nous accompagnons la diaspora guinéenne à chaque étape, avec vérification des documents et visites filmées pour les acheteurs à distance.`,
    coverImage: "https://picsum.photos/seed/kalil-blog-terrain/1200/700",
  },
  {
    title: "Les documents indispensables pour un achat immobilier en Guinée",
    excerpt:
      "Titre foncier, permis de construire, certificat de non-litige : voici la liste des documents à exiger avant de finaliser un achat.",
    content: `Pour sécuriser votre investissement immobilier en Guinée, voici les documents à toujours demander et vérifier :

- **Titre Foncier (TF)** ou attestation de concession
- **Certificat de non-litige** délivré par les autorités locales
- **Plan de bornage** signé par un géomètre agréé
- **Reçus de paiement des taxes foncières**
- **Acte de vente précédent** (si le bien a déjà changé de propriétaire)

N'hésitez jamais à demander une copie de ces documents avant tout versement d'acompte, et faites-les vérifier par un notaire indépendant. Chez Kalil Immo, chaque bien publié sur notre plateforme est vérifié avant mise en ligne.`,
    coverImage: "https://picsum.photos/seed/kalil-blog-documents/1200/700",
  },
  {
    title: "Pourquoi investir dans l'immobilier à Conakry en 2026",
    excerpt:
      "Croissance démographique, nouveaux quartiers, infrastructures : les raisons qui font de Conakry un marché immobilier attractif pour la diaspora.",
    content: `Conakry connaît une croissance urbaine rapide, portée par l'exode rural et le retour progressif de la diaspora. Plusieurs facteurs rendent la capitale guinéenne attractive pour l'investissement immobilier :

**Une demande locative forte**
Avec l'arrivée de nombreuses entreprises et organisations internationales, la demande pour des logements de qualité ne cesse d'augmenter, notamment à Kipé, Nongo et Ratoma.

**De nouveaux axes routiers**
Les investissements dans les infrastructures routières désenclavent des zones auparavant difficiles d'accès, ouvrant de nouvelles opportunités foncières à des prix encore accessibles.

**Un ancrage affectif fort**
Pour beaucoup de membres de la diaspora, investir dans l'immobilier en Guinée est aussi une façon de préparer un retour au pays ou de sécuriser un patrimoine familial.

Notre équipe reste à votre disposition pour vous conseiller sur les meilleurs quartiers selon votre budget et vos objectifs.`,
    coverImage: "https://picsum.photos/seed/kalil-blog-conakry/1200/700",
  },
  {
    title: "Diaspora : comment gérer un projet immobilier à distance",
    excerpt:
      "Suivi de chantier, gestion locative, paiements sécurisés : nos conseils pratiques pour piloter votre bien depuis l'Europe.",
    content: `Gérer un bien immobilier en Guinée depuis l'Europe demande de l'organisation, mais plusieurs solutions existent :

**1. Faites appel à un gestionnaire local**
Un gestionnaire ou une agence peut s'occuper de la location, de l'entretien et de la collecte des loyers en votre absence.

**2. Demandez des comptes-rendus réguliers**
Photos, vidéos et rapports d'avancement pour le suivi de chantier sont essentiels pour garder le contrôle malgré la distance.

**3. Sécurisez vos paiements**
Privilégiez les virements bancaires traçables plutôt que les transferts informels, et exigez systématiquement un reçu pour chaque paiement effectué.

**4. Restez en contact avec un représentant de confiance**
Un membre de la famille ou un professionnel mandaté sur place peut représenter vos intérêts au quotidien.

Kalil Immo propose un service d'accompagnement pour la diaspora, du suivi de chantier à la gestion locative complète.`,
    coverImage: "https://picsum.photos/seed/kalil-blog-diaspora/1200/700",
  },
];

async function main() {
  console.log("Suppression des données existantes...");
  await prisma.contactMessage.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.blogPost.deleteMany();

  console.log("Création des biens immobiliers...");
  for (const p of properties) {
    const { images, ...data } = p;
    await prisma.property.create({
      data: {
        ...data,
        slug: slug(p.title),
        images: {
          create: images.map((url, i) => ({ url, position: i })),
        },
      },
    });
  }

  console.log("Création des articles de blog...");
  for (const post of posts) {
    await prisma.blogPost.create({
      data: {
        ...post,
        slug: slug(post.title),
      },
    });
  }

  console.log("Terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
