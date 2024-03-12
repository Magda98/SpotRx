import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonDirective } from 'src/app/shared/button/button.directive';
import { CommonModule } from '@angular/common';

const meta: Meta<ButtonDirective> = {
  title: 'Example/Button',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      defaultValue: undefined,
      description: 'Mode of button',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonDirective],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonDirective>;

export const Primary: Story = {
  render: () => {
    return {
      template: `<button type="button" appButton>button</button>`,
    };
  },
};

export const Opacity: Story = {
  render: () => {
    return {
      template: `<button type="button" [mode]="'opacity'" appButton>button</button>`,
    };
  },
};

export const Text: Story = {
  render: () => {
    return {
      template: `<button type="button" [mode]="'text'" appButton>button</button>`,
    };
  },
};
