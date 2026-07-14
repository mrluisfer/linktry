<script lang="ts">
	import type { CardItem } from '$lib/types';
	import CardRenderer from '../cards/CardRenderer.svelte';
	import { reveal } from '$lib/actions/reveal';

	let { items }: { items: CardItem[] } = $props();

	// True masonry via CSS multi-column: pure layout, no JS measuring loop, no
	// reflow on resize. Cards keep source order top-to-bottom within each column
	// and never split thanks to `break-inside-avoid`.
</script>

<div class="masonry">
	{#each items as item, i (item.id)}
		<div
			use:reveal={{ animation: 'fadeUp', delay: Math.min(i * 0.05, 0.3) }}
			class="reveal mb-4 break-inside-avoid"
		>
			<CardRenderer card={item} />
		</div>
	{/each}
</div>

<style>
	.masonry {
		column-gap: 1rem;
		columns: 1;
	}

	@media (min-width: 640px) {
		.masonry {
			columns: 2;
		}
	}
</style>
