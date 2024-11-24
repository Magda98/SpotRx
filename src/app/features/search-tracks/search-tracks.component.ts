import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TrackComponent } from '@app/shared/components/track/track.component';
import { TrackService } from '@app/shared/services/track.service';
import { PlayerService } from '@app/shared/services/player.service';

@Component({
	selector: 'app-search-tracks',
	templateUrl: './search-tracks.component.html',
	styleUrls: ['./search-tracks.component.scss'],
	imports: [
		MatFormFieldModule,
		MatInputModule,
		NgxSkeletonLoaderModule,
		ReactiveFormsModule,
		TrackComponent,
	],
})
export class SearchTracksComponent {
	public trackService = inject(TrackService);
	private playerService = inject(PlayerService);
	public searchFromControl = new FormControl('');
	search = toSignal(
		this.searchFromControl.valueChanges.pipe(
			debounceTime(300),
			filter((searchValue) => !!searchValue?.length),
			distinctUntilChanged(),
			takeUntilDestroyed(),
		),
	);
	searchQuery = injectQuery(() => this.trackService.getSearchResults(this.search() ?? ''));
	readonly skeletonLoadingArray = Array.from({ length: 6 }, (_, index) => index);

	play(uri: string) {
		this.playerService.playSong([uri], 0);
	}
}
