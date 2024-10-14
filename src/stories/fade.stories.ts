import { Component, signal } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { appFade } from 'src/app/shared/animations/fade.animation';
import { ButtonDirective } from 'src/app/shared/button/button.directive';
import { TrackComponent } from 'src/app/shared/track/track.component';
import { savedTracks } from 'src/tests/mocks';

@Component({
  selector: 'app-example-view',
  imports: [ButtonDirective, TrackComponent],
  animations: [appFade ],
  template: `
    <div style="height: 200px;">
       <button style="margin-bottom: 16px;" type="button" (click)="toggleContent()" appButton>button</button>
       @if(showContent()){
        <app-track @appFade [track]="savedTracks.items[0].track"></app-track>
       }
    </div>
    `,
  standalone: true,
}) export class ExampleViewComponent {
  showContent = signal(false)
  savedTracks = savedTracks;

  toggleContent() {
    this.showContent.update(val => !val)
  }
}

const meta: Meta<TrackComponent> = {
  title: 'Animations/Fade',
  component: ExampleViewComponent,
  tags: ['autodocs'],
  decorators: [
   applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  render: (args) => ({
    props: {
      ...args,
    },
    template: `<app-example-view></app-example-view>`,
  }),
};

export default meta;
type Story = StoryObj<TrackComponent>;

export const Fade: Story = {};
