export interface User {
    country: string,
    display_name: string,
    email: string,
    explicit_content: Record<string, boolean>,
    external_urls: Record<string, string>,
    followers: Record<string, number>,
    href: string,
    id: string,
    images: Image[],
    product: string,
    type: string,
    uri: string
}


interface Image{
    width: number,
    height: number,
    url: string
}