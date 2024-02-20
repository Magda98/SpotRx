import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { AuthData } from './interfaces/authData';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';

describe('AppComponent', () => {
  const mockAuthService = createMockWithValues(AuthService, {
    loggedIn: new ReplaySubject<boolean>(),
    authData: new BehaviorSubject<AuthData | undefined>(undefined),
  });

  const mockUserService = createMockWithValues(UserService, {
    userDataRequest: () =>
      of<User>({
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
      }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        provideAngularQuery(new QueryClient()),
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('should render app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.app')).toBeTruthy();
  });

  test('should render login button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    mockAuthService.loggedIn.next(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button[aria-label="login"]')).toBeTruthy();
  });

  test('should render app-nav', () => {
    const fixture = TestBed.createComponent(AppComponent);
    mockAuthService.loggedIn.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-nav')).toBeTruthy();
  });
});
