import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — CALL2CONFIRM",
  description: "Mentions légales du site CALL2CONFIRM.",
  alternates: { canonical: "/mentions-legales" },
};

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] px-4 py-12 text-[#001B33] sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,27,51,0.08)] md:p-10">
        <Link href="/" className="text-sm font-extrabold text-[#007EA7] hover:text-[#00AEEF]">← Retour à l’accueil</Link>
        <h1 className="mt-6 text-4xl font-black leading-tight">Mentions légales</h1>
        <p className="mt-4 text-slate-600">Dernière mise à jour : 2026</p>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Éditeur du site</h2>
          <p><strong>Nom commercial :</strong> CALL2CONFIRM</p>
          <p><strong>Slogan :</strong> La qualité au bout du fil</p>
          <p><strong>Contact :</strong> Mme Abir</p>
          <p><strong>Téléphone :</strong> <a className="font-bold text-[#007EA7]" href="tel:+212777066590">0 777 066 590</a></p>
          <p><strong>Zone d’intervention :</strong> Maroc</p>
          <p><strong>Raison sociale, ICE, adresse du siège :</strong> informations administratives à compléter par CALL2CONFIRM avant publication officielle.</p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Activité</h2>
          <p>
            CALL2CONFIRM propose des services de confirmation téléphonique des commandes e-commerce, qualification clients, suivi des statuts, reporting et formation de confirmatrices.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Propriété intellectuelle</h2>
          <p>
            Les contenus, textes, éléments graphiques, logos et structure du site sont protégés. Toute reproduction ou réutilisation non autorisée est interdite.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Responsabilité</h2>
          <p>
            Les informations publiées sur ce site sont fournies à titre informatif. CALL2CONFIRM s’efforce de maintenir des informations exactes et à jour, sans garantie d’exhaustivité.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Contact</h2>
          <p>
            Pour toute question relative au site ou aux mentions légales, contactez CALL2CONFIRM au <a className="font-bold text-[#007EA7]" href="tel:+212777066590">0 777 066 590</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
