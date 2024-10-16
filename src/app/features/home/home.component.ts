import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TrackService } from '@app/shared/services/track.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgOptimizedImage,
    NgxSkeletonLoaderModule,
  ],
})
export class HomeComponent {
  private trackService = inject(TrackService);
  public featuredPlaylists = injectQuery(() =>
    this.trackService.getFeaturedPlaylists(),
  );
  readonly skeletonLoadingArray = Array.from({ length: 12 }, () => null);
}
