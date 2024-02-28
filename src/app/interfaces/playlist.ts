import { TracksResponse } from './track';
import { Image } from './image';

export interface Playlist {
  description?: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;
  primary_color?: string;
  tracks?: TracksResponse;
}

export interface PlaylistResponse {
  items: Playlist[];
  total: number;
  limit: number;
  offset: number;
}

export interface FeaturedPlaylistResponse {
  playlists: PlaylistResponse;
  message: string;
}
