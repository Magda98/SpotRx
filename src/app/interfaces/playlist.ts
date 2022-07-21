import { TracksResponse } from './track';
import { Image } from "./image"

export interface Playlist {
    href: string,
    id: string,
    images: Image[],
    name: string,
    type: string,
    uri: string,
    tracks: TracksResponse
}


export interface PlaylistResponse {
    items: Playlist[],
    total: number,
}


export interface FeaturedPlaylistResponse {
    playlists: PlaylistResponse,
    message: string,
}