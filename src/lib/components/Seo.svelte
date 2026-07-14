<script lang="ts">
	import { site } from '$lib/config';
	import type { SeoData } from '$lib/seo';

	let { seo }: { seo: SeoData } = $props();

	// Only the pure JSON payload lives here — escaping every "<" to its unicode
	// form guarantees it can never break out of the script wrapper assembled in
	// the markup below. The graph is author-controlled data.
	const payload = $derived(JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c'));

	// Interpolated tag name so no literal script open/close tag ever appears in
	// this source file — keeps every parser (compiler, svelte-check, eslint) happy.
	const tag = 'script';
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />
	<meta name="author" content={seo.author} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
	<link rel="canonical" href={seo.canonical} />

	<!-- Open Graph -->
	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={seo.canonical} />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:image:alt" content={seo.imageAlt} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.image} />
	<meta name="twitter:image:alt" content={seo.imageAlt} />
	<meta name="twitter:creator" content={seo.twitter} />

	<!-- Structured data (schema.org JSON-LD) -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<${tag} type="application/ld+json">${payload}</${tag}>`}
</svelte:head>
