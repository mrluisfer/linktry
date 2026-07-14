<script lang="ts">
	import { content } from '$lib';
	import { buildSeo } from '$lib/seo';
	import { theme } from '$lib/theme.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import ProfilePanel from '$lib/components/profile/ProfilePanel.svelte';
	import BentoBoard from '$lib/components/bento/BentoBoard.svelte';

	const { profile, sections } = content;
	const seo = buildSeo(content);

	// Keep <html data-theme> and storage in sync with the reactive state (also
	// covers the very first client render after hydration).
	$effect(() => {
		theme.apply();
	});
</script>

<Seo {seo} />

<main class="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
		<ProfilePanel {profile} />
		<BentoBoard {sections} />
	</div>

	<footer
		class="mt-16 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-3)]"
	>
		Built with SvelteKit · Bento-style profile — inspired by Bento.me, now part of Linktry.
	</footer>
</main>
