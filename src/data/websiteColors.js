import { get } from 'svelte/store';
import { __websiteTheme } from '$utils/stores';

window.websiteColors = {
	// theme 1 - light
	1: {
		// one-time use colors
		websiteBackground: '[#f3f3f3]', // arbitrary value (bg-[#f3f3f3])

		// homepage chapter cards, navbar, bottom nav, modals, dropdowns
		backgroundMain: 'white', // bg-white

		// homepage chapter name, navbar text, word translation/transliteration, verse translation/transliteration
		textNormal: 'black', // text-black

		// primary ranges
		primary100: 'gray-100',
		primary150: '[#ebebeb]',
		primary200: 'gray-200',
		primary400: 'gray-400',
		primary500: 'gray-500' // logo, tagline, homepage chapter's secondary details, homepage chapter's icons, links (boldness will be applied inline)
	},

	// theme 2 - dark
	2: {
		// one-time use colors
		websiteBackground: 'black', // arbitrary value (bg-[#f3f3f3])

		// homepage chapter cards, navbar, bottom nav, modals, dropdowns
		backgroundMain: 'black', // bg-white

		// homepage chapter name, navbar text, word translation/transliteration, verse translation/transliteration
		textNormal: 'white', // text-black

		// primary ranges
		primary100: 'gray-400',
		primary150: 'gray-500',
		primary200: 'gray-600',
		primary400: 'gray-600',
		primary500: 'gray-600' // logo, tagline, homepage chapter's secondary details, homepage chapter's icons, links (boldness will be applied inline)
	}
};

window.colors = window.websiteColors[get(__websiteTheme)];
