export const icons = {
	logo: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 66 66"><path fill="#fff" d="M33 0C14.775 0 0 14.775 0 33c0 18.226 14.775 33 33 33 18.227 0 33-14.774 33-33C66 14.776 51.227.002 33 .002V0Zm15.133 47.596a2.056 2.056 0 0 1-2.83.682c-7.747-4.733-17.5-5.805-28.988-3.18a2.058 2.058 0 0 1-.915-4.012c12.57-2.873 23.353-1.636 32.052 3.68.969.595 1.276 1.86.681 2.83Zm4.04-8.987a2.572 2.572 0 0 1-3.54.85c-8.87-5.454-22.39-7.033-32.883-3.849a2.576 2.576 0 0 1-3.21-1.714 2.577 2.577 0 0 1 1.715-3.209c11.985-3.636 26.884-1.875 37.07 4.385a2.572 2.572 0 0 1 .847 3.537Zm.346-9.357c-10.636-6.317-28.183-6.898-38.338-3.816a3.086 3.086 0 1 1-1.791-5.907c11.656-3.539 31.034-2.855 43.28 4.414a3.083 3.083 0 0 1 1.079 4.23 3.084 3.084 0 0 1-4.228 1.08h-.002Z"/></svg>',
	menu: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" color="currentColor"><path d="M4 18h16M4 12h16M4 6h16" stroke="#fff" stroke-width="2" stroke-linecap="round" /></svg>',
	heart:
		'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656Z" clip-rule="evenodd" /></svg>',
	heartOutline:
		'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0Z" /></svg>',
	shuffle:
		'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14 20v-2h2.6l-3.2-3.2l1.425-1.425L18 16.55V14h2v6h-6Zm-8.6 0L4 18.6L16.6 6H14V4h6v6h-2V7.4L5.4 20Zm3.775-9.425L4 5.4L5.4 4l5.175 5.175l-1.4 1.4Z" /></svg>',
} as const;

export type Icons = keyof typeof icons;
