<script lang="ts">
	import type { CardSection } from '$lib/types';
	import Section from './Section.svelte';

	let { sections }: { sections: CardSection[] } = $props();
</script>

<div class="flex flex-col gap-10">
	{#each sections as section (section.id)}
		<Section {section} />
	{/each}
</div>
