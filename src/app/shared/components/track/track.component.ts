import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { Track } from '../../interfaces/track';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ButtonDirective } from '../../directives/button/button.directive';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [
    CommonModule,
    DurationPipe,
    NgOptimizedImage,
    NgxSkeletonLoaderModule,
    ButtonDirective,
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  track = input<Track>();
  isLoading = input<Boolean>(false);
}
