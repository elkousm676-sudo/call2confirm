"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: Record<string, unknown>) => void;
  }
}

type IconName =
  | "phone"
  | "package"
  | "truck"
  | "checklist"
  | "chart"
  | "headset"
  | "shield"
  | "training"
  | "alert"
  | "users"
  | "clock"
  | "lock"
  | "map"
  | "whatsapp"
  | "message"
  | "target"
  | "document"
  | "spark";

type FormState = "idle" | "loading" | "success" | "error";

const phoneNumber = "+212777066590";
const displayPhone = "0 777 066 590";
const whatsappBase = "https://wa.me/212777066590";

const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Formation", href: "#formation" },
  { label: "Méthode", href: "#methode" },
  { label: "Avantages", href: "#avantages" },
  { label: "Contact", href: "#contact" },
];

const proofItems = [
  "Taux de livraison à améliorer avant départ",
  "Reporting clair et quotidien",
  "Équipe formée au terrain marocain",
];

const problemCards = [
  "Clients injoignables",
  "Commandes non sérieuses",
  "Adresses incomplètes",
  "Retours fréquents",
  "Frais de livraison perdus",
  "Manque de suivi",
  "Confirmations expédiées sans méthode",
  "Aucune analyse des causes d’échec",
];

const keyStats = [
  {
    value: "100",
    suffix: "%",
    label: "des appels traités sont classés",
    detail: "Confirmé, à rappeler, injoignable, annulé, douteux ou à vérifier.",
  },
  {
    value: "5",
    suffix: " étapes",
    label: "pour sécuriser la commande",
    detail: "Réception, appel, vérification, classification puis rapport.",
  },
  {
    value: "6",
    suffix: " statuts",
    label: "pour suivre vos commandes",
    detail: "Une lecture simple de ce qui avance, bloque ou doit être relancé.",
  },
  {
    value: "0",
    suffix: " chiffre inventé",
    label: "promesse transparente",
    detail: "Votre diagnostic mesure vos vrais volumes, motifs et pertes réelles.",
  },
];

const services = [
  {
    icon: "phone" as IconName,
    title: "Confirmation des commandes",
    text: "Nous contactons vos clients pour confirmer produit, quantité, adresse, ville, disponibilité et intention réelle d’achat.",
  },
  {
    icon: "target" as IconName,
    title: "Qualification des clients",
    text: "Nous distinguons les commandes sérieuses des commandes douteuses pour éviter les expéditions inutiles.",
  },
  {
    icon: "map" as IconName,
    title: "Correction des informations",
    text: "Adresse, téléphone, ville, disponibilité et remarques de livraison sont vérifiés puis corrigés.",
  },
  {
    icon: "checklist" as IconName,
    title: "Suivi des commandes",
    text: "Chaque appel est classé : confirmé, à rappeler, injoignable, annulé, douteux ou à vérifier.",
  },
  {
    icon: "chart" as IconName,
    title: "Reporting et analyse",
    text: "Vous recevez un retour clair sur la qualité des commandes, les motifs d’annulation et les points à améliorer.",
  },
  {
    icon: "users" as IconName,
    title: "Accompagnement des vendeurs",
    text: "Nous vous aidons à comprendre les causes des échecs de livraison et à améliorer votre processus commercial.",
  },
];

const trainingObjectives = [
  "Maîtriser les scripts de confirmation",
  "Savoir poser les bonnes questions",
  "Améliorer la qualité de l’échange client",
  "Réduire les erreurs d’adresse",
  "Identifier les commandes à risque",
  "Savoir relancer sans déranger",
  "Remonter une information claire au vendeur",
  "Être opérationnelle rapidement sur le terrain",
];

const trainingFormats = [
  "Formation théorique",
  "Jeux de rôle",
  "Scripts pratiques",
  "Simulation d’appels réels",
  "Suivi de performance",
  "Évaluation terrain",
];

const trainingModules = [
  "Les bases de la confirmation téléphonique",
  "Le langage professionnel avec le client",
  "La gestion des objections",
  "La vérification des informations de livraison",
  "La détection des commandes douteuses",
  "La relance intelligente",
  "La posture commerciale",
  "La discipline de reporting",
  "Les scripts d’appel",
  "Cas pratiques issus du terrain e-commerce marocain",
];

const methodSteps = [
  {
    title: "Réception des commandes",
    text: "Vous nous transmettez vos commandes à confirmer selon le format convenu : Google Sheets, export de votre plateforme ou API.",
  },
  {
    title: "Appel professionnel",
    text: "Nos confirmatrices contactent chaque client avec un script clair, poli et adapté à votre produit.",
  },
  {
    title: "Vérification complète",
    text: "Produit, adresse, téléphone, ville, disponibilité et remarques de livraison sont vérifiés avec méthode.",
  },
  {
    title: "Classification",
    text: "Chaque commande reçoit un statut exploitable : confirmée, à rappeler, injoignable, annulée, douteuse ou incorrecte.",
  },
  {
    title: "Rapport et amélioration",
    text: "Vous suivez les résultats et comprenez ce qui bloque votre taux de livraison avant l’expédition.",
  },
];

const benefits = [
  "Moins de commandes perdues",
  "Moins de fausses expéditions",
  "Meilleure qualité de confirmation",
  "Gain de temps pour le vendeur",
  "Vision claire sur les causes d’annulation",
  "Amélioration du taux de livraison",
  "Image plus professionnelle auprès du client",
  "Équipe formée aux réalités du e-commerce marocain",
  "Possibilité de former vos propres confirmatrices",
];

