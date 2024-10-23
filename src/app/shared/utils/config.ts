export const SPORIFY_SCOPES = [
	'user-read-private',
	'user-read-email',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-modify-playback-state',
	'streaming',
	'user-library-modify',
	'user-library-read',
	'user-top-read',
];

export const CLIENT_ID = '57a795ef5d9a4ccca747877d47fbc61d';

export const BASE_URL = 'https://api.spotify.com/v1/';

export const HEADER_CONFIG = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
};
