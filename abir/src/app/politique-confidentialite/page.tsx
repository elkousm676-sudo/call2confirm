import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité — CALL2CONFIRM",
  description: "Politique de confidentialité CALL2CONFIRM concernant les données personnelles et la loi marocaine 09-08.",
  alternates: { canonical: "/politique-confidentialite" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] px-4 py-12 text-[#001B33] sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,27,51,0.08)] md:p-10">
        <Link href="/" className="text-sm font-extrabold text-[#007EA7] hover:text-[#00AEEF]">← Retour à l’accueil</Link>
        <h1 className="mt-6 text-4xl font-black leading-tight">Politique de confidentialité</h1>
        <p className="mt-4 text-slate-600">Dernière mise à jour : 2026</p>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Notre engagement</h2>
          <p>
            CALL2CONFIRM traite des informations liées aux vendeurs e-commerce et, dans le cadre de ses prestations, peut être amenée à traiter des données clients nécessaires à la confirmation des commandes. Ces données doivent être utilisées uniquement pour la finalité convenue.
          </p>
          <p>
            Cette politique s’inscrit dans une logique de conformité à la loi marocaine 09-08 relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Données collectées via le formulaire</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Nom complet</li>
            <li>Téléphone / WhatsApp</li>
            <li>Activité e-commerce</li>
            <li>Volume de commandes estimé</li>
            <li>Message optionnel</li>
            <li>Données techniques limitées nécessaires à la sécurité anti-spam</li>
          </ul>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Finalités</h2>
          <p>Les données sont utilisées pour répondre aux demandes de diagnostic, recontacter le demandeur, analyser le besoin exprimé et proposer une solution adaptée.</p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Données clients transmises pour confirmation</h2>
          <p>
            Lorsque CALL2CONFIRM reçoit des listes de commandes à confirmer, les données sont traitées dans le cadre strict de la prestation : appel, vérification, classification, reporting et suivi convenu avec le vendeur.
          </p>
          <p>
            Les accès doivent être limités aux personnes autorisées. Les données ne doivent pas être revendues ni utilisées pour une autre finalité commerciale sans accord explicite.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Durée de conservation</h2>
          <p>
            Les demandes de contact sont conservées pendant la durée nécessaire au suivi commercial. Les données opérationnelles de confirmation sont conservées selon les conditions définies avec le client et supprimées ou archivées lorsque la finalité n’est plus nécessaire.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Vos droits</h2>
          <p>
            Vous pouvez demander l’accès, la rectification ou la suppression de vos données en contactant CALL2CONFIRM au <a className="font-bold text-[#007EA7]" href="tel:+212777066590">0 777 066 590</a>.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Cookies et mesure d’audience</h2>
          <p>
            Le site prévoit des événements de mesure pour les clics WhatsApp, appels, formulaires et scroll. Si des outils comme Google Analytics, Plausible ou Meta Pixel sont activés, un paramétrage conforme et, si nécessaire, un bandeau cookies devront être mis en place.
          </p>
        </section>

        <section className="mt-8 grid gap-4 text-slate-700">
          <h2 className="text-2xl font-black text-[#001B33]">Contact confidentialité</h2>
          <p>
            Pour toute demande liée aux données personnelles, contactez Mme Abir au <a className="font-bold text-[#007EA7]" href="tel:+212777066590">0 777 066 590</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
