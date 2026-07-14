<script lang="ts">
	import type { GithubCalendarConfig } from '$lib/types';

	let { config }: { config: GithubCalendarConfig } = $props();

	interface Day {
		date: string;
		count: number;
		level: number;
	}

	// Progressive enhancement: the graph is fetched client-side and simply does
	// not appear if the request fails — it never blocks or breaks the card.
	let days = $state<Day[]>([]);

	const LEVELS = ['var(--gh-0)', 'var(--gh-1)', 'var(--gh-2)', 'var(--gh-3)', 'var(--gh-4)'];

	$effect(() => {
		const controller = new AbortController();
		const weeks = config.weeks ?? 17;

		fetch(`https://github-contributions-api.jogruber.de/v4/${config.username}?y=last`, {
			signal: controller.signal
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
			.then((data: { contributions: Day[] }) => {
				days = data.contributions.slice(-weeks * 7);
			})
			.catch(() => {
				/* offline / rate-limited: leave the graph empty */
			});

		return () => controller.abort();
	});

	// Column-major weeks so CSS grid-flow lays out 7 rows (days) per column.
	const columns = $derived.by(() => {
		const cols: Day[][] = [];
		for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));
		return cols;
	});
</script>

{#if columns.length}
	<div class="flex gap-[3px]" aria-label="GitHub contributions in the last weeks">
		{#each columns as week, i (i)}
			<div class="flex flex-col gap-[3px]">
				{#each week as day (day.date)}
					<span
						class="size-[9px] rounded-[2px]"
						style="background:{LEVELS[day.level] ?? LEVELS[0]}"
						title="{day.count} contributions on {day.date}"
					></span>
				{/each}
			</div>
		{/each}
	</div>
{/if}
