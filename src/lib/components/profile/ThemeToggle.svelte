<script lang="ts">
	import { theme } from '$lib/theme.svelte';
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	class="grid size-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
	aria-label={theme.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title="Toggle theme"
>
	{#if theme.current === 'dark'}
		<!-- sun -->
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
			/>
		</svg>
	{:else}
		<!-- moon -->
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</svg>
	{/if}
</button>
