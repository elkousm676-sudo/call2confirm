import { db } from "@/db";
import { contactLeads } from "@/db/schema";
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  phone?: string;
  activity?: string;
  volume?: string;
  message?: string;
  consent?: boolean;
  website?: string;
  source?: string;
};

const activities = new Set(["COD", "Boutique Instagram", "Marque", "Agence", "Autre"]);
const volumes = new Set(["Moins de 10", "10–50", "50–150", "+150"]);
const moroccanPhoneRegex = /^(?:(?:\+|00)212|0)[67]\d{8}$/;

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePhone(phone: string) {
  return phone.replace(/[\s.-]/g, "");
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}

function hashIp(ip: string) {
  return createHash("sha256").update(`${ip}:${process.env.IP_HASH_SALT ?? "call2confirm"}`).digest("hex");
}

async function notifyLead(lead: {
  fullName: string;
  phone: string;
  activity: string;
  volume: string;
  message: string | null;
}) {
  const webhookUrl = process.env.CALL2CONFIRM_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: "lead.created",
        brand: "CALL2CONFIRM",
        lead,
        createdAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(3000),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  if (normalize(payload.website)) {
    return NextResponse.json({ ok: true, message: "Merci ! Mme Abir vous recontacte très rapidement." });
  }

  const fullName = normalize(payload.fullName);
  const phone = normalizePhone(normalize(payload.phone));
  const activity = normalize(payload.activity);
  const volume = normalize(payload.volume);
  const message = normalize(payload.message);
  const source = normalize(payload.source) || "website";

  if (fullName.length < 2) {
    return NextResponse.json({ ok: false, message: "Veuillez saisir votre nom complet." }, { status: 422 });
  }

  if (!moroccanPhoneRegex.test(phone)) {
    return NextResponse.json(
      { ok: false, message: "Veuillez saisir un numéro marocain valide commençant par 06 ou 07." },
      { status: 422 },
    );
  }

  if (!activities.has(activity)) {
    return NextResponse.json({ ok: false, message: "Veuillez sélectionner votre activité." }, { status: 422 });
  }

  if (!volumes.has(volume)) {
    return NextResponse.json({ ok: false, message: "Veuillez sélectionner votre volume de commandes." }, { status: 422 });
  }

  if (!payload.consent) {
    return NextResponse.json({ ok: false, message: "Votre accord est nécessaire pour vous recontacter." }, { status: 422 });
  }

  const lead = {
    fullName,
    phone,
    activity,
    volume,
    message: message || null,
  };

  const notified = await notifyLead(lead);

  await db.insert(contactLeads).values({
    ...lead,
    consent: true,
    source,
    userAgent: request.headers.get("user-agent"),
    ipHash: hashIp(getClientIp(request)),
    notified,
  });

  return NextResponse.json({
    ok: true,
    message: "Merci ! Mme Abir vous recontacte très rapidement.",
    whatsappUrl:
      "https://wa.me/212777066590?text=Bonjour%2C%20je%20souhaite%20un%20diagnostic%20gratuit%20pour%20mes%20commandes%20e-commerce",
  });
}
