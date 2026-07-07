import Call2ConfirmLanding from "@/components/call2confirm-landing";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment vous transmettre mes commandes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous définissons le format le plus simple : Google Sheets, export de plateforme, fichier structuré ou intégration avancée selon votre volume.",
      },
    },
    {
      "@type": "Question",
      name: "En combien de temps mes commandes sont-elles confirmées ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le délai dépend du volume et des horaires convenus. L’objectif est de traiter rapidement les commandes avant expédition.",
      },
    },
    {
      "@type": "Question",
      name: "Travaillez-vous en darija, français et arabe ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Les appels peuvent être adaptés à la langue du client et au ton de votre marque.",
      },
    },
    {
      "@type": "Question",
      name: "Comment sont facturés vos services ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La facturation peut être adaptée au volume : par commande traitée, par forfait ou selon un accord mensuel.",
      },
    },
    {
      "@type": "Question",
      name: "Mes données clients sont-elles protégées ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Les données reçues servent uniquement à la confirmation et au suivi convenu, avec confidentialité et minimisation des accès.",
      },
    },
    {
      "@type": "Question",
      name: "La formation est-elle en présentiel ou à distance ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le format peut être adapté selon les besoins : sessions pratiques, accompagnement d’équipe, simulations et évaluation terrain.",
      },
    },
  ],
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "CALL2CONFIRM",
  slogan: "La qualité au bout du fil",
  description:
    "Service professionnel de confirmation téléphonique des commandes COD au Maroc, qualification des clients, reporting et formation de confirmatrices e-commerce.",
  telephone: "+212777066590",
  areaServed: {
    "@type": "Country",
    name: "Morocco",
  },
  url: "https://call2confirm.ma",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212777066590",
    contactType: "customer service",
    availableLanguage: ["French", "Arabic", "Darija"],
  },
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Call2ConfirmLanding />
    </>
  );
}
