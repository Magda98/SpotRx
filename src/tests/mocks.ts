import {
  FeaturedPlaylistResponse,
  Playlist,
  PlaylistResponse,
} from 'src/app/interfaces/playlist';
import { User } from 'src/app/interfaces/user';

export const user: User = {
  display_name: 'pieceofsth7',
  external_urls: {
    spotify: 'https://open.spotify.com/user/f2o7vc8wi9351bcn76igbhe2i',
  },
  href: 'https://api.spotify.com/v1/users/f2o7vc8wi9351bcn76igbhe2i',
  id: 'f2o7vc8wi9351bcn76igbhe2i',
  images: [
    {
      url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2046809475373475&height=50&width=50&ext=1711003338&hash=AfrKCTPEXL-APstaCRqb6iOzqjl5RHKOwdXRP0WTcNeYdQ',
      height: 64,
      width: 64,
    },
    {
      url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2046809475373475&height=300&width=300&ext=1711003338&hash=AfqKpNyFIAuS_M4gwqL8eAZNp2fgALFMnqTRsvVRRG4E5g',
      height: 300,
      width: 300,
    },
  ],
  type: 'user',
  uri: 'spotify:user:f2o7vc8wi9351bcn76igbhe2i',
  followers: {
    total: 7,
  },
  country: 'PL',
  product: 'premium',
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  email: 'magdakochman7@gmail.com',
};

export const playlistsResponse: PlaylistResponse = {
  total: 2,
  limit: 12,
  offset: 0,
  items: [
    {
      href: 'https://api.spotify.com/v1/playlists/50Gsv3p7qLLPVzfPBu8UcO',
      id: '50Gsv3p7qLLPVzfPBu8UcO',
      images: [
        {
          height: 640,
          url: 'https://mosaic.scdn.co/640/ab67616d0000b273372cd9cefda2a6d3d11428fcab67616d0000b2734246e3158421f5abb75abc4fab67616d0000b2735ebcbbc6940d285ccd96e963ab67616d0000b273d1410c1372fab1e516328fa8',
          width: 640,
        },
        {
          height: 300,
          url: 'https://mosaic.scdn.co/300/ab67616d0000b273372cd9cefda2a6d3d11428fcab67616d0000b2734246e3158421f5abb75abc4fab67616d0000b2735ebcbbc6940d285ccd96e963ab67616d0000b273d1410c1372fab1e516328fa8',
          width: 300,
        },
        {
          height: 60,
          url: 'https://mosaic.scdn.co/60/ab67616d0000b273372cd9cefda2a6d3d11428fcab67616d0000b2734246e3158421f5abb75abc4fab67616d0000b2735ebcbbc6940d285ccd96e963ab67616d0000b273d1410c1372fab1e516328fa8',
          width: 60,
        },
      ],
      name: 'święta swięta 🎄',
      type: 'playlist',
      uri: 'spotify:playlist:50Gsv3p7qLLPVzfPBu8UcO',
    },
    {
      href: 'https://api.spotify.com/v1/playlists/3nl9GNcLS5xW883RgPypFL',
      id: '3nl9GNcLS5xW883RgPypFL',
      images: [
        {
          height: 640,
          url: 'https://mosaic.scdn.co/640/ab67616d0000b2732172b607853fa89cefa2beb4ab67616d0000b2734bc66095f8a70bc4e6593f4fab67616d0000b273838698485511bd9108fadadcab67616d0000b273ccdddb2e5349ea0608c3e016',
          width: 640,
        },
        {
          height: 300,
          url: 'https://mosaic.scdn.co/300/ab67616d0000b2732172b607853fa89cefa2beb4ab67616d0000b2734bc66095f8a70bc4e6593f4fab67616d0000b273838698485511bd9108fadadcab67616d0000b273ccdddb2e5349ea0608c3e016',
          width: 300,
        },
        {
          height: 60,
          url: 'https://mosaic.scdn.co/60/ab67616d0000b2732172b607853fa89cefa2beb4ab67616d0000b2734bc66095f8a70bc4e6593f4fab67616d0000b273838698485511bd9108fadadcab67616d0000b273ccdddb2e5349ea0608c3e016',
          width: 60,
        },
      ],
      name: 'Dua Lipa 🍑💫🔥',
      type: 'playlist',
      uri: 'spotify:playlist:3nl9GNcLS5xW883RgPypFL',
    },
  ],
};

