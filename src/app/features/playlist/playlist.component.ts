import { ActivatedRoute } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TrackListComponent } from '@app/shared/components/track-list/track-list.component';
import { TrackService } from '@app/shared/services/track.service';

@Component({
	selector: 'app-playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.scss'],
	imports: [TrackListComponent, NgxSkeletonLoaderModule],
})
export class PlaylistComponent {
	private route = inject(ActivatedRoute);
	private trackService = inject(TrackService);
	offset = signal(0);
	playlistId = toSignal(
		this.route.paramMap.pipe(
			map((paramMap) => paramMap.get('id')),
			distinctUntilChanged(),
			tap(() => {
				this.offset.set(0);
			}),
		),
	);
	tracksQuery = injectQuery(() =>
		this.trackService.getPlaylistTracks(this.playlistId() ?? '', this.offset()),
	);
	playlistInfo = injectQuery(() => this.trackService.getPlaylistInfo(this.playlistId() ?? ''));

	getNextPage(page: PageEvent) {
		this.offset.set(page.pageSize * page.pageIndex);
	}
}
