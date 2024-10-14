import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { argsToTemplate, moduleMetadata, applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { PlayerService } from 'src/app/shared/services/player.service';
import { TrackListComponent } from 'src/app/shared/track-list/track-list.component';
import { savedTracks } from 'src/tests/mocks';

const meta: Meta<TrackListComponent> = {
  title: 'Components/Track List',
  component: TrackListComponent,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    applicationConfig({
      providers: [
          importProvidersFrom(HttpClientModule)
      ],
  }),
    moduleMetadata({
      providers: [PlayerService, ]
    })
  ],
  render: (args) => ({
    props: {
      ...args,
    },
    template: `<app-track-list ${argsToTemplate(args)}></app-track-list>`,
  }),
};

export default meta;
type Story = StoryObj<TrackListComponent>;

export const Track: Story = {
  args: {
    tracksList: savedTracks,
    isLoading: false,
    total: savedTracks.total
  },
};
