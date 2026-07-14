<script lang="ts">
	import { ICONS, hasIcon, type IconDef, type IconName } from './icons';

	interface Props {
		name: IconName | string;
		size?: number;
		class?: string;
	}

	let { name, size = 20, class: className = '' }: Props = $props();

	const def = $derived<IconDef | null>(hasIcon(name) ? ICONS[name as IconName] : null);
</script>

{#if def}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox={def.viewBox ?? '0 0 24 24'}
		width={size}
		height={size}
		fill={def.stroke ? 'none' : 'currentColor'}
		stroke={def.stroke ? 'currentColor' : 'none'}
		stroke-width={def.stroke ? 2 : undefined}
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}
		aria-hidden="true"
		focusable="false"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html def.body}
	</svg>
{/if}
