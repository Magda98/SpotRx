import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
  input,
} from '@angular/core';

export type ButtonMode = 'text' | 'opacity';

@Directive({
  selector: '[appButton]',
  standalone: true,
  host: {
    role: 'button',
  },
})
export class ButtonDirective implements OnInit {
  mode = input<ButtonMode>();
  rippleSpan?: HTMLElement;
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

    const rippleSpan = this.renderer.createElement('span');
    rippleSpan.classList.add('ripple');
    this.renderer.appendChild(this.el.nativeElement, rippleSpan);
    this.rippleSpan = rippleSpan;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const btn = this.el.nativeElement as HTMLElement;
    const diameter = Math.max(btn.offsetWidth, btn.offsetHeight);
    const x = event.clientX - (btn.offsetLeft + diameter / 2);
    const y = event.clientY - (btn.offsetTop + diameter / 2);

    if (this.rippleSpan) {
      this.rippleSpan.style.width =
        this.rippleSpan.style.height = `${diameter}px`;
      this.rippleSpan.style.left = `${x}px`;
      this.rippleSpan.style.top = `${y}px`;
    }

    const animation = this.rippleSpan?.animate(
      [
        {
          transform: 'scale(0)',
          opacity: 1,
        },
        {
          transform: 'scale(2.5)',
          opacity: 0,
        },
      ],
      300
    );

    animation?.play();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
