/**
 * Phone helpers using E.164 international format (+ and country code, digits only after +).
 * Default region is US (+1) for local 10-digit numbers.
 */

/** E.164: + followed by 8–15 digits, first digit 1–9. */
export const E164_PATTERN = /^\+[1-9]\d{7,14}$/;

/** Digits only (no +). */
function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Normalize a user-entered phone number to E.164.
 * - Already international (+…) → strip non-digits after +
 * - 11 digits starting with 1 → treat as US (+1…)
 * - 10 digits → treat as US local (+1…)
 * Returns null when the value cannot be normalized to valid E.164.
 */
export function toE164(value: string, defaultCountryCode = "1"): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("+")) {
    const candidate = `+${digitsOnly(trimmed)}`;
    return E164_PATTERN.test(candidate) ? candidate : null;
  }

  const digits = digitsOnly(trimmed);

  if (digits.length === 10) {
    const candidate = `+${defaultCountryCode}${digits}`;
    return E164_PATTERN.test(candidate) ? candidate : null;
  }

  if (digits.length === 11 && digits.startsWith(defaultCountryCode)) {
    const candidate = `+${digits}`;
    return E164_PATTERN.test(candidate) ? candidate : null;
  }

  // Other lengths with an explicit leading country feel (11–15 digits, no + typed)
  if (digits.length >= 11 && digits.length <= 15 && !digits.startsWith("0")) {
    const candidate = `+${digits}`;
    return E164_PATTERN.test(candidate) ? candidate : null;
  }

  return null;
}

/** True when the input can be normalized to E.164. */
export function isValidInternationalPhone(value: string): boolean {
  return toE164(value) !== null;
}

/** `tel:` href from an E.164 number or display string. */
export function telHref(value: string): string {
  const e164 = toE164(value);
  return e164 ? `tel:${e164}` : `tel:${digitsOnly(value)}`;
}

/**
 * Human-readable US-style display for +1 numbers; otherwise returns E.164.
 * Example: +14175011053 → (417) 501-1053
 */
export function formatPhoneDisplay(e164: string): string {
  if (!E164_PATTERN.test(e164)) return e164;
  if (e164.startsWith("+1") && e164.length === 12) {
    const area = e164.slice(2, 5);
    const mid = e164.slice(5, 8);
    const last = e164.slice(8);
    return `(${area}) ${mid}-${last}`;
  }
  return e164;
}
