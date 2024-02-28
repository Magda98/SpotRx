import {
  FeaturedPlaylistResponse,
  Playlist,
  PlaylistResponse,
} from 'src/app/interfaces/playlist';
import { TracksResponse } from 'src/app/interfaces/track';
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
            id: '01sfgrNbnnPUEyz6GZYlt9',
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

export const savedTracks: TracksResponse = {
  href: 'https://api.spotify.com/v1/me/tracks?offset=0&limit=6&locale=en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7',
  items: [
    {
      added_at: '2024-02-24T11:26:25Z',
      track: {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP',
              id: '7tYKF4w9nC0nq9CsPZTHyP',
              name: 'SZA',
              type: 'artist',
              uri: 'spotify:artist:7tYKF4w9nC0nq9CsPZTHyP',
            },
          ],
          id: '1fmBMCSSkSlvxyoy1vut2k',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b273d70916ee9e40c90380ba5f07',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e02d70916ee9e40c90380ba5f07',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d00004851d70916ee9e40c90380ba5f07',
              width: 64,
            },
          ],
          name: 'Saturn',
          release_date: '2024-02-22',
          release_date_precision: 'day',
          total_tracks: 5,
          type: 'album',
          uri: 'spotify:album:1fmBMCSSkSlvxyoy1vut2k',
        },
        artists: [
          {
            id: '7tYKF4w9nC0nq9CsPZTHyP',
            name: 'SZA',
            uri: 'spotify:artist:7tYKF4w9nC0nq9CsPZTHyP',
          },
        ],

        duration_ms: 186191,
        id: '1bjeWoagtHmUKputLVyDxQ',
        name: 'Saturn',
        uri: 'spotify:track:1bjeWoagtHmUKputLVyDxQ',
      },
    },
    {
      added_at: '2024-02-19T10:16:10Z',
      track: {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0yb46jwm7gqbZXVXZQ8Z1e',
              id: '0yb46jwm7gqbZXVXZQ8Z1e',
              name: 'Bishop Briggs',
              type: 'artist',
              uri: 'spotify:artist:0yb46jwm7gqbZXVXZQ8Z1e',
            },
          ],
          id: '1TTxcgs3zEngN0EB56yXzY',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b2738cae5034066af45cdfbc4266',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e028cae5034066af45cdfbc4266',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d000048518cae5034066af45cdfbc4266',
              width: 64,
            },
          ],
          name: 'Church Of Scars',
          release_date: '2018-04-20',
          release_date_precision: 'day',
          total_tracks: 10,
          type: 'album',
          uri: 'spotify:album:1TTxcgs3zEngN0EB56yXzY',
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0yb46jwm7gqbZXVXZQ8Z1e',
            id: '0yb46jwm7gqbZXVXZQ8Z1e',
            name: 'Bishop Briggs',
            type: 'artist',
            uri: 'spotify:artist:0yb46jwm7gqbZXVXZQ8Z1e',
          },
        ],
        duration_ms: 216133,
        id: '3mRLHiSHYtC8Hk7bzZdUs1',
        name: 'River',
        uri: 'spotify:track:3mRLHiSHYtC8Hk7bzZdUs1',
      },
    },
    {
      added_at: '2024-02-19T10:02:31Z',
      track: {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0khqcsFxd6ans7Zh1JqraT',
              id: '0khqcsFxd6ans7Zh1JqraT',
              name: 'Croosh',
              type: 'artist',
              uri: 'spotify:artist:0khqcsFxd6ans7Zh1JqraT',
            },
          ],
          id: '1aweukI723QfBLT8sImfHK',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b27310311a15fdac768608fe224d',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e0210311a15fdac768608fe224d',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d0000485110311a15fdac768608fe224d',
              width: 64,
            },
          ],
          name: 'Daggers',
          release_date: '2023-11-15',
          release_date_precision: 'day',
          total_tracks: 1,
          type: 'album',
          uri: 'spotify:album:1aweukI723QfBLT8sImfHK',
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0khqcsFxd6ans7Zh1JqraT',
            id: '0khqcsFxd6ans7Zh1JqraT',
            name: 'Croosh',
            type: 'artist',
            uri: 'spotify:artist:0khqcsFxd6ans7Zh1JqraT',
          },
        ],
        duration_ms: 139320,
        id: '0fu2fafqUSNk0PKgOEvTgt',
        name: 'Daggers',
        uri: 'spotify:track:0fu2fafqUSNk0PKgOEvTgt',
      },
    },
    {
      added_at: '2024-02-19T09:34:30Z',
      track: {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0wiCfDEHaEcPkKZOi7Nivl',
              id: '0wiCfDEHaEcPkKZOi7Nivl',
              name: 'Yamê',
              type: 'artist',
              uri: 'spotify:artist:0wiCfDEHaEcPkKZOi7Nivl',
            },
          ],
          id: '7oBuvko8hsXKXHEUHvDXnB',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b2737dfba3f3ae607f250cdd969c',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e027dfba3f3ae607f250cdd969c',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d000048517dfba3f3ae607f250cdd969c',
              width: 64,
            },
          ],
          name: 'Bécane - A COLORS SHOW',
          release_date: '2023-06-01',
          release_date_precision: 'day',
          total_tracks: 1,
          type: 'album',
          uri: 'spotify:album:7oBuvko8hsXKXHEUHvDXnB',
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0wiCfDEHaEcPkKZOi7Nivl',
            id: '0wiCfDEHaEcPkKZOi7Nivl',
            name: 'Yamê',
            type: 'artist',
            uri: 'spotify:artist:0wiCfDEHaEcPkKZOi7Nivl',
          },
        ],

        duration_ms: 182440,
        id: '3oUEzTAoOxqZHN4xiqTGqJ',
        name: 'Bécane - A COLORS SHOW',
        uri: 'spotify:track:3oUEzTAoOxqZHN4xiqTGqJ',
      },
    },
    {
      added_at: '2024-01-26T22:39:23Z',
      track: {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/6vNe5MINTo5QZyR08sBOBA',
              id: '6vNe5MINTo5QZyR08sBOBA',
              name: 'Anna Naklab',
              type: 'artist',
              uri: 'spotify:artist:6vNe5MINTo5QZyR08sBOBA',
            },
            {
              href: 'https://api.spotify.com/v1/artists/61ipISvUVa5LkJlKZnm3Oo',
              id: '61ipISvUVa5LkJlKZnm3Oo',
              name: 'Alle Farben',
              type: 'artist',
              uri: 'spotify:artist:61ipISvUVa5LkJlKZnm3Oo',
            },
            {
              href: 'https://api.spotify.com/v1/artists/67ghKnycRX6VM1xfqJSMlH',
              id: '67ghKnycRX6VM1xfqJSMlH',
              name: 'YouNotUs',
              type: 'artist',
              uri: 'spotify:artist:67ghKnycRX6VM1xfqJSMlH',
            },
          ],
          id: '1anF1BUZXIUqdHz0hR7rqK',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b27360e18fbad67fc3c48608d03a',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e0260e18fbad67fc3c48608d03a',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d0000485160e18fbad67fc3c48608d03a',
              width: 64,
            },
          ],
          name: 'Supergirl (Radio Edit)',
          release_date: '2015-03-25',
          release_date_precision: 'day',
          total_tracks: 1,
          type: 'album',
          uri: 'spotify:album:1anF1BUZXIUqdHz0hR7rqK',
        },
        artists: [
          {
            id: '6vNe5MINTo5QZyR08sBOBA',
            name: 'Anna Naklab',
            uri: 'spotify:artist:6vNe5MINTo5QZyR08sBOBA',
          },
          {
            id: '61ipISvUVa5LkJlKZnm3Oo',
            name: 'Alle Farben',
            uri: 'spotify:artist:61ipISvUVa5LkJlKZnm3Oo',
          },
          {
            id: '67ghKnycRX6VM1xfqJSMlH',
            name: 'YouNotUs',
            uri: 'spotify:artist:67ghKnycRX6VM1xfqJSMlH',
          },
        ],

        duration_ms: 212826,
        id: '5wK2U8OltPg94tShNIzUZQ',
        name: 'Supergirl - Radio Edit',
        uri: 'spotify:track:5wK2U8OltPg94tShNIzUZQ',
      },
    },
    {
      added_at: '2023-12-30T14:52:15Z',
      track: {
        album: {
          artists: [
            {
              id: '3BmGtnKgCSGYIUhmivXKWX',
              name: 'Kelly Clarkson',
              uri: 'spotify:artist:3BmGtnKgCSGYIUhmivXKWX',
            },
          ],
          id: '5sVFXIMrFRKBtDOexVlBBU',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b2731fa667a7a53c7072fed91a17',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e021fa667a7a53c7072fed91a17',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d000048511fa667a7a53c7072fed91a17',
              width: 64,
            },
          ],
          name: 'When Christmas Comes Around...',
          release_date: '2021-10-15',
          release_date_precision: 'day',
          total_tracks: 15,
          type: 'album',
          uri: 'spotify:album:5sVFXIMrFRKBtDOexVlBBU',
        },
        artists: [
          {
            id: '3BmGtnKgCSGYIUhmivXKWX',
            name: 'Kelly Clarkson',
            uri: 'spotify:artist:3BmGtnKgCSGYIUhmivXKWX',
          },
          {
            id: '66CXWjxzNUsdJxJ2JdwvnR',
            name: 'Ariana Grande',
            uri: 'spotify:artist:66CXWjxzNUsdJxJ2JdwvnR',
          },
        ],

        duration_ms: 242644,
        id: '2O3MQ6H3gjrIWDcpeTrikT',
        name: 'Santa, Can’t You Hear Me',
        uri: 'spotify:track:2O3MQ6H3gjrIWDcpeTrikT',
      },
    },
  ],
  limit: 6,
  next: 'https://api.spotify.com/v1/me/tracks?offset=6&limit=6&locale=en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7',
  offset: 0,
  previous: null,
  total: 373,
};
