import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonDirective } from 'src/app/shared/button/button.directive';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { IconComponent } from 'src/app/shared/icon/icon.component';

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
  render: () => {
    return {
      template: `<button type="button" [mode]="'text'" appButton> <app-icon class="icon" type="menu"></app-icon></button>`,
    };
  },
};
