import { Directive, HostListener, inject } from "@angular/core";
import { DialogService } from "./dialog.service";

@Directive({
  selector: '[dialogClose]',
  standalone: true,
})
export class DialogCloseDirective{
  private dialogService = inject(DialogService);

  @HostListener('click')
  onClick() {
    this.dialogService.close();
  }
}