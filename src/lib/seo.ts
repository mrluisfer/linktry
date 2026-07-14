import type { AppContent, LinkCardItem } from './types';
import { site } from './config';

/**
 * SEO is derived, never hand-maintained: everything below is computed from the
 * same `content` object that renders the page, so the metadata, social cards
 * and structured data can never drift out of sync with what a visitor sees.
 */

export interface SeoData {
	title: string;
	description: string;
	keywords: string;
	canonical: string;
	image: string;
	imageAlt: string;
	author: string;
	twitter: string;
	/** Fully-built schema.org JSON-LD graph, ready to serialize. */
	jsonLd: Record<string, unknown>;
}

/** Resolves a possibly-relative path against the configured site origin. */
export function absolute(path: string): string {
	if (/^https?:\/\//.test(path) || path.startsWith('mailto:')) return path;
	return new URL(path, site.url).href;
}

function linkItems(content: AppContent, sectionId: string): LinkCardItem[] {
	const section = content.sections.find((s) => s.id === sectionId);
	return (section?.items ?? []).filter((i): i is LinkCardItem => i.type === 'link');
}

/** Topics the person is associated with — feeds `Person.knowsAbout` and keywords. */
const EXPERTISE = [
	'Frontend Engineering',
	'React',
	'TypeScript',
	'JavaScript',
	'Node.js',
	'SvelteKit',
	'Web Performance',
	'UI Engineering',
	'Web Development'
];

export function buildSeo(content: AppContent): SeoData {
	const { profile } = content;

	const title = `${profile.name} — ${profile.role}`;
	const description = profile.description;
	const image = absolute(profile.avatar.src);
	const canonical = `${site.url}/`;

	// `sameAs` links a person's identities across the web — one of the strongest
	// signals for Google's Knowledge Graph. We use every social + work profile.
	const sameAs = [...linkItems(content, 'social'), ...linkItems(content, 'work')].map((i) => i.url);

	const emailDetail = profile.details.find((d) => d.icon === 'mail');
	const email = emailDetail?.href ?? (emailDetail ? `mailto:${emailDetail.text}` : undefined);

	// Each shipped project becomes a discoverable CreativeWork authored by the person.
	const projects = linkItems(content, 'projects').map((p) => ({
		'@type': 'CreativeWork',
		name: p.title ?? p.platform,
		url: p.url,
		author: { '@id': `${site.url}#person` },
		...(p.subtitle ? { description: p.subtitle } : {})
	}));

	const person = {
		'@type': 'Person',
		'@id': `${site.url}#person`,
		name: profile.name,
		alternateName: site.twitter.replace('@', ''),
		url: absolute(profile.websiteUrl),
		image: { '@type': 'ImageObject', url: image, caption: profile.avatar.alt },
		jobTitle: profile.role,
		description,
		knowsAbout: EXPERTISE,
		sameAs,
		address: { '@type': 'PostalAddress', addressCountry: site.country },
		...(email ? { email } : {})
	};

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${site.url}#website`,
				url: `${site.url}/`,
				name: site.name,
				inLanguage: 'en',
				publisher: { '@id': `${site.url}#person` }
			},
			{
				'@type': 'ProfilePage',
				'@id': `${site.url}#profilepage`,
				url: canonical,
				name: title,
				description,
				inLanguage: 'en',
				isPartOf: { '@id': `${site.url}#website` },
				about: { '@id': `${site.url}#person` },
				mainEntity: { '@id': `${site.url}#person` },
				primaryImageOfPage: { '@type': 'ImageObject', url: image }
			},
			person,
			...projects
		]
	};

	return {
		title,
		description,
		keywords: [...EXPERTISE, 'portfolio', 'link in bio', 'bento'].join(', '),
		canonical,
		image,
		imageAlt: profile.avatar.alt,
		author: profile.name,
		twitter: site.twitter,
		jsonLd
	};
}
