import { Component, computed, inject, signal } from '@angular/core';
import { TrackListComponent } from '../../shared/components/track-list/track-list.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TrackService } from '../../shared/services/track.service';
import { PageEvent } from '@angular/material/paginator';
import { Item, TracksResponse } from '../../shared/interfaces/track';

@Component({
	selector: 'app-top-tracks',
	templateUrl: './top-tracks.component.html',
	styleUrls: ['./top-tracks.component.scss'],
	imports: [TrackListComponent],
})
export class TopTracksComponent {
	trackService = inject(TrackService);
	offset = signal(0);
	topTracksQuery = injectQuery(() => this.trackService.getTopTracks(this.offset()));
	topTracks = computed(() => {
		const topTracksResponse = this.topTracksQuery.data();
		if (!topTracksResponse) return;
		const mappedTracks: Item[] =
			topTracksResponse?.items.map((item) => ({
				track: item,
			})) ?? [];
		const mappedResponse: TracksResponse = {
			...topTracksResponse,
			items: mappedTracks,
		};
		return mappedResponse;
	});
	getNextPage(page: PageEvent) {
		this.offset.set(page.pageSize * page.pageIndex);
	}
}
