<script lang="ts">
	import type { LinkCardItem } from '$lib/types';
	import Icon from '../icons/Icon.svelte';
	import CardImages from './CardImages.svelte';
	import GithubCalendar from './GithubCalendar.svelte';
	import GithubFollowers from './GithubFollowers.svelte';
	import { formatCount } from '$lib/utils/format';

	let { card }: { card: LinkCardItem } = $props();

	const github = $derived(card.rightContent?.type === 'github-calendar' ? card.rightContent : null);

	const accent = $derived(card.style?.gradient?.[0] ?? card.style?.accent ?? 'var(--accent-brand)');

	const badgeStyle = $derived(
		card.style?.gradient
			? `background:linear-gradient(135deg, ${card.style.gradient[0]}, ${card.style.gradient[1]})`
			: `background:${card.style?.accent ?? 'var(--accent-brand)'}`
	);

	const isCompact = $derived(card.style?.variant === 'compact');
	const heading = $derived(card.title ?? card.platform);
</script>

<a
	href={card.url}
	target="_blank"
	rel="noreferrer"
	style="--card-accent:{accent}; --card-fg:{card.style?.foreground ?? '#fff'}"
	aria-label="{heading} — {card.username}"
	class="card group/card"
>
	{#if isCompact}
		<div class="flex items-center justify-between">
			<span class="badge" style={badgeStyle}>
				<Icon name={card.icon} size={20} />
			</span>
			<span class="action-mini">
				<Icon name={card.actionIcon ?? 'external'} size={16} />
			</span>
		</div>
		<div class="mt-3">
			<p class="font-medium text-[var(--text)]">{card.platform}</p>
			<p class="truncate text-sm text-[var(--text-2)]">{card.username}</p>
		</div>
	{:else}
		<header class="flex items-start justify-between gap-3">
			<div class="flex min-w-0 items-center gap-3">
				<span class="badge" style={badgeStyle}>
					<Icon name={card.icon} size={22} />
				</span>
				<div class="min-w-0">
					<p class="truncate font-medium text-[var(--text)]">{heading}</p>
					<p class="truncate text-sm text-[var(--text-2)]">{card.username}</p>
				</div>
			</div>

			{#if github}
				<GithubFollowers username={github.username} fallback={card.followerCount} />
			{:else if card.followerCount != null}
				<div class="shrink-0 text-right">
					<p class="text-lg font-semibold leading-none text-[var(--text)]">
						{formatCount(card.followerCount)}
					</p>
					<p class="mt-1 text-xs text-[var(--text-3)]">
						{typeof card.followerCount === 'number' ? 'followers' : ''}
					</p>
				</div>
			{/if}
		</header>

		{#if github}
			<GithubCalendar config={github} />
		{/if}

		{#if card.images?.length}
			<CardImages images={card.images} single={card.singleImageMode} alt={heading} />
		{/if}

		{#if card.subtitle}
			<p class="text-sm leading-relaxed text-[var(--text-2)]">{card.subtitle}</p>
		{/if}

		{#if card.actionLabel}
			<span class="cta">
				{card.actionLabel}
				<Icon name={card.actionIcon ?? 'external'} size={15} />
			</span>
		{/if}
	{/if}
</a>
