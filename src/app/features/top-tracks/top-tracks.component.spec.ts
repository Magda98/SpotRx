import { render, waitForElementToBeRemoved, screen } from '@testing-library/angular';
import { TopTracksComponent } from './top-tracks.component';
import { QueryClient, provideAngularQuery } from '@tanstack/angular-query-experimental';
import { PlayerService } from '../../shared/services/player.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockBackendInterceptor } from '@tests/mock-backend.interceptor';

describe('TopTracksComponent', () => {
	test('should render', async () => {
		const component = await render(TopTracksComponent, {
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
				provideAngularQuery(new QueryClient()),
				PlayerService,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: MockBackendInterceptor,
					multi: true,
				},
			],
		});
		component.detectChanges();
		await waitForElementToBeRemoved(await screen.findAllByRole('progressbar'));
		expect(component.container).toMatchSnapshot();
	});
});
