<script lang="ts">
	import type { CardItem } from '$lib/types';
	import LinkCard from './LinkCard.svelte';
	import YoutubeEmbedCard from './YoutubeEmbedCard.svelte';

	// Single dispatch point: the masonry never knows card internals, and adding
	// a new card `type` means one new branch here + one component.
	let { card }: { card: CardItem } = $props();
</script>

{#if card.type === 'link'}
	<LinkCard {card} />
{:else if card.type === 'youtube-embed'}
	<YoutubeEmbedCard {card} />
{/if}
