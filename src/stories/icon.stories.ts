import { IconComponent } from '@app/shared/components/icon/icon.component';
import { Icons } from '@app/shared/utils/icons';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'icons',
      options: ['heart', 'heartOutline', 'logo', 'menu', 'shuffle'] as Icons[],
      control: { type: 'select' },
    },
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `<app-icon ${argsToTemplate(args)}></app-icon>`,
  }),
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Icon: Story = {
  args: {
    type: 'menu',
  },
};