export const playlist: Playlist = {
  id: '50Gsv3p7qLLPVzfPBu8UcO',
  href: 'https://api.spotify.com/v1/playlists/50Gsv3p7qLLPVzfPBu8UcO?locale=en-US%2Cen%3Bq%3D0.9%2Cpl-PL%3Bq%3D0.8%2Cpl%3Bq%3D0.7',
  images: [
    {
      height: 640,
      url: 'https://mosaic.scdn.co/640/ab67616d00001e02372cd9cefda2a6d3d11428fcab67616d00001e024246e3158421f5abb75abc4fab67616d00001e025ebcbbc6940d285ccd96e963ab67616d00001e02d1410c1372fab1e516328fa8',
      width: 640,
    },
    {
      height: 300,
      url: 'https://mosaic.scdn.co/300/ab67616d00001e02372cd9cefda2a6d3d11428fcab67616d00001e024246e3158421f5abb75abc4fab67616d00001e025ebcbbc6940d285ccd96e963ab67616d00001e02d1410c1372fab1e516328fa8',
      width: 300,
    },
    {
      height: 60,
      url: 'https://mosaic.scdn.co/60/ab67616d00001e02372cd9cefda2a6d3d11428fcab67616d00001e024246e3158421f5abb75abc4fab67616d00001e025ebcbbc6940d285ccd96e963ab67616d00001e02d1410c1372fab1e516328fa8',
      width: 60,
    },
  ],
  name: 'Dua Lipa 🍑💫🔥',
  tracks: {
    href: 'https://api.spotify.com/v1/playlists/50Gsv3p7qLLPVzfPBu8UcO/tracks?offset=0&limit=100&locale=en-US%2Cen%3Bq%3D0.9%2Cpl-PL%3Bq%3D0.8%2Cpl%3Bq%3D0.7',
    items: [
      {
        added_at: '2021-11-25T07:44:16Z',
        track: {
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b273d1410c1372fab1e516328fa8',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02d1410c1372fab1e516328fa8',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00004851d1410c1372fab1e516328fa8',
                width: 64,
                height: 64,
              },
            ],
            name: 'Everyday Is Christmas (Deluxe Edition)',
          },
          artists: [
            {
              id: '5WUlDfRSoLAfcVSX1WnrxN',
              name: 'Sia',
              uri: 'spotify:artist:5WUlDfRSoLAfcVSX1WnrxN',
            },
          ],
          duration_ms: 206539,

          id: '1N1ZpYUJc9fwrqk53FGgWv',
          name: "Santa's Coming for Us",
          uri: 'spotify:track:1N1ZpYUJc9fwrqk53FGgWv',
        },
      },
    ],
    limit: 100,
    offset: 0,
    total: 1,
    next: '',
    previous: '',
  },
  type: 'playlist',
  uri: 'spotify:playlist:50Gsv3p7qLLPVzfPBu8UcO',
};

export const featuredPlaylists: FeaturedPlaylistResponse = {
  message: 'Popular Playlists',
  playlists: {
    items: [
      {
        description:
          'Największe rapowe kawałki w tej chwili. Cover: Otsochodzi',
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWXJnyndhASBe',
        id: '37i9dQZF1DWXJnyndhASBe',
        images: [
          {
            height: null,
            url: 'https://i.scdn.co/image/ab67706f000000022853dbf3a386ff35d0e95867',
            width: null,
          },
        ],
        name: 'RAP GENERACJA',
        primary_color: '#ffffff',
        type: 'playlist',
        uri: 'spotify:playlist:37i9dQZF1DWXJnyndhASBe',
      },
      {
        description: '50 najgorętszych hitów w Polsce. Cover: Kizo, Bletka',
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX49bSMRljsho',
        id: '37i9dQZF1DX49bSMRljsho',
        images: [
          {
            height: null,
            url: 'https://i.scdn.co/image/ab67706f00000002419aba98b988e66b49397503',
            width: null,
          },
        ],
        name: 'Hot Hits Polska',
        primary_color: '#ffffff',
        type: 'playlist',
        uri: 'spotify:playlist:37i9dQZF1DX49bSMRljsho',
      },
      {
        description: '🤰🏻🤰🏻🤰🏻🤰🏻🤰🏻 cover: Fagata',
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX35mEXECRn6o',
        id: '37i9dQZF1DX35mEXECRn6o',
        images: [
          {
            height: null,
            url: 'https://i.scdn.co/image/ab67706f0000000256022bab9d8032623325602c',
            width: null,
          },
        ],
        name: 'viral rap',
        primary_color: '#3ffc04',
        type: 'playlist',
        uri: 'spotify:playlist:37i9dQZF1DX35mEXECRn6o',
      },
      {
        description: 'Playlista pełna radiowych przebojów ostatnich miesięcy.',
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX99QlO9EobD7',
        id: '37i9dQZF1DX99QlO9EobD7',
        images: [
          {
            height: null,
            url: 'https://i.scdn.co/image/ab67706f000000028b3b83b2962b242445ad0ea0',
            width: null,
          },
        ],
        name: 'Hity z radia 2024',
        primary_color: '#ffffff',
        type: 'playlist',
        uri: 'spotify:playlist:37i9dQZF1DX99QlO9EobD7',
      },
    ],
    limit: 12,
    offset: 0,
    total: 100,
  },
};
