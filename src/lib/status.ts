import { DEFAULT_LANGUAGE, translations, type Translation } from "./translations.ts";

export type StatusKind = "" | "error" | "success";
export type StatusMessageKey = keyof Translation;
export type StatusState = { kind: StatusKind; message?: string; messageKey?: StatusMessageKey };

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
  if (status.messageKey) return t[status.messageKey];
  return status.message || "";
}
