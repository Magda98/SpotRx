import {Image} from "./user"

export interface Track {
    uri: string,
    name: string,
    id: string,
    album: {
        name: string,
        images: Image[],
    },
    artists: Artist[]
}

export interface Artist {
    id: string,
    name: string,
    uri: string
}

export interface Item {
    added_at: string,
    track: Track
}


export interface TracksResponse {
    href: string,
    items: Item[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
}