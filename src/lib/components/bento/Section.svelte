<script lang="ts">
	import type { CardSection } from '$lib/types';
	import Masonry from './Masonry.svelte';

	let { section }: { section: CardSection } = $props();
</script>

<section aria-labelledby="section-{section.id}" class="flex flex-col gap-4">
	<h2
		id="section-{section.id}"
		class="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-3)]"
	>
		{section.label}
	</h2>
	<Masonry items={section.items} />
</section>
