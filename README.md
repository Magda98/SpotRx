# SpotRx

SpotRx is a web player for Spotify created using Angular. It provides users with a range of functionalities to enhance their Spotify experience, including authorization, user profile information, saved tracks, song search, user playlists, and recommended playlists.

## Features

- **Authorization**: SpotRx uses OAuth 2 with PKCE (Proof Key for Code Exchange) for secure and seamless authorization with Spotify. Users can log in to their Spotify accounts and grant SpotRx access to their music library.

- **Player** - Web Playback for Spotify, user can play songs, shuffle queue or change web player volume.

- **User Profile Info**: Once authorized, SpotRx retrieves and displays user profile information, including the user's name, profile picture, and follower count.

- **Saved Tracks**: Users can view and manage their saved tracks directly within the SpotRx application. This feature allows for easy access to favorite songs and personalized music collections.

- **Song Search**: SpotRx provides a search functionality that allows users to search for songs within the Spotify database. Users can find their favorite tracks, albums, or artists and listen to them seamlessly.

- **User Playlists**: SpotRx enables users to view and manage their playlists.

- **Recommended Playlists**: SpotRx leverages Spotify's recommendation algorithms to provide personalized playlist recommendations to users. These recommendations are based on the user's listening history and preferences.

## Deployment

SpotRx is deployed and accessible online. You can try it out at [https://magda98.github.io/SpotRx/](https://magda98.github.io/SpotRx/).

## Technologies Used

- [**Angular**](https://angular.dev/): SpotRx is built using the Angular framework in version 17 and use Signals, standalone components, new control flow etc. which provides a powerful and scalable platform for developing single-page applications.

- [**Angular Query**](https://tanstack.com/query/v5/docs/framework/angular/overview) powerful asynchronous state management for TS.
  
- [**Angular Testing Library**](https://testing-library.com/docs/angular-testing-library/intro) library used for unit testing.
  
- [**Playwright**](https://playwright.dev/) library used for end2end testing.
  
- [**Storybook**](https://storybook.js.org/) workshop for building UI components.

- [**Angualr Material**](https://material.angular.io/) - Material Design components for Angular.

- **OAuth 2 with PKCE**: The application uses OAuth 2 with PKCE for secure and authorized access to the Spotify API.

- [**Spotify API**](https://developer.spotify.com/documentation/web-api): SpotRx integrates with the Spotify API to fetch user data, including user profile information, saved tracks, and playlists.

- [**Deployment GitHubPages**](https://pages.github.com/): SpotRx is deployed using GitHub Pages, making it easily accessible to users on the web.

## Development Setup

To set up SpotRx for local development, follow these steps:

1. Clone the repository: `git clone https://github.com/Magda98/SpotRx.git`
2. Navigate to the project directory: `cd SpotRx`
3. Install the dependencies: `npm install`
4. Start the development server: `ng serve`
5. Open your browser and visit `http://localhost:4200` to access SpotRx locally.

## Screenshots from app

![image](https://github.com/Magda98/SpotRx/assets/33430525/9c3aca7f-f350-4f3b-9b0a-17c43665bb84)

![chrome_wxB6hL8eA3](https://github.com/Magda98/SpotRx/assets/33430525/c065fe81-f892-4907-b773-dab52e94b68e)


