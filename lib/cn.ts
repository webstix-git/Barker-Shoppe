/** Tiny class-name joiner. Keeps conditional Tailwind lists readable. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
