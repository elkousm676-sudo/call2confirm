import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://call2confirm.ma";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CALL2CONFIRM — Confirmation de commandes e-commerce au Maroc | Améliorez votre taux de livraison",
  description:
    "Service professionnel de confirmation téléphonique des commandes COD au Maroc. Réduisez les retours, qualifiez vos clients et livrez plus. Diagnostic gratuit.",
  keywords: [
    "confirmation commandes Maroc",
    "confirmation COD",
    "centre de confirmation e-commerce",
    "taux de livraison COD",
    "formation confirmatrice Maroc",
    "call center e-commerce Maroc",
  ],
  applicationName: "CALL2CONFIRM",
  authors: [{ name: "CALL2CONFIRM" }],
  creator: "CALL2CONFIRM",
  publisher: "CALL2CONFIRM",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "/",
    siteName: "CALL2CONFIRM",
    title: "CALL2CONFIRM — Confirmer mieux. Livrer plus. Perdre moins.",
    description:
      "Confirmation professionnelle des commandes e-commerce COD au Maroc, qualification clients, reporting et formation confirmatrices.",
    images: [
      {
        url: "/og-call2confirm.svg",
        width: 1200,
        height: 630,
        alt: "CALL2CONFIRM — La qualité au bout du fil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CALL2CONFIRM — Confirmation commandes e-commerce au Maroc",
    description: "Réduisez les retours, qualifiez vos clients et améliorez votre taux de livraison COD.",
    images: ["/og-call2confirm.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#001B33",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr-MA">
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
