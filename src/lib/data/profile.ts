import type { ProfileContent } from '$lib/types';

export const profile: ProfileContent = {
	avatar: {
		src: '/profile.webp',
		alt: 'Retrato de Luis Alvarez',
		fallback: 'LA'
	},
	name: 'Luis Alvarez',
	role: 'Full Stack Developer',
	websiteUrl: 'https://mrluisfer.vercel.app/',
	description: 'Building the modern web applications using modern technologies.',
	details: [
		{
			id: 'location',
			text: 'Based in Mexico.',
			icon: 'map',
			animation: 'slideLeft',
			delay: 0.15
		},
		{
			id: 'quote',
			text: 'A ship in harbor is safe, but that is not what ships are built for.',
			icon: 'quote',
			animation: 'slideRight',
			delay: 0.25
		},
		{
			id: 'email',
			text: 'mrluisfeer@gmail.com',
			icon: 'mail',
			href: 'mailto:mrluisfeer@gmail.com',
			animation: 'blurIn',
			delay: 0.35
		}
	]
};