const beforeAfter = [
  ["Commandes mal vérifiées", "Commandes confirmées avec méthode"],
  ["Clients injoignables non suivis", "Relances organisées"],
  ["Adresses incomplètes", "Informations corrigées"],
  ["Beaucoup de retours", "Moins de pertes"],
  ["Manque de visibilité", "Reporting clair"],
  ["Temps perdu par le seller", "Vendeur concentré sur la vente"],
];

const targetAudiences = [
  "Sellers e-commerce",
  "Boutiques Instagram / Facebook",
  "Marques cosmétiques",
  "Vendeurs de produits COD",
  "Agences marketing",
  "Call centers souhaitant former leurs confirmatrices",
  "Nouveaux projets e-commerce",
];

const commitments = [
  {
    title: "Confidentialité des données clients",
    text: "Vos listes de commandes sont traitées comme des informations sensibles, avec accès limité et usage strictement professionnel.",
  },
  {
    title: "Transparence du reporting",
    text: "Vous savez ce qui a été appelé, ce qui doit être relancé et pourquoi une commande bloque.",
  },
  {
    title: "Professionnalisme des appels",
    text: "Le client entend une voix calme, claire et rassurante qui protège l’image de votre marque.",
  },
];

const faqs = [
  {
    question: "Comment vous transmettre mes commandes ?",
    answer:
      "Nous définissons avec vous le format le plus simple : Google Sheets, export de plateforme, fichier structuré ou intégration plus avancée selon votre volume.",
  },
  {
    question: "En combien de temps mes commandes sont-elles confirmées ?",
    answer:
      "Le délai dépend du volume et des horaires convenus. L’objectif est de traiter les commandes rapidement pour éviter que le client oublie ou change d’avis avant l’expédition.",
  },
  {
    question: "Travaillez-vous en darija, français et arabe ?",
    answer:
      "Oui. Les appels peuvent être adaptés à la langue du client et au ton de votre marque pour rester naturels sur le terrain marocain.",
  },
  {
    question: "Comment sont facturés vos services ?",
    answer:
      "La facturation peut être adaptée au volume : par commande traitée, par forfait ou selon un accord mensuel. Le diagnostic gratuit permet de proposer le modèle le plus logique pour votre activité.",
  },
  {
    question: "Mes données clients sont-elles protégées ?",
    answer:
      "Oui. Les données reçues servent uniquement à la confirmation et au suivi convenu. CALL2CONFIRM applique une logique de confidentialité et de minimisation des accès.",
  },
  {
    question: "Quel volume minimum acceptez-vous ?",
    answer:
      "Nous étudions les petits et grands volumes. L’important est de comprendre votre flux quotidien, votre type de produit et vos difficultés actuelles de livraison.",
  },
  {
    question: "Puis-je suivre les résultats en temps réel ?",
    answer:
      "Selon le format choisi, vous pouvez suivre les statuts dans un fichier partagé ou recevoir un reporting régulier avec les motifs d’échec et de relance.",
  },
  {
    question: "La formation est-elle en présentiel ou à distance ?",
    answer:
      "Le format peut être adapté selon les besoins : sessions pratiques, accompagnement d’équipe, simulations et évaluation terrain. Les prochaines sessions sont précisées lors de la prise de contact.",
  },
];

function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event: name, ...params });
  window.plausible?.(name, { props: params });
  window.fbq?.("trackCustom", name, params ?? {});
}

