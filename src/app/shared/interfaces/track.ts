import { Image } from './image';

export interface Track {
	uri: string;
	name: string;
	id: string;
	duration_ms: number;
	album: {
		id: string;
		name: string;
		images: Image[];
		artists?: Artist[];
		release_date?: string;
		release_date_precision?: string;
		total_tracks?: number;
		type?: 'album';
		uri?: string;
	};
	artists: Artist[];
}

export interface Artist {
	id: string;
	name: string;
	uri: string;
	href?: string;
	type?: 'artist';
}

export interface Item {
	added_at?: string;
	track: Track;
}

export interface TracksResponse<T = Item> {
	href: string;
	items: T[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}

export interface SearchResponse {
	tracks: {
		items: Track[];
	};
}

export interface Queue {
	queue: string[];
	index: number;
}
