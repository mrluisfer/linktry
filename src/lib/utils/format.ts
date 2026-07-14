/** Formats a follower count: numbers get compact notation, strings pass through. */
export function formatCount(value: number | string): string {
	if (typeof value === 'string') return value;
	return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
		value
	);
}
