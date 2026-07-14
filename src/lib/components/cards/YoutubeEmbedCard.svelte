<script lang="ts">
	import type { YoutubeEmbedCardItem } from '$lib/types';

	let { card }: { card: YoutubeEmbedCardItem } = $props();

	// Facade pattern: render a lightweight poster first and only swap in the
	// heavy YouTube iframe on interaction. Keeps the initial page free of a
	// third-party embed and its scripts until the user actually wants to play.
	let active = $state(false);

	const videoId = $derived(card.url.split('/embed/')[1]?.split(/[?&]/)[0] ?? '');
	const poster = $derived(videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '');
	const src = $derived(`${card.url}${card.url.includes('?') ? '&' : '?'}autoplay=1`);
</script>

<div class="card card--flush" style="--card-accent:#FF0000">
	<div class="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
		{#if active}
			<iframe
				{src}
				title={card.title}
				class="size-full"
				allow="accelerated-download; autoplay; encrypted-media; picture-in-picture"
				allowfullscreen
				referrerpolicy="strict-origin-when-cross-origin"
			></iframe>
		{:else}
			<button
				type="button"
				onclick={() => (active = true)}
				class="group/yt absolute inset-0 grid place-items-center"
				aria-label="Play {card.title}"
			>
				{#if poster}
					<img
						src={poster}
						alt=""
						loading="lazy"
						decoding="async"
						class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover/yt:scale-105"
					/>
				{/if}
				<span class="absolute inset-0 bg-black/25"></span>
				<span
					class="relative grid size-16 place-items-center rounded-full bg-[#FF0000] text-white shadow-lg transition-transform group-hover/yt:scale-110"
				>
					<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M8 5v14l11-7z" />
					</svg>
				</span>
			</button>
		{/if}
	</div>
</div>
