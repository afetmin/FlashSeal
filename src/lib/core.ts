import { DEFAULT_LANGUAGE, translations, type LanguageCode } from "./translations";

export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
export const SECRET_ID_LENGTH = 12;
export const SECRET_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
export const VIEW_DURATION_SECONDS = 60;
export const SITE_URL = "https://flashseal.space";
export const HOME_URL = `${SITE_URL}/`;
export const DEFAULT_ROBOTS = "index,follow,max-image-preview:large";
export const SECRET_ROBOTS = "noindex,nofollow,noarchive";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = "FlashSeal secure secret sharing preview";

export type SecretKind = "text" | "image";
export type Mode = "create" | "open";
export type ParsedSecretUrl = { id: string; key: string | null };
export type SecretPayload = { kind: SecretKind; mimeType: string; bytes: Uint8Array };

export function loadLanguage(): LanguageCode {
  const stored = localStorage.getItem("flashseal-language");
  if (stored && stored in translations) return stored as LanguageCode;
  const detected = navigator.language.toLowerCase();
  if (detected.startsWith("zh")) return "zh";
  if (detected.startsWith("ja")) return "ja";
  if (detected.startsWith("ko")) return "ko";
  return DEFAULT_LANGUAGE;
}

export function resolveInitialMode(): Mode {
  return window.location.pathname.match(/^\/s\/([^/]+)$/) ? "open" : "create";
}

export function randomId(length: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let value = "";
  for (let index = 0; index < length; index += 1) value += SECRET_ID_ALPHABET[bytes[index] % SECRET_ID_ALPHABET.length];
  return value;
}

export function parseSecretUrl(value: string): ParsedSecretUrl | null {
  try {
    const url = new URL(value || window.location.href, window.location.origin);
    const pathMatch = url.pathname.match(/^\/s\/([^/]+)$/);
    if (!pathMatch) return null;
    const hash = new URLSearchParams(url.hash.slice(1));
    return { id: pathMatch[1], key: hash.get("k") };
  } catch {
    return null;
  }
}

export async function readJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  if (!contentType.includes("application/json")) throw new Error(fallbackMessage);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(fallbackMessage);
  }
}

export function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export function formatBytes(size: number): string {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

export function extractImageFile(clipboardData: DataTransfer | null): File | null {
  const items = clipboardData?.items;
  if (!items) return null;
  for (const item of items) {
    if (item.kind !== "file" || !item.type.startsWith("image/")) continue;
    const file = item.getAsFile();
    if (file) return file;
  }
  return null;
}
