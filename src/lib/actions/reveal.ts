import type { Action } from 'svelte/action';
import type { RevealAnimation } from '$lib/types';

interface RevealParams {
	animation?: RevealAnimation;
	delay?: number;
}

/**
 * Entrance animation on scroll, done the cheap way: a single shared
 * IntersectionObserver toggles `data-revealed`, and CSS does the actual motion
 * (transform/opacity only, so it stays on the compositor). No per-node timers,
 * no layout thrash. Respects `prefers-reduced-motion` by revealing instantly.
 */

const supportsIO = typeof IntersectionObserver !== 'undefined';

const reducedMotion =
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
	observer ??= new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					(entry.target as HTMLElement).dataset.revealed = 'true';
					observer?.unobserve(entry.target);
				}
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
	);
	return observer;
}

export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params = {}) => {
	node.dataset.reveal = params.animation ?? 'fadeUp';
	if (params.delay) node.style.setProperty('--reveal-delay', `${params.delay}s`);

	if (reducedMotion || !supportsIO) {
		node.dataset.revealed = 'true';
		return;
	}

	getObserver().observe(node);

	return {
		destroy() {
			observer?.unobserve(node);
		}
	};
};
