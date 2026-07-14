/**
 * Domain model for the Bento profile.
 *
 * The whole page is data-driven: a single `AppContent` object describes the
 * profile (left column) and an arbitrary list of card sections (right masonry).
 * Rendering is fully decoupled from data, so adding a card or a section never
 * requires touching a component — only this contract and the data files.
 */

export type CardIconKey =
	| 'instagram'
	| 'twitter'
	| 'spotify'
	| 'github'
	| 'linkedin'
	| 'twitch'
	| 'figma'
	| 'leetcode'
	| 'portfolio'
	| 'youtube'
	| 'monfly'
	| 'cusana'
	| 'seo-generator'
	| 'nvim'
	| 'fm-challenges'
	| 'la-reta';

export type ActionIconKey =
	| 'external'
	| 'at-sign'
	| 'audio-waveform'
	| 'code'
	| 'figma'
	| 'git-branch-plus'
	| 'plus'
	| 'user';

export type ProfileIconKey = 'mail' | 'map' | 'quote' | 'portfolio';

/** Entrance animation applied by the `reveal` action when a node scrolls in. */
export type RevealAnimation = 'slideLeft' | 'slideRight' | 'blurIn' | 'fadeUp';

export interface ProfileDetail {
	id: string;
	text: string;
	icon: ProfileIconKey;
	href?: string;
	animation?: RevealAnimation;
	delay?: number;
}

export interface ProfileContent {
	avatar: { src: string; alt: string; fallback: string };
	name: string;
	role: string;
	websiteUrl: string;
	description: string;
	details: ProfileDetail[];
}

/** Optional embedded GitHub contribution graph rendered on the right of a card. */
export interface GithubCalendarConfig {
	type: 'github-calendar';
	username: string;
	weeks?: number;
}

export type CardRightContent = GithubCalendarConfig;

/** Visual accent for a card — drives the CTA color and the hover glow. */
export interface CardStyle {
	/** Solid accent (hex). Used when `gradient` is absent. */
	accent?: string;
	/** Two-stop gradient accent `[from, to]`. Takes precedence over `accent`. */
	gradient?: [string, string];
	/** Foreground drawn on top of the accent (badge icon, CTA text). Defaults to white; set it for light accents. */
	foreground?: string;
	/** `compact` renders a small square tile; `default` a full card. */
	variant?: 'default' | 'compact';
}

export interface LinkCardItem {
	id: string;
	type: 'link';
	platform: string;
	username: string;
	url: string;
	icon: CardIconKey;
	title?: string;
	subtitle?: string;
	actionLabel?: string;
	actionIcon?: ActionIconKey;
	followerCount?: number | string;
	images?: string[];
	singleImageMode?: boolean;
	rightContent?: CardRightContent;
	style?: CardStyle;
}

export interface YoutubeEmbedCardItem {
	id: string;
	type: 'youtube-embed';
	title: string;
	url: string;
}

export type CardItem = LinkCardItem | YoutubeEmbedCardItem;

export interface CardSection {
	id: string;
	label: string;
	items: CardItem[];
}

export interface AppContent {
	profile: ProfileContent;
	sections: CardSection[];
}
