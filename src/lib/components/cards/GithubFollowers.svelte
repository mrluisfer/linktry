<script lang="ts">
	import { formatCount } from '$lib/utils/format';

	interface Props {
		username: string;
		/** Shown during SSR/prerender and while the live value is loading. */
		fallback?: number | string;
	}

	let { username, fallback }: Props = $props();

	// Live follower count from the public GitHub REST API. Client-only and
	// unauthenticated (60 req/h per IP) — on any failure we keep the fallback,
	// so the card is never blocked or broken by the network.
	let followers = $state<number | null>(null);

	$effect(() => {
		const controller = new AbortController();

		fetch(`https://api.github.com/users/${username}`, {
			signal: controller.signal,
			headers: { Accept: 'application/vnd.github+json' }
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
			.then((data: { followers?: number }) => {
				if (typeof data.followers === 'number') followers = data.followers;
			})
			.catch(() => {
				/* rate-limited / offline: keep fallback */
			});

		return () => controller.abort();
	});

	const value = $derived(followers ?? fallback);
</script>

{#if value != null}
	<div class="shrink-0 text-right">
		<p class="text-lg font-semibold leading-none text-[var(--text)]">{formatCount(value)}</p>
		<p class="mt-1 text-xs text-[var(--text-3)]">followers</p>
	</div>
{/if}
