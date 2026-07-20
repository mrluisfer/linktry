<script lang="ts">
	import type { ProfileDetail } from '$lib/types';
	import { reveal } from '$lib/actions/reveal';
	import Icon from '../icons/Icon.svelte';
	import { cn } from '$lib/utils/cn';

	let { detail }: { detail: ProfileDetail } = $props();

	let hoverTextColor = 'group-hover:text-blue-500';
</script>

{#snippet inner()}
	<span
		class={cn(
			'grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--text-2)] transition-colors',
			hoverTextColor
		)}
	>
		<Icon name={detail.icon} size={16} />
	</span>
	<span class={cn('text-sm leading-snug text-[var(--text-2)] transition-colors', hoverTextColor)}
		>{detail.text}</span
	>
{/snippet}

{#if detail.href}
	<a
		href={detail.href}
		use:reveal={{ animation: detail.animation, delay: detail.delay }}
		class="reveal group flex items-center gap-3 rounded-xl px-1 py-1 transition-colors hover:text-[var(--text)]"
		target={detail.href.startsWith('http') ? '_blank' : undefined}
		rel={detail.href.startsWith('http') ? 'noreferrer' : undefined}
	>
		{@render inner()}
	</a>
{:else}
	<div
		use:reveal={{ animation: detail.animation, delay: detail.delay }}
		class="reveal flex items-center gap-3 px-1 py-1"
	>
		{@render inner()}
	</div>
{/if}
