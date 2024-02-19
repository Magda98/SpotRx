import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Icons, icons } from '../utils/icons';
import {
  Component,
  OnChanges,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<span class="icon" [outerHTML]="icon"></span>`,
  styleUrls: ['./icon.component.scss'],
  host: { class: 'app-icon' },
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class IconComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);
  type = input.required<Icons>();
  icon!: SafeHtml;

  ngOnChanges(): void {
    this.icon = this.sanitizer.bypassSecurityTrustHtml(icons[this.type()]);
  }
}
