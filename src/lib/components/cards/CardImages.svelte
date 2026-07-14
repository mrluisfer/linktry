<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	interface Props {
		images: string[];
		single?: boolean;
		alt: string;
	}

	let { images, single = false, alt }: Props = $props();

	// One image → 16:10 hero. Many → a 2-col mosaic. Broken assets collapse
	// out via a per-image `failed` set rather than showing a broken icon.
	const failed = new SvelteSet<string>();
	const visible = $derived(images.filter((src) => !failed.has(src)));

	function markFailed(src: string) {
		failed.add(src);
	}
</script>

{#if visible.length}
	<div
		class={[
			'overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)]',
			(single || visible.length === 1) && 'aspect-[16/10]'
		]}
	>
		{#if single || visible.length === 1}
			<img
				src={visible[0]}
				{alt}
				loading="lazy"
				decoding="async"
				class="size-full object-cover"
				onerror={() => markFailed(visible[0])}
			/>
		{:else}
			<div class="grid grid-cols-2 gap-1 p-1">
				{#each visible.slice(0, 4) as src (src)}
					<img
						{src}
						{alt}
						loading="lazy"
						decoding="async"
						class="aspect-square size-full rounded-md object-cover"
						onerror={() => markFailed(src)}
					/>
				{/each}
			</div>
		{/if}
	</div>
{/if}
