import { DEFAULT_LANGUAGE, translations, type Translation } from "./translations.ts";

export type StatusKind = "" | "error" | "success";
export type StatusMessageKey = keyof Translation;
export type StatusState = { kind: StatusKind; message?: string; messageKey?: StatusMessageKey; messageValues?: Record<string, string | number> };

export function mapServerError(code: string | undefined, source: "create" | "open"): StatusMessageKey {
  if (code === "secret_locked") return "secretLocked";
  if (code === "secret_opened") return "secretOpened";
  if (code === "secret_missing") return "secretMissing";
  if (code === "payload_too_large") return "imageTooLarge";
  return source === "open" ? "openFailed" : "createFailed";
}

export function asStatusMessageKey(value: string | undefined): StatusMessageKey | undefined {
  if (!value) return undefined;
  return value in translations[DEFAULT_LANGUAGE] ? (value as StatusMessageKey) : undefined;
}

export function resolveStatusMessage(status: StatusState, t: Translation): string {
  if (status.messageKey) return interpolateStatusMessage(t[status.messageKey], status.messageValues);
  return status.message || "";
}

function interpolateStatusMessage(template: string, values?: Record<string, string | number>): string {
  if (!values) return template;
  return Object.entries(values).reduce((message, [key, value]) => message.replace(`{${key}}`, String(value)), template);
}
