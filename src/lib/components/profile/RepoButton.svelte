<script lang="ts">
	import Icon from '../icons/Icon.svelte';
	import { formatCount } from '$lib/utils/format';

	interface Props {
		url: string;
		label?: string;
	}

	let { url, label = 'View source' }: Props = $props();

	// owner/repo slug for the GitHub REST API.
	const slug = $derived(url.replace(/^https?:\/\/github\.com\//, '').replace(/\/+$/, ''));

	// Live repository stats, client-only and unauthenticated. On any failure the
	// star badge simply stays hidden — the button always works as a plain link.
	let stars = $state<number | null>(null);
	let forks = $state<number | null>(null);

	$effect(() => {
		const controller = new AbortController();

		fetch(`https://api.github.com/repos/${slug}`, {
			signal: controller.signal,
			headers: { Accept: 'application/vnd.github+json' }
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
			.then((data: { stargazers_count?: number; forks_count?: number }) => {
				if (typeof data.stargazers_count === 'number') stars = data.stargazers_count;
				if (typeof data.forks_count === 'number') forks = data.forks_count;
			})
			.catch(() => {
				/* rate-limited / offline: render the button without stats */
			});

		return () => controller.abort();
	});
</script>

<a
	href={url}
	target="_blank"
	rel="noreferrer"
	class="group inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-transform hover:-translate-y-0.5"
>
	<Icon name="github" size={16} />
	<span>{label}</span>

	{#if stars !== null}
		<span
			class="ml-1 inline-flex items-center gap-1 rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-xs font-normal text-[var(--text-2)]"
			title="{stars} stars{forks !== null ? ` · ${forks} forks` : ''}"
		>
			<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path
					d="m12 2 2.9 6.26 6.86.55-5.23 4.47 1.6 6.7L12 16.9l-6.13 3.58 1.6-6.7L2.24 8.8l6.86-.55L12 2Z"
				/>
			</svg>
			{formatCount(stars)}
		</span>
	{/if}
</a>
