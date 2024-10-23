declare namespace Spotify {
	interface PlaybackState {
		timestamp: number;
	}
}

declare module '*.svg' {
	const contents: string;
	export default contents;
}
