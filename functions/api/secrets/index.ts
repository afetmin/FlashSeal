import { getTranslator } from "../i18n";

interface Env {
  SECRETS: KVNamespace;
}

interface CreateSecretBody {
  id?: string;
  kind?: "text" | "image";
  ciphertext?: string;
  iv?: string;
  mimeType?: string;
  unlockDelayMinutes?: number;
}

interface SecretRecord {
  kind: "text" | "image";
  ciphertext: string;
  iv: string;
  mimeType: string;
  createdAt: number;
  unlockAt: number;
  viewState: "unopened" | "viewing";
  viewStartedAt: number | null;
}

const ONE_HOUR_IN_SECONDS = 3600;
const MAX_ENCRYPTED_PAYLOAD_BYTES = 21 * 1024 * 1024;
const VALID_UNLOCK_DELAY_MINUTES = [0, 5, 15, 30] as const;

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const t = getTranslator(request);

  let body: CreateSecretBody;

  try {
    body = await request.json<CreateSecretBody>();
  } catch {
    return json({ error: t("invalidJson"), code: "invalid_json" }, 400);
  }

  if (!body.id || !body.kind || !body.ciphertext || !body.iv || !body.mimeType) {
    return json({ error: t("missingSecretFields"), code: "missing_fields" }, 400);
  }

  if (body.kind !== "text" && body.kind !== "image") {
    return json({ error: t("invalidSecretKind"), code: "invalid_kind" }, 400);
  }

  if (!isValidUnlockDelayMinutes(body.unlockDelayMinutes)) {
    return json({ error: t("invalidUnlockDelay"), code: "invalid_unlock_delay" }, 400);
  }

  if (byteLength(body.ciphertext) > MAX_ENCRYPTED_PAYLOAD_BYTES) {
    return json({ error: t("payloadTooLarge"), code: "payload_too_large" }, 413);
  }

  const existing = await env.SECRETS.get(body.id);
  if (existing) {
    return json({ error: t("secretIdTaken"), code: "secret_id_taken" }, 409);
  }

  const createdAt = Date.now();
  const record: SecretRecord = {
    kind: body.kind,
    ciphertext: body.ciphertext,
    iv: body.iv,
    mimeType: body.mimeType,
    createdAt,
    unlockAt: createdAt + body.unlockDelayMinutes * 60_000,
    viewState: "unopened",
    viewStartedAt: null
  };

  await env.SECRETS.put(body.id, JSON.stringify(record), {
    expirationTtl: ONE_HOUR_IN_SECONDS
  });

  return json({ success: true, id: body.id }, 201);
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: corsHeaders()
  });
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function byteLength(value: string) {
  return new TextEncoder().encode(value).byteLength;
}

function isValidUnlockDelayMinutes(value: number | undefined): value is (typeof VALID_UNLOCK_DELAY_MINUTES)[number] {
  if (typeof value !== "number" || !Number.isInteger(value)) return false;
  return VALID_UNLOCK_DELAY_MINUTES.includes(value as (typeof VALID_UNLOCK_DELAY_MINUTES)[number]);
}
