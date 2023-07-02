import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Icons, icons } from './../icons';
import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<span class="icon" [outerHTML]="icon"></span>`,
  styleUrls: ['./icon.component.scss'],
  host: { class: 'app-icon' },
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit {
  @Input() type!: Icons;
  icon!: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.icon = this.sanitizer.bypassSecurityTrustHtml(icons[this.type]);
  }
}
