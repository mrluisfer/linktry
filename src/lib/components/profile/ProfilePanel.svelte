<script lang="ts">
	import type { ProfileContent } from '$lib/types';
	import { site } from '$lib/config';
	import Avatar from './Avatar.svelte';
	import ProfileDetail from './ProfileDetail.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import RepoButton from './RepoButton.svelte';

	let { profile }: { profile: ProfileContent } = $props();
</script>

<aside
	class="flex flex-col gap-6 lg:sticky lg:top-8 lg:h-fit lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-2"
>
	<div class="flex items-start justify-between gap-4">
		<Avatar src={profile.avatar.src} alt={profile.avatar.alt} fallback={profile.avatar.fallback} />
		<ThemeToggle />
	</div>

	<div class="flex flex-col gap-2">
		<h1 class="text-3xl font-semibold tracking-tight text-[var(--text)]">
			{profile.name}
		</h1>
		<p class="text-sm font-medium text-[var(--accent-brand)]">{profile.role}</p>
		<p class="mt-1 max-w-md text-balance text-[var(--text-2)]">{profile.description}</p>
	</div>

	<div class="flex flex-col gap-1 border-t border-[var(--border)] pt-5">
		{#each profile.details as detail (detail.id)}
			<ProfileDetail {detail} />
		{/each}
	</div>

	<div
		class="mt-1 flex flex-wrap items-center justify-center gap-2.5 lg:flex-col lg:items-start lg:justify-start"
	>
		<a
			href={profile.websiteUrl}
			target="_blank"
			rel="noreferrer"
			class="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--surface)] transition-transform hover:-translate-y-0.5"
		>
			Visit website
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M7 7h10v10M7 17 17 7" />
			</svg>
		</a>

		<RepoButton url={site.repositoryUrl} />
	</div>
</aside>
