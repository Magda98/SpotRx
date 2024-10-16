import { TrackComponent } from '@app/shared/components/track/track.component';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { savedTracks } from '@tests/mocks';

const meta: Meta<TrackComponent> = {
  title: 'Components/Track',
  component: TrackComponent,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    props: {
      ...args,
    },
    template: `<app-track ${argsToTemplate(args)}></app-track>`,
  }),
};

export default meta;
type Story = StoryObj<TrackComponent>;

export const Track: Story = {
  args: {
    track: savedTracks.items[0].track,
  },
};
