/**
 * Site-level constants used by SEO (canonical URLs, social handles, locale).
 * Change `url` to your production domain after deploying — everything else
 * (Open Graph, Twitter cards, JSON-LD, sitemap) derives from it.
 */
export const site = {
	url: 'https://bento-mrluisfer.vercel.app',
	name: 'Luis Alvarez — Bento',
	shortName: 'Luis Alvarez',
	locale: 'en_US',
	twitter: '@mrluisfer_',
	/** ISO country of the person, used for structured data. */
	country: 'MX',
	/** Source repository for this project — powers the profile "View source" button. */
	repositoryUrl: 'https://github.com/mrluisfer/linktry'
} as const;
