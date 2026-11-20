import { BUSINESS } from "../data/businessInfo.ts";

// Check only the retired office number. Articles can legitimately cite other contacts.
const retiredPhone = /(?<!\d)(?:(tel:|sms:|wa\.me\/))?(?:\+?1[\s.()-]*)?\(?672\)?[\s.()-]*514[\s.()-]*7587(?!\d)/gi;

export function containsRetiredBusinessPhone(value: string): boolean {
  return value.search(retiredPhone) !== -1;
}

export function replaceRetiredBusinessPhone(value: string): string {
  return value.replace(retiredPhone, (_match, scheme: string | undefined) => {
    if (!scheme) return BUSINESS.phone;
    return scheme + (scheme.toLowerCase() === "wa.me/" ? BUSINESS.whatsappE164.slice(1) : BUSINESS.phoneE164);
  });
}
