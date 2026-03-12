import type { Translation } from "./translations";

export const UNLOCK_DELAY_OPTIONS = [0, 5, 15, 30] as const;
const ONE_MINUTE_IN_MS = 60_000;

export type UnlockDelayMinutes = (typeof UNLOCK_DELAY_OPTIONS)[number];

export function isUnlockDelayMinutes(value: number): value is UnlockDelayMinutes {
  return UNLOCK_DELAY_OPTIONS.includes(value as UnlockDelayMinutes);
}

export function formatUnlockDelayOption(minutes: UnlockDelayMinutes, t: Pick<Translation, "delayImmediate" | "delayOptionMinutes">): string {
  if (minutes === 0) return t.delayImmediate;
  return interpolateTemplate(t.delayOptionMinutes, { minutes });
}

export function formatSecretLockedMessage(
  unlockAt: number,
  now: number,
  t: Pick<Translation, "secretLocked" | "secretLockedMinutes" | "secretLockedSoon">
): string {
  const remainingMinutes = getRemainingUnlockMinutes(unlockAt, now);
  if (remainingMinutes <= 1) return t.secretLockedSoon;
  return interpolateTemplate(t.secretLockedMinutes, { minutes: remainingMinutes });
}

export function getRemainingUnlockMinutes(unlockAt: number, now: number): number {
  return Math.ceil(Math.max(0, unlockAt - now) / ONE_MINUTE_IN_MS);
}

function interpolateTemplate(template: string, values: Record<string, number>): string {
  return Object.entries(values).reduce((message, [key, value]) => message.replace(`{${key}}`, String(value)), template);
}
