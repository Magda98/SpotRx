import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Icons, icons } from '../../utils/icons';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  effect,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `@if (icon) {
    <span class="icon" [innerHTML]="icon"></span>
  }`,
  styleUrls: ['./icon.component.scss'],
  host: { class: 'app-icon' },
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);
  type = input.required<Icons>();
  icon?: SafeHtml;

  constructor() {
    effect(() => {
      const type = this.type();
      if (type) this.icon = this.sanitizer.bypassSecurityTrustHtml(icons[type]);
    });
  }
}
