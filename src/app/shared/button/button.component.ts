import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

export type ButtonMode = 'outline' | 'default' | 'opacity';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent {
  mode = input<ButtonMode>('default');
}
