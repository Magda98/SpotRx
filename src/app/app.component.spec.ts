import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { QueryClient, provideAngularQuery } from '@tanstack/angular-query-experimental';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthData } from './shared/interfaces/authData';
import { fireEvent, render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app-routes';
import { provideRouter } from '@angular/router';
import { MockBackendInterceptor } from '@tests/mock-backend.interceptor';

describe('AppComponent', () => {
	const mockAuthService = createMockWithValues(AuthService, {
		loggedIn: new ReplaySubject<boolean>(),
		authData: new BehaviorSubject<AuthData | undefined>(undefined),
	});
	const renderComponent = () =>
		render(AppComponent, {
			componentProviders: [
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
				provideRouter(routes),
				provideAngularQuery(new QueryClient()),
				{
					provide: HTTP_INTERCEPTORS,
					useClass: MockBackendInterceptor,
					multi: true,
				},
			],
		});

	test('should render', async () => {
		const component = await renderComponent();
		component.detectChanges();
		await screen.findByRole('main');
		expect(component.container).toMatchSnapshot();
	});

	test('should render loggin screen', async () => {
		const component = await renderComponent();
		mockAuthService.loggedIn.next(false);
		component.detectChanges();
		expect(screen.getByText('Spotrx')).toBeInTheDocument();
	});

	test('should render main app container', async () => {
		mockAuthService.loggedIn.next(false);
		const component = await renderComponent();
		component.detectChanges();
		expect(await screen.findByRole('main')).toBeInTheDocument();
	});

	test('should navigate', async () => {
		mockAuthService.loggedIn.next(true);
		const component = await renderComponent();
		component.detectChanges();
		expect(screen.queryByText(/Saved tracks/i)).not.toBeInTheDocument();

		fireEvent.click(await screen.findByRole('link', { name: /Saved/i }));
		expect(await screen.findByRole('heading', { name: /Saved tracks/i })).toBeInTheDocument();

		fireEvent.click(await screen.findByRole('link', { name: /Home/i }));
		expect(await screen.findByRole('heading', { name: /Home/i })).toBeInTheDocument();

		fireEvent.click(await screen.findByRole('link', { name: /Home/i }));
		expect(await screen.findByRole('heading', { name: /Home/i })).toBeInTheDocument();

		fireEvent.click(await screen.findByRole('link', { name: /Dua Lipa/i }));
		component.detectChanges();
		expect(await screen.findByRole('heading', { name: /Dua Lipa/i })).toBeInTheDocument();
	});
});
