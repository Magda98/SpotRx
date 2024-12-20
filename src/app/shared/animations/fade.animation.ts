import { animate, style, transition, trigger } from '@angular/animations';

export const appFade = trigger('appFade', [
	transition(':enter', [
		style({ opacity: 0 }),
		animate('200ms ease-in-out', style({ opacity: 1 })),
	]),
	transition(':leave', [
		style({ opacity: 1 }),
		animate('200ms ease-in-out', style({ opacity: 0 })),
	]),
]);
