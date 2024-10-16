import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/shared/components/icon/icon.component';
import { ButtonDirective } from '@app/shared/directives/button/button.directive';

const meta: Meta<ButtonDirective> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: 'Mode of button',
      options: ['opacity', 'text'],
      control: { type: 'select' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonDirective, IconComponent],
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

export const Icon: Story = {
  args: {
    mode: 'text',
  },
  render: ({ mode }) => {
    console.log('🚀 ~ mode:', mode);
    return {
      template: `<button type="button" mode="${mode}" appButton> <app-icon class="icon" type="menu"></app-icon></button>`,
    };
  },
};
