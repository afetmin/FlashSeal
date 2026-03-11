import { getTranslator } from "../../i18n";

interface Env {
  SECRETS: KVNamespace;
}

interface SecretRecord {
  kind: "text" | "image";
  ciphertext: string;
  iv: string;
  mimeType: string;
  createdAt: number;
  viewState: "unopened" | "viewing";
  viewStartedAt: number | null;
}

const VIEW_CLEANUP_TTL_IN_SECONDS = 60;

export async function onRequestPost(context: {
  request: Request;
  env: Env;
  params: { id?: string };
}) {
  const { request, env, params } = context;
  const t = getTranslator(request);
  const id = params.id;

  if (!id) {
    return json({ error: t("missingSecretId"), code: "missing_secret_id" }, 400);
  }

  const raw = await env.SECRETS.get(id);
  if (!raw) {
    return json({ error: t("secretMissing"), code: "secret_missing" }, 404);
  }

  const record = JSON.parse(raw) as SecretRecord;

  if (record.viewState !== "unopened") {
    return json({ error: t("secretOpened"), code: "secret_opened" }, 410);
  }

  record.viewState = "viewing";
  record.viewStartedAt = Date.now();

  await env.SECRETS.put(id, JSON.stringify(record), {
    expirationTtl: VIEW_CLEANUP_TTL_IN_SECONDS
  });

  return json(
    {
      success: true,
      kind: record.kind,
      ciphertext: record.ciphertext,
      iv: record.iv,
      mimeType: record.mimeType
    },
    200
  );
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