function getWhatsAppUrl(source: string) {
  const message = `Bonjour, je souhaite un diagnostic gratuit pour mes commandes e-commerce. Source : ${source}`;
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = "stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round";
  const icons: Record<IconName, ReactNode> = {
    phone: (
      <>
        <path className={common} d="M7.5 4.5 10 4l2 4-1.8 1.3a13.8 13.8 0 0 0 5.5 5.5L17 13l4 2-.5 2.5c-.2 1-1 1.7-2 1.7C10.8 19.2 4.8 13.2 4.8 5.5c0-1 .7-1.8 1.7-2Z" />
        <path className={common} d="M16 5.5c1.3.4 2.1 1.2 2.5 2.5M16.5 2.5A7 7 0 0 1 21.5 7.5" />
      </>
    ),
    package: (
      <>
        <path className={common} d="m4 8 8-4 8 4-8 4-8-4Z" />
        <path className={common} d="M4 8v8l8 4 8-4V8M12 12v8" />
      </>
    ),
    truck: (
      <>
        <path className={common} d="M3.5 6.5h11v9h-11zM14.5 9.5h3l3 3v3h-6" />
        <circle className={common} cx="7" cy="17.5" r="1.7" />
        <circle className={common} cx="17" cy="17.5" r="1.7" />
      </>
    ),
    checklist: (
      <>
        <path className={common} d="M8 6h12M8 12h12M8 18h12" />
        <path className={common} d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2" />
      </>
    ),
    chart: (
      <>
        <path className={common} d="M4 19.5V5M4 19.5h16" />
        <path className={common} d="m7 15 3.5-4 3 2 5-6" />
        <path className={common} d="M17 7h1.8v1.8" />
      </>
    ),
    headset: (
      <>
        <path className={common} d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" />
        <path className={common} d="M4.5 13.5c0-1 .8-1.8 1.8-1.8h1v5.6h-1c-1 0-1.8-.8-1.8-1.8v-2ZM19.5 13.5c0-1-.8-1.8-1.8-1.8h-1v5.6h1c1 0 1.8-.8 1.8-1.8v-2Z" />
        <path className={common} d="M17 17.2c-.7 1.5-2.1 2.3-4.2 2.3H11" />
      </>
    ),
    shield: (
      <>
        <path className={common} d="M12 3.5 19 6v5.5c0 4.3-2.8 7.5-7 9-4.2-1.5-7-4.7-7-9V6l7-2.5Z" />
        <path className={common} d="m8.8 12 2 2 4.5-5" />
      </>
    ),
    training: (
      <>
        <path className={common} d="M4 6.5 12 3l8 3.5-8 3.5L4 6.5Z" />
        <path className={common} d="M7 9v5.5c1.3 1 3 1.5 5 1.5s3.7-.5 5-1.5V9" />
        <path className={common} d="M20 7v5" />
      </>
    ),
    alert: (
      <>
        <path className={common} d="M12 4 21 20H3L12 4Z" />
        <path className={common} d="M12 9v5M12 17.5h.01" />
      </>
    ),
    users: (
      <>
        <circle className={common} cx="9" cy="8" r="3" />
        <path className={common} d="M3.5 19c.7-3 2.7-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
        <path className={common} d="M15 11.3a2.6 2.6 0 1 0 0-5M15.5 14.7c2.5.2 4 1.6 4.8 4.3" />
      </>
    ),
    clock: (
      <>
        <circle className={common} cx="12" cy="12" r="8" />
        <path className={common} d="M12 7.5V12l3 2" />
      </>
    ),
    lock: (
      <>
        <rect className={common} x="5" y="10" width="14" height="10" rx="2" />
        <path className={common} d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      </>
    ),
    map: (
      <>
        <path className={common} d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
        <circle className={common} cx="12" cy="10" r="2" />
      </>
    ),
    whatsapp: (
      <>
        <path className={common} d="M6.2 19.2 7.3 16A7.2 7.2 0 1 1 10 18.2l-3.8 1Z" />
        <path className={common} d="M9.6 8.4c.2-.3.4-.3.7-.2l1 1c.2.2.2.4 0 .7l-.4.6c.7 1.2 1.6 2 2.8 2.6l.6-.5c.2-.2.5-.2.7 0l1.1 1c.2.2.2.5 0 .8-.5.7-1.2 1-2 1-2.3-.2-5.5-3-5.9-5.5 0-.7.4-1.2 1.4-1.5Z" />
      </>
    ),
    message: (
      <>
        <path className={common} d="M4 5.5h16v11H8l-4 3v-14Z" />
        <path className={common} d="M8 10h8M8 13h5" />
      </>
    ),
    target: (
      <>
        <circle className={common} cx="12" cy="12" r="8" />
        <circle className={common} cx="12" cy="12" r="4" />
        <path className={common} d="M12 2.5v3M21.5 12h-3M12 21.5v-3M2.5 12h3" />
      </>
    ),
    document: (
      <>
        <path className={common} d="M6 3.5h8l4 4v13H6v-17Z" />
        <path className={common} d="M14 3.5v4h4M9 12h6M9 15.5h6M9 9h2" />
      </>
    ),
    spark: (
      <>
        <path className={common} d="M12 3.5 13.8 9l5.7 3-5.7 3L12 20.5 10.2 15l-5.7-3 5.7-3L12 3.5Z" />
      </>
    ),
  };

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div data-animate className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? (
        <p className={`mb-3 text-sm font-bold uppercase tracking-[0.16em] ${light ? "text-[#2FC7F7]" : "text-[#007EA7]"}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`text-[clamp(1.65rem,4vw,2.5rem)] font-extrabold leading-tight ${light ? "text-white" : "text-[#001B33]"}`}>{title}</h2>
      {subtitle ? <p className={`mt-4 text-lg leading-8 ${light ? "text-white/78" : "text-slate-600"}`}>{subtitle}</p> : null}
    </div>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
  eventName = "cta_click",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark" | "whatsapp" | "secondary";
  className?: string;
  eventName?: string;
}) {
  const styles = {
    primary: "bg-[#00AEEF] text-[#001B33] hover:bg-[#2FC7F7] shadow-[0_16px_35px_rgba(0,174,239,0.25)]",
    outline: "border border-white/35 bg-white/5 text-white hover:border-[#2FC7F7] hover:bg-white/10",
    dark: "bg-[#001B33] text-white hover:bg-[#00213D]",
    whatsapp: "bg-[#25D366] text-[#001B33] hover:bg-[#3de178] shadow-[0_16px_35px_rgba(37,211,102,0.22)]",
    secondary: "border border-[#00AEEF]/35 bg-white text-[#001B33] hover:border-[#00AEEF] hover:bg-[#F5FBFF]",
  }[variant];

  return (
    <a
      href={href}
      onClick={() => trackEvent(eventName, { href })}
      className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-extrabold transition duration-200 active:scale-[0.98] ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

function HeroVisual() {
  return (
    <div data-animate className="relative mx-auto w-full max-w-[540px]">
      <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-[#00AEEF]/20 blur-2xl md:block" />
      <div className="absolute -right-4 bottom-12 h-32 w-32 rounded-full bg-[#22C55E]/15 blur-3xl" />
      <div className="relative rounded-2xl border border-white/14 bg-white/10 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur">
        <div className="rounded-xl bg-white p-4 text-[#001B33]">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#E7F8FF] text-[#007EA7]">
                <Icon name="headset" className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-extrabold">Appel en cours</p>
                <p className="text-xs text-slate-500">Cliente COD · Casablanca</p>
              </div>
            </div>
            <span className="rounded-full bg-[#22C55E]/12 px-3 py-1 text-xs font-extrabold text-[#15803D]">Confirmée</span>
          </div>

          <div className="grid gap-3 py-5 sm:grid-cols-3">
            {[
              ["Produit", "Pack cosmétique"],
              ["Adresse", "Corrigée"],
              ["Livraison", "Disponible demain"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#F5F7FA] p-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100">
            <div className="grid grid-cols-[1.1fr_.9fr_.9fr] bg-[#001B33] px-3 py-2 text-xs font-bold text-white">
              <span>Commande</span>
              <span>Statut</span>
              <span>Action</span>
            </div>
            {[
              ["#C2C-1048", "Confirmée", "Expédier", "green"],
              ["#C2C-1049", "À rappeler", "18h30", "cyan"],
              ["#C2C-1050", "Injoignable", "Relance", "red"],
            ].map(([id, status, action, color]) => (
              <div key={id} className="grid grid-cols-[1.1fr_.9fr_.9fr] items-center border-t border-slate-100 px-3 py-3 text-xs">
                <span className="font-bold text-slate-700">{id}</span>
                <span
                  className={`w-fit rounded-full px-2 py-1 font-bold ${
                    color === "green"
                      ? "bg-[#22C55E]/12 text-[#15803D]"
                      : color === "cyan"
                        ? "bg-[#00AEEF]/12 text-[#007EA7]"
                        : "bg-[#EF4444]/10 text-[#B91C1C]"
                  }`}
                >
                  {status}
                </span>
                <span className="text-slate-500">{action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-5 left-6 right-6 rounded-xl border border-white/15 bg-[#00213D] p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#00AEEF] text-[#001B33]">
              <Icon name="chart" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white">Reporting quotidien</p>
              <p className="text-xs text-white/70">Vos commandes méritent un suivi professionnel.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportMockup() {
  return (
    <div data-animate className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(0,27,51,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-[#001B33]">Rapport type</p>
          <p className="text-xs text-slate-500">Vue stylisée · données exemple non client</p>
        </div>
        <span className="rounded-lg bg-[#E7F8FF] px-3 py-1 text-xs font-bold text-[#007EA7]">Aujourd’hui</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-100">
        {[
          ["Commande", "Ville", "Statut", "Motif"],
          ["C2C-211", "Rabat", "Confirmée", "Adresse validée"],
          ["C2C-212", "Fès", "À rappeler", "Client occupé"],
          ["C2C-213", "Agadir", "Annulée", "Double commande"],
          ["C2C-214", "Tanger", "Corrigée", "Téléphone confirmé"],
        ].map((row, index) => (
          <div
            key={row.join("-")}
            className={`grid grid-cols-[1fr_.85fr_.95fr_1.15fr] gap-2 px-3 py-3 text-xs ${index === 0 ? "bg-[#001B33] font-bold text-white" : "border-t border-slate-100 text-slate-600"}`}
          >
            {row.map((cell) => (
              <span key={cell} className={index > 0 && cell === "Confirmée" ? "font-bold text-[#15803D]" : index > 0 && cell === "Annulée" ? "font-bold text-[#B91C1C]" : ""}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      activity: String(formData.get("activity") ?? ""),
      volume: String(formData.get("volume") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      source: "contact_form",
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        setState("error");
        setFeedback(result.message ?? "Une erreur est survenue. Vous pouvez aussi nous contacter sur WhatsApp.");
        return;
      }

      setState("success");
      setFeedback(result.message ?? "Merci ! Mme Abir vous recontacte très rapidement.");
      trackEvent("form_submit", { form: "diagnostic" });
      form.reset();
    } catch {
      setState("error");
      setFeedback("Connexion momentanément indisponible. Vous pouvez nous écrire directement sur WhatsApp.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-[#F5F7FA] p-5 shadow-[0_4px_20px_rgba(0,27,51,0.08)] md:p-7">
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-[#001B33]">
          Nom complet *
          <input
            name="fullName"
            required
            minLength={2}
            autoComplete="name"
            className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-base font-medium outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#00AEEF]/15"
            placeholder="Votre nom"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-[#001B33]">
          Téléphone / WhatsApp *
          <input
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="^(?:(?:\+|00)212|0)[67][0-9]{8}$"
            className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-base font-medium outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#00AEEF]/15"
            placeholder="06XXXXXXXX ou 07XXXXXXXX"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-[#001B33]">
            Votre activité *
            <select
              name="activity"
              required
              defaultValue=""
              className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-base font-medium outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#00AEEF]/15"
            >
              <option value="" disabled>
                Sélectionner
              </option>
              <option>COD</option>
              <option>Boutique Instagram</option>
              <option>Marque</option>
              <option>Agence</option>
              <option>Autre</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-[#001B33]">
            Volume / jour *
            <select
              name="volume"
              required
              defaultValue=""
              className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-base font-medium outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#00AEEF]/15"
            >
              <option value="" disabled>
                Sélectionner
              </option>
              <option>Moins de 10</option>
              <option>10–50</option>
              <option>50–150</option>
              <option>+150</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-[#001B33]">
          Message optionnel
          <textarea
            name="message"
            rows={4}
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-base font-medium outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#00AEEF]/15"
            placeholder="Expliquez votre difficulté : retours, injoignables, volumes, formation…"
          />
        </label>

        <label className="sr-only">
          Site web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-600">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#00AEEF]" />
          <span>
            J’accepte que CALL2CONFIRM utilise ces informations pour me recontacter au sujet de ma demande, conformément à la politique de confidentialité.
          </span>
        </label>

        <button
          type="submit"
          disabled={state === "loading"}
          onClick={() => trackEvent("diagnostic_cta_click", { location: "form" })}
          className="min-h-12 rounded-lg bg-[#00AEEF] px-6 py-3 text-base font-extrabold text-[#001B33] shadow-[0_16px_35px_rgba(0,174,239,0.25)] transition hover:bg-[#2FC7F7] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {state === "loading" ? "Envoi en cours…" : "Recevoir mon diagnostic gratuit"}
        </button>

        {feedback ? (
          <p
            role="status"
            className={`rounded-xl p-4 text-sm font-bold ${state === "success" ? "bg-[#22C55E]/10 text-[#15803D]" : "bg-[#EF4444]/10 text-[#B91C1C]"}`}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default function Call2ConfirmLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const whatsAppHero = useMemo(() => getWhatsAppUrl("header"), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-counter]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const target = Number(element.dataset.counter ?? "0");
          const duration = 900;
          const start = performance.now();

          function animate(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            element.textContent = String(Math.round(target * progress));
            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
          observer.unobserve(element);
        });
      },
      { threshold: 0.4 },
    );

    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let tracked = false;
    const onScroll = () => {
      if (tracked) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.75) {
        tracked = true;
        trackEvent("scroll_75");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="accueil" className="min-h-screen bg-white pb-24 text-[#001B33] md:pb-0">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-slate-200/80 bg-white/95 py-2 shadow-[0_4px_20px_rgba(0,27,51,0.08)] backdrop-blur" : "border-white/10 bg-[#001B33]/92 py-4 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#accueil" onClick={() => trackEvent("logo_click")} className="flex items-center gap-3" aria-label="CALL2CONFIRM accueil">
            <span className={`grid h-11 w-11 place-items-center rounded-xl font-black transition ${scrolled ? "bg-[#001B33] text-white" : "bg-white text-[#001B33]"}`}>C2</span>
            <span>
              <span className={`block text-lg font-black tracking-tight transition ${scrolled ? "text-[#001B33]" : "text-white"}`}>CALL2CONFIRM</span>
              <span className={`hidden text-xs font-semibold sm:block ${scrolled ? "text-slate-500" : "text-white/65"}`}>La qualité au bout du fil</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={`text-sm font-bold transition hover:text-[#00AEEF] ${scrolled ? "text-slate-700" : "text-white/82"}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              title="Version arabe prévue en phase 2"
              className={`rounded-lg border px-3 py-2 text-xs font-extrabold ${scrolled ? "border-slate-200 text-slate-500" : "border-white/15 text-white/70"}`}
              aria-disabled="true"
            >
              FR · AR bientôt
            </button>
            <a
              href={whatsAppHero}
              onClick={() => trackEvent("whatsapp_click", { location: "header" })}
              className="grid h-11 w-11 place-items-center rounded-lg bg-[#25D366] text-[#001B33] transition hover:scale-105"
              aria-label="Contacter CALL2CONFIRM sur WhatsApp"
            >
              <Icon name="whatsapp" className="h-6 w-6" />
            </a>
            <CtaLink href="#contact" className="px-5" eventName="diagnostic_cta_click">
              Diagnostic gratuit
            </CtaLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={whatsAppHero}
              onClick={() => trackEvent("whatsapp_click", { location: "mobile_header" })}
              className="grid h-11 w-11 place-items-center rounded-lg bg-[#25D366] text-[#001B33]"
              aria-label="WhatsApp"
            >
              <Icon name="whatsapp" className="h-6 w-6" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className={`grid h-11 w-11 place-items-center rounded-lg border ${scrolled ? "border-slate-200 text-[#001B33]" : "border-white/20 text-white"}`}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
            >
              <span className="relative h-4 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-4 h-0.5 w-5 rounded bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mx-auto mt-3 max-w-[1200px] px-4 lg:hidden">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-bold text-[#001B33] hover:bg-[#F5F7FA]"
                >
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-xl bg-[#00AEEF] px-4 py-3 text-center text-sm font-black text-[#001B33]">
                Diagnostic gratuit
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="hero-pattern overflow-hidden bg-[#001B33] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <div data-animate>
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-4 py-2 text-sm font-bold text-[#2FC7F7]">
                <span aria-hidden="true">📞</span> Confirmation e-commerce professionnelle — Maroc
              </div>
              <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.12] tracking-[-0.03em]">
                Réduisez vos commandes non livrées grâce à une confirmation professionnelle
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
                CALL2CONFIRM accompagne les vendeurs e-commerce dans la confirmation téléphonique des commandes, la qualification des clients et l’amélioration du taux de livraison.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Chaque commande non confirmée correctement peut devenir une perte. Notre équipe contacte vos clients, vérifie les informations essentielles et vous aide à livrer plus efficacement.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="#contact" eventName="diagnostic_cta_click">Demander un diagnostic gratuit</CtaLink>
                <CtaLink href="#services" variant="outline">Découvrir nos services</CtaLink>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {proofItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/6 p-3 text-sm font-bold text-white/88">
                    <span className="mt-0.5 text-[#22C55E]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <HeroVisual />
          </div>
          <div className="mx-auto mt-16 max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div data-animate className="grid gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 text-center text-sm font-bold text-white/72 sm:grid-cols-4">
              {['Cosmétique', 'Gadgets', 'Mode', 'COD Maroc'].map((sector) => (
                <span key={sector} className="rounded-lg bg-white/6 px-4 py-3">{sector}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F5F7FA] py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Le vrai problème"
              title="Vous recevez des commandes, mais elles ne passent pas toutes à la livraison ?"
              subtitle="Le problème ne vient pas toujours du produit. Souvent, le client a oublié sa commande, l’adresse est incomplète, le numéro est difficile à joindre ou la commande n’a pas été confirmée avec assez de rigueur."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {problemCards.map((problem) => (
                <div key={problem} data-animate className="group rounded-xl border border-[#EF4444]/15 bg-white p-5 shadow-[0_4px_20px_rgba(0,27,51,0.06)] transition hover:-translate-y-1 hover:border-[#00AEEF]">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-[#EF4444]/8 text-[#EF4444]">
                    <Icon name="alert" className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#001B33]">{problem}</h3>
                </div>
              ))}
            </div>
            <p data-animate className="mx-auto mt-10 max-w-3xl text-center text-xl font-black leading-8 text-[#001B33]">
              CALL2CONFIRM transforme cette étape critique en un vrai levier de performance.
            </p>
          </div>
        </section>

        <section className="bg-[#001B33] py-14 text-white md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div data-animate className="mb-8 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2FC7F7]">Chiffres clés</p>
              <h2 className="mt-3 text-[clamp(1.65rem,4vw,2.35rem)] font-black">Des repères concrets, sans promesses vagues</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {keyStats.map((stat) => (
                <div key={stat.label} data-animate className="rounded-2xl border border-white/10 bg-white/7 p-5">
                  <p className="text-4xl font-black text-[#2FC7F7] md:text-5xl">
                    <span data-counter={stat.value}>{stat.value === "0" ? "0" : "0"}</span>
                    <span className="text-2xl">{stat.suffix}</span>
                  </p>
                  <h3 className="mt-3 text-lg font-extrabold">{stat.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Nos services" subtitle="Une prise en charge complète de vos commandes, de la réception à la livraison." />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} data-animate className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,27,51,0.06)] transition hover:-translate-y-1 hover:border-[#00AEEF]">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#E7F8FF] text-[#007EA7]">
                    <Icon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#001B33]">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{service.text}</p>
                </article>
              ))}
            </div>
            <div data-animate className="mt-6 rounded-2xl bg-[#001B33] p-6 text-white shadow-[0_20px_50px_rgba(0,27,51,0.18)] md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#00AEEF] text-[#001B33]">
                    <Icon name="training" className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black">Formation des confirmatrices</h3>
                  <p className="mt-3 max-w-4xl leading-8 text-white/78">
                    CALL2CONFIRM propose également une formation pratique pour préparer des profils capables de gérer les appels clients avec méthode, calme, persuasion et professionnalisme.
                  </p>
                  <blockquote className="mt-5 rounded-xl border-l-4 border-[#00AEEF] bg-white/7 p-4 font-bold leading-7 text-white/90">
                    « Une bonne confirmatrice ne se contente pas d’appeler. Elle sécurise la commande, rassure le client et protège la marge du vendeur. »
                  </blockquote>
                </div>
                <CtaLink href="#formation" variant="outline">En savoir plus sur la formation</CtaLink>
              </div>
            </div>
            <div data-animate className="mt-10 text-center">
              <CtaLink href="#contact" eventName="diagnostic_cta_click">Demander un diagnostic gratuit</CtaLink>
            </div>
          </div>
        </section>

        <section id="formation" className="bg-[#F5F7FA] py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Formation"
              title="Formation terrain pour confirmatrices e-commerce"
              subtitle="La confirmation téléphonique est un métier qui demande de la méthode. Une confirmatrice bien formée peut faire la différence entre une commande perdue et une commande livrée."
            />
            <p data-animate className="mx-auto mb-10 max-w-4xl text-center text-lg leading-8 text-slate-600">
              CALL2CONFIRM prépare les confirmatrices aux conditions réelles : objections, hésitations, changements d’adresse, clients occupés ou méfiants, commandes douteuses.
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
              <div data-animate className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,27,51,0.08)] md:p-8">
                <h3 className="mb-5 text-2xl font-black text-[#001B33]">Objectifs de la formation</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {trainingObjectives.map((objective) => (
                    <div key={objective} className="flex gap-3 rounded-xl bg-[#F5F7FA] p-3 text-sm font-bold text-slate-700">
                      <span className="text-[#22C55E]">✓</span>
                      <span>{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div data-animate className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,27,51,0.08)] md:p-8">
                <h3 className="mb-5 text-2xl font-black text-[#001B33]">Format de la formation</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {trainingFormats.map((format, index) => (
                    <div key={format} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#E7F8FF] text-sm font-black text-[#007EA7]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-bold text-slate-700">{format}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div data-animate className="mt-8 rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,27,51,0.08)] md:p-8">
              <h3 className="mb-5 text-2xl font-black text-[#001B33]">Programme détaillé</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {trainingModules.map((module, index) => (
                  <details key={module} className="group rounded-xl border border-slate-200 bg-white p-4 open:border-[#00AEEF] open:bg-[#F5FBFF]">
                    <summary className="cursor-pointer list-none font-extrabold text-[#001B33] marker:hidden">
                      <span className="mr-3 text-[#007EA7]">{String(index + 1).padStart(2, "0")}</span>
                      {module}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Module pratique avec exemples d’appels, erreurs fréquentes et bonnes réponses adaptées au terrain e-commerce marocain.
                    </p>
                  </details>
                ))}
              </div>
              <div className="mt-6 grid gap-3 rounded-xl bg-[#F5F7FA] p-4 text-sm font-bold text-slate-600 sm:grid-cols-3">
                <span>Durée : selon besoin</span>
                <span>Format : présentiel ou à distance</span>
                <span>Attestation : sur session validée</span>
              </div>
            </div>

            <div data-animate className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaLink href="#contact" eventName="training_team_click">Former mon équipe</CtaLink>
              <CtaLink href={getWhatsAppUrl("devenir-confirmatrice")} variant="secondary" eventName="candidate_whatsapp_click">
                Devenir confirmatrice
              </CtaLink>
            </div>
          </div>
        </section>

        <section id="methode" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Notre méthode en 5 étapes" subtitle="Votre taux de livraison commence avant l’expédition. Voici comment nous sécurisons l’étape de confirmation." />
            <div className="relative grid gap-5 lg:grid-cols-5">
              <div className="absolute left-[10%] right-[10%] top-9 hidden h-0.5 bg-[#00AEEF]/35 lg:block" />
              {methodSteps.map((step, index) => (
                <article key={step.title} data-animate className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(0,27,51,0.06)] transition hover:-translate-y-1 hover:border-[#00AEEF]">
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-[#00AEEF] text-lg font-black text-[#001B33]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-extrabold text-[#001B33]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
              <div data-animate>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#007EA7]">Reporting concret</p>
                <h3 className="mt-3 text-3xl font-black text-[#001B33]">Vous voyez où la livraison se gagne ou se perd.</h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Un tableau simple permet de suivre les commandes confirmées, les relances, les motifs d’annulation et les corrections à faire avant l’expédition.
                </p>
                <p className="mt-5 rounded-xl bg-[#E7F8FF] p-4 text-lg font-black text-[#001B33]">Le bon appel au bon moment peut sauver une vente.</p>
              </div>
              <ReportMockup />
            </div>
          </div>
        </section>

        <section id="avantages" className="bg-[#001B33] py-16 text-white md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading light title="Pourquoi travailler avec CALL2CONFIRM ?" subtitle="Parce que la confirmation n’est pas une formalité. C’est une étape de performance qui protège votre marge." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit} data-animate className="rounded-2xl border border-white/10 bg-white/7 p-5 transition hover:-translate-y-1 hover:border-[#00AEEF]">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-[#00AEEF]/14 text-[#2FC7F7]">
                    <Icon name="spark" className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold">{benefit}</h3>
                </div>
              ))}
            </div>
            <p data-animate className="mx-auto mt-14 max-w-4xl text-center text-[clamp(1.7rem,4vw,3rem)] font-black leading-tight">
              « Une commande confirmée sérieusement coûte moins cher qu’une commande livrée au hasard. »
            </p>
          </div>
        </section>

        <section className="bg-[#F5F7FA] py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Avant CALL2CONFIRM / Après CALL2CONFIRM" subtitle="La différence se voit dans la méthode, le suivi et la qualité des décisions avant expédition." />
            <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div data-animate className="rounded-2xl border border-[#EF4444]/25 bg-white p-6">
                <h3 className="mb-5 text-2xl font-black text-[#B91C1C]">❌ Avant</h3>
                <div className="grid gap-3">
                  {beforeAfter.map(([before]) => (
                    <div key={before} className="rounded-xl bg-[#EF4444]/7 p-4 font-bold text-slate-700">{before}</div>
                  ))}
                </div>
              </div>
              <div className="hidden text-4xl font-black text-[#00AEEF] lg:block">→</div>
              <div data-animate className="rounded-2xl border border-[#22C55E]/30 bg-white p-6">
                <h3 className="mb-5 text-2xl font-black text-[#15803D]">✓ Après</h3>
                <div className="grid gap-3">
                  {beforeAfter.map(([, after]) => (
                    <div key={after} className="rounded-xl bg-[#22C55E]/8 p-4 font-bold text-slate-700">{after}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading title="À qui s’adresse CALL2CONFIRM ?" subtitle="Nos services sont destinés à tous ceux qui veulent mieux contrôler leurs commandes avant livraison." />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {targetAudiences.map((audience) => (
                <div key={audience} data-animate className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(0,27,51,0.05)] transition hover:-translate-y-1 hover:border-[#00AEEF]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#E7F8FF] text-[#007EA7]">
                    <Icon name="package" className="h-6 w-6" />
                  </span>
                  <h3 className="font-extrabold text-[#001B33]">{audience}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F5F7FA] py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Nos engagements" title="Des garanties claires avant les témoignages publics" subtitle="Aucun faux témoignage n’est affiché. Au lancement, nous mettons en avant ce que vous pouvez exiger d’un partenaire de confirmation sérieux." />
            <div className="grid gap-5 md:grid-cols-3">
              {commitments.map((commitment, index) => (
                <article key={commitment.title} data-animate className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,27,51,0.08)]">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#001B33] text-[#2FC7F7]">
                    <Icon name={index === 0 ? "lock" : index === 1 ? "document" : "headset"} className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#001B33]">{commitment.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{commitment.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Questions fréquentes" subtitle="Les réponses aux objections les plus fréquentes avant de confier vos commandes ou de former une équipe." />
            <div className="grid gap-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} data-animate className="rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,27,51,0.05)]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-extrabold text-[#001B33]"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="text-2xl text-[#00AEEF]">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen ? <p className="px-5 pb-5 leading-7 text-slate-600">{faq.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#001B33] to-[#00213D] py-16 text-white md:py-24">
          <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
            <div data-animate>
              <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight">Vous voulez savoir pourquoi vos commandes ne se livrent pas correctement ?</h2>
              <p className="mt-5 text-lg leading-8 text-white/78">
                Contactez-nous pour diagnostiquer votre besoin. Nous analysons votre situation, vos volumes de commandes et vos difficultés actuelles afin de vous proposer une solution adaptée.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <CtaLink href="#contact" eventName="diagnostic_cta_click">Demander un diagnostic gratuit</CtaLink>
                <CtaLink href={getWhatsAppUrl("cta-final")} variant="whatsapp" eventName="whatsapp_click">
                  Nous contacter sur WhatsApp
                </CtaLink>
              </div>
              <p className="mt-6 text-sm font-bold text-white/65">Diagnostic sans engagement · Réponse rapide · Confidentialité garantie</p>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div data-animate>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#007EA7]">Contact</p>
              <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.5rem)] font-black leading-tight text-[#001B33]">Parlez-nous de vos commandes.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">Nous vous aidons à confirmer mieux, livrer plus et perdre moins.</p>
              <div className="mt-8 grid gap-4">
                <a href={`tel:${phoneNumber}`} onClick={() => trackEvent("call_click", { location: "contact" })} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-[#00AEEF] hover:bg-[#F5FBFF]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#E7F8FF] text-[#007EA7]"><Icon name="phone" className="h-6 w-6" /></span>
                  <span><strong className="block text-[#001B33]">Téléphone</strong><span className="text-slate-600">{displayPhone}</span></span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#E7F8FF] text-[#007EA7]"><Icon name="users" className="h-6 w-6" /></span>
                  <span><strong className="block text-[#001B33]">Contact</strong><span className="text-slate-600">Mme Abir</span></span>
                </div>
                <a href={getWhatsAppUrl("contact") } onClick={() => trackEvent("whatsapp_click", { location: "contact" })} className="flex items-center gap-4 rounded-2xl border border-[#25D366]/30 p-4 transition hover:bg-[#25D366]/8">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366] text-[#001B33]"><Icon name="whatsapp" className="h-6 w-6" /></span>
                  <span><strong className="block text-[#001B33]">WhatsApp direct</strong><span className="text-slate-600">Message pré-rempli pour diagnostic gratuit</span></span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#E7F8FF] text-[#007EA7]"><Icon name="map" className="h-6 w-6" /></span>
                  <span><strong className="block text-[#001B33]">Zone d’intervention</strong><span className="text-slate-600">Tout le Maroc</span></span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3" aria-label="Réseaux sociaux">
                {['Instagram', 'Facebook', 'LinkedIn', 'TikTok'].map((network) => (
                  <span key={network} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-500">{network}</span>
                ))}
              </div>
            </div>
            <div data-animate>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#001B33] py-10 text-white">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_.9fr_.9fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-lg font-black text-[#001B33]">C2</span>
              <div>
                <p className="font-black">CALL2CONFIRM</p>
                <p className="text-sm text-white/65">La qualité au bout du fil</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">Confirmer mieux. Livrer plus. Perdre moins. Chaque appel compte.</p>
          </div>
          <div>
            <h3 className="mb-3 font-extrabold">Liens rapides</h3>
            <div className="grid gap-2 text-sm text-white/70">
              {navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-[#2FC7F7]">{item.label}</a>)}
              <a href="/mentions-legales" className="hover:text-[#2FC7F7]">Mentions légales</a>
              <a href="/politique-confidentialite" className="hover:text-[#2FC7F7]">Politique de confidentialité</a>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-extrabold">Coordonnées</h3>
            <div className="grid gap-2 text-sm text-white/70">
              <a href={`tel:${phoneNumber}`} className="hover:text-[#2FC7F7]">{displayPhone}</a>
              <a href={getWhatsAppUrl("footer")} className="hover:text-[#2FC7F7]">WhatsApp Mme Abir</a>
              <span>Tout le Maroc</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1200px] flex-col gap-3 border-t border-white/10 px-4 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 CALL2CONFIRM — Tous droits réservés</p>
          <p>Chaque appel compte.</p>
        </div>
      </footer>

      <a
        href={getWhatsAppUrl("floating-desktop")}
        onClick={() => trackEvent("whatsapp_click", { location: "floating_desktop" })}
        className="whatsapp-pulse fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#001B33] shadow-2xl transition hover:scale-105 md:grid"
        aria-label="WhatsApp CALL2CONFIRM"
      >
        <Icon name="whatsapp" className="h-8 w-8" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-white p-2 shadow-[0_-8px_30px_rgba(0,27,51,0.12)] md:hidden">
        <a href={`tel:${phoneNumber}`} onClick={() => trackEvent("call_click", { location: "mobile_bar" })} className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#001B33] text-sm font-black text-white">
          <Icon name="phone" className="h-5 w-5" /> Appeler
        </a>
        <a href={getWhatsAppUrl("mobile-bar")} onClick={() => trackEvent("whatsapp_click", { location: "mobile_bar" })} className="ml-2 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] text-sm font-black text-[#001B33]">
          <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
