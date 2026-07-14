/**
 * Tiny class-name joiner. Kept dependency-free on purpose: the app never needs
 * Tailwind-class conflict resolution, so pulling in `clsx`/`tailwind-merge`
 * would only add weight to the bundle.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
	return values.filter(Boolean).join(' ');
}
