import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';
import { User } from '../interfaces/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

describe('AppComponent', () => {
  const userData: User = {
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

  test('should contain user-name', async () => {
    await render(NavComponent, {
      componentInputs: { userData: userData },
      componentImports: [
        IconComponent,
        RouterModule,
        MatIconModule,
        CommonModule,
      ],
      imports: [HttpClientTestingModule],
      providers: [provideAngularQuery(new QueryClient())],
    });

    expect(screen.getByText(userData.display_name)).toBeInTheDocument();
  });

  test('should display user avatar', async () => {
    await render(NavComponent, {
      componentInputs: { userData: userData },
      componentImports: [
        IconComponent,
        RouterModule,
        MatIconModule,
        CommonModule,
      ],
      imports: [HttpClientTestingModule],
      providers: [provideAngularQuery(new QueryClient())],
    });

    expect(screen.getByAltText('user avatar')).toBeInTheDocument();
  });
});
