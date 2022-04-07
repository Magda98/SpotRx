import { Image } from "./image"

export interface Playlist {
    href: string,
    id: string,
    images: Image[],
    name: string,
    type: string,
    uri: string,
}


export interface PlaylistResponse {
    items: Playlist[],
    total: number,
    
}