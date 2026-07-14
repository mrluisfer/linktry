import type { CardSection } from '$lib/types';

/**
 * Card content grouped by section. Each section renders as one masonry block.
 * Cards flow independently, so re-ordering, adding or removing a card is a pure
 * data edit — no layout math and no component changes required.
 */

const social: CardSection = {
	id: 'social',
	label: 'Social',
	items: [
		{
			id: 'instagram',
			type: 'link',
			platform: 'Instagram',
			username: '@mrluisfer_',
			url: 'https://www.instagram.com/mrluisfer_',
			icon: 'instagram',
			subtitle: 'instagram.com/mrluisfer_',
			images: [
				'/images/instagram/instagram1.webp',
				'/images/instagram/instagram2.webp',
				'/images/instagram/instagram3.webp',
				'/images/instagram/instagram4.webp'
			],
			followerCount: 65,
			actionLabel: 'Follow',
			style: { gradient: ['#f9ce34', '#ee2a7b'] }
		},
		{
			id: 'twitter',
			type: 'link',
			platform: 'Twitter',
			username: '@mrluisfer_',
			url: 'https://twitter.com/_mrluisfer',
			icon: 'twitter',
			actionIcon: 'at-sign',
			style: { accent: '#1DA1F2', variant: 'compact' }
		},
		{
			id: 'spotify',
			type: 'link',
			platform: 'Spotify',
			username: 'Deja que la música hable cuando las palabras no bastan',
			url: 'https://open.spotify.com/playlist/49spccWMHTuffh4NQiR4RN',
			icon: 'spotify',
			subtitle:
				'Sumérgete y deja que cada nota te recuerde que aún en la tormenta, existe belleza.',
			images: ['/images/spotify/playlist1.webp'],
			singleImageMode: true,
			actionLabel: 'Listen',
			actionIcon: 'audio-waveform',
			followerCount: '1,580 songs',
			style: { accent: '#1ED760' }
		},
		{
			id: 'github',
			type: 'link',
			platform: 'GitHub',
			username: 'mrluisfer',
			url: 'https://github.com/mrluisfer',
			icon: 'github',
			actionLabel: 'Follow',
			actionIcon: 'git-branch-plus',
			followerCount: 88,
			rightContent: { type: 'github-calendar', username: 'mrluisfer', weeks: 20 },
			style: { accent: '#24292F' }
		},
		{
			id: 'linkedin',
			type: 'link',
			platform: 'LinkedIn',
			username: 'mrluisfer',
			url: 'https://linkedin.com/in/mrluisfer/',
			icon: 'linkedin',
			subtitle: 'linkedin.com/in/mrluisfer',
			images: ['/images/linkedin-ss.webp'],
			singleImageMode: true,
			actionLabel: 'Connect',
			actionIcon: 'user',
			followerCount: 469,
			style: { accent: '#0A66C2' }
		},
		{
			id: 'twitch',
			type: 'link',
			platform: 'Twitch',
			username: 'mrluisfer',
			url: 'https://www.twitch.tv/mrluisfer_',
			icon: 'twitch',
			style: { accent: '#9146FF', variant: 'compact' }
		}
	]
};

const work: CardSection = {
	id: 'work',
	label: 'Work',
	items: [
		{
			id: 'portfolio',
			type: 'link',
			platform: 'Portfolio',
			username: 'Luis Alvarez',
			url: 'https://mrluisfer.vercel.app/',
			icon: 'portfolio',
			subtitle: 'mrluisfer.vercel.app',
			images: ['/images/portfolio-ss.webp'],
			singleImageMode: true,
			actionLabel: 'Visit',
			style: { accent: '#6366f1' }
		},
		{
			id: 'figma',
			type: 'link',
			platform: 'Figma',
			username: 'mrluisfeer',
			url: 'https://www.figma.com/@mrluisfeer',
			icon: 'figma',
			actionIcon: 'figma',
			style: { accent: '#252525', variant: 'compact' }
		},
		{
			id: 'leetcode',
			type: 'link',
			platform: 'LeetCode',
			username: 'mrluisfeer',
			url: 'https://leetcode.com/u/mrluisfeer/',
			icon: 'leetcode',
			actionIcon: 'code',
			style: { accent: '#1da09c', variant: 'compact' }
		},
		{
			id: 'youtube',
			type: 'youtube-embed',
			title: 'Featured video',
			url: 'https://www.youtube.com/embed/rR4n-0KYeKQ?si=yj4HPuCgKZz3OKLr'
		}
	]
};

const projects: CardSection = {
	id: 'projects',
	label: 'Projects',
	items: [
		{
			id: 'monfly',
			type: 'link',
			platform: 'Monfly',
			username: 'monfly.vercel.app',
			url: 'https://monfly.vercel.app',
			icon: 'monfly',
			title: 'Monfly',
			subtitle: 'Personal finance dashboard — track transactions, set budgets, visualize spending.',
			images: ['/images/projects/monfly.webp'],
			singleImageMode: true,
			actionLabel: 'Open project',
			style: { accent: '#d97757' } // Claude orange
		},
		{
			id: 'cusana',
			type: 'link',
			platform: 'Cusana',
			username: 'cusana.vercel.app',
			url: 'https://cusana.vercel.app',
			icon: 'cusana',
			title: 'Cusana',
			subtitle: 'Subscription tracker — multi-currency, billing calendar, analytics & exports.',
			images: ['/images/projects/cusana.webp'],
			singleImageMode: true,
			actionLabel: 'Open project',
			style: { accent: '#7c6cf0' } // blue / violet
		},
		{
			id: 'seo-generator',
			type: 'link',
			platform: 'SEO Generator',
			username: 'seo-generator.vercel.app',
			url: 'https://seo-generator.vercel.app/',
			icon: 'seo-generator',
			title: 'SEO Generator',
			subtitle:
				'Live SEO metadata previews for Google, Twitter, Facebook & more, with copy-ready meta tags and JSON-LD.',
			images: ['/images/projects/seo-generator.webp'],
			singleImageMode: true,
			actionLabel: 'Open project',
			style: { accent: '#4f46e5' } // indigo blue
		},
		{
			id: 'nvim',
			type: 'link',
			platform: 'nvim',
			username: 'github.com/mrluisfer/nvim',
			url: 'https://github.com/mrluisfer/nvim',
			icon: 'nvim',
			title: 'nvim',
			subtitle: 'Neovim setup tuned for Frontend & Backend dev — built on LazyVim, easy to adapt.',
			actionLabel: 'View source',
			style: { accent: '#57A143' },
			singleImageMode: true,
			images: ['/images/projects/nvim.webp']
		},
		{
			id: 'fm-challenges',
			type: 'link',
			platform: 'JS Challenges Hub',
			username: 'jschallenges-hub.vercel.app',
			url: 'https://jschallenges-hub.vercel.app/',
			icon: 'fm-challenges',
			title: 'JS Challenges Hub',
			subtitle:
				'Curated Frontend Mentor & CodeChallenges builds — one host, many exercises to sharpen JS skills.',
			images: ['/images/projects/fm-challenges.webp'],
			singleImageMode: true,
			actionLabel: 'Open project',
			style: { accent: '#f7df1e', foreground: '#18181b' } // JavaScript yellow, dark text for contrast
		},
		{
			id: 'la-reta',
			type: 'link',
			platform: 'La Reta',
			username: 'la-reta-credix.vercel.app',
			url: 'https://la-reta-credix.vercel.app/',
			icon: 'la-reta',
			title: 'La Reta',
			subtitle:
				'FIFA-style manager for pickup football — player cards, attribute ratings, live scoreboard & balanced-team generator.',
			images: ['/images/projects/la-reta.webp'],
			singleImageMode: true,
			actionLabel: 'Open project',
			style: { accent: '#00D492' }
		}
	]
};

export const sections: CardSection[] = [social, work, projects];
