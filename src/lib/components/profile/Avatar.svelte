<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		fallback: string;
	}

	let { src, alt, fallback }: Props = $props();

	// Graceful degradation: if the asset 404s, show initials instead of a
	// broken image. `failed` flips once and never triggers another load.
	let failed = $state(false);
</script>

<div
	class="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-full bg-[var(--surface-2)] ring-4 ring-[var(--surface)] shadow-lg"
>
	{#if failed}
		<span class="text-2xl font-semibold text-[var(--text-2)]">{fallback}</span>
	{:else}
		<img
			{src}
			{alt}
			width="96"
			height="96"
			loading="eager"
			fetchpriority="high"
			decoding="async"
			class="size-full object-cover"
			onerror={() => (failed = true)}
		/>
	{/if}
</div>
