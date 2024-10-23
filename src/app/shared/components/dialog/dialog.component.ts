import { Component } from '@angular/core';
import { DialogCloseDirective } from './dialog-close.directive';
import { ButtonDirective } from '../../directives/button/button.directive';

@Component({
	selector: 'app-dialog',
	template: `
		<div class="app-dialog-overlay">
			<div class="app-dialog">
				<div class="app-dialog__header">
					<div class="app-dialog__header-content">
						<ng-content select="[header]"></ng-content>
					</div>
					<button
						class="app-dialog__close-button"
						[mode]="'text'"
						appDialogClose
						type="button"
						appButton>
						x
					</button>
				</div>
				<div class="app-dialog__content"><ng-content></ng-content></div>
				<div class="app-dialog__footer">
					<ng-content select="[footer]"></ng-content>
				</div>
			</div>
		</div>
	`,
	standalone: true,
	styleUrl: './dialog.component.scss',
	imports: [DialogCloseDirective, ButtonDirective],
})
export class DialogComponent {}
