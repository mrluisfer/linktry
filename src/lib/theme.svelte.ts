import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'linktry-theme';

function initial(): Theme {
	if (!browser) return 'light';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Global theme state. `apply()` reflects it onto `<html data-theme>` and
 * persists the choice so there is no flash on the next visit (paired with the
 * inline bootstrap script in `app.html`).
 */
class ThemeState {
	current = $state<Theme>(initial());

	apply() {
		if (!browser) return;
		document.documentElement.dataset.theme = this.current;
		localStorage.setItem(STORAGE_KEY, this.current);
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		this.apply();
	}
}

export const theme = new ThemeState();
