import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
  inject,
  input,
} from '@angular/core';

export type ButtonMode = 'outline' | 'opacity';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective implements OnInit {
  mode = input<ButtonMode>();
  protected _elementClass: string[] = ['btn'];

  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
  }

  set(val: string) {
    this._elementClass = val.split(' ');
  }

  ngOnInit(): void {
    const buttonMode = this.mode();
    if (buttonMode)
      this._elementClass = [...this._elementClass, `btn-${buttonMode}`];
  }
}
