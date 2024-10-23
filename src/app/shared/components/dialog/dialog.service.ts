import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Type,
  createComponent,
  createEnvironmentInjector,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export const DIALOG_CONTEXT = new InjectionToken<unknown>('DialogContext');
export const RETURN_DATA = new InjectionToken<Subject<unknown>>('ReturnData');

@Injectable({ providedIn: 'root' })
export class DialogService {
  dialog?: ComponentRef<unknown>;
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private document = inject(DOCUMENT);


  open<T, C, D>(component: Type<T>, context?: C) {
    const returnDataSubject = new Subject<D>();
    const dialogInjector = createEnvironmentInjector(
      [
        {
          provide: DIALOG_CONTEXT,
          useValue: context,
        },
        {
          provide: RETURN_DATA,
          useValue: returnDataSubject,
        },
      ],
      this.injector,
    );

    this.dialog = createComponent(component, {
      environmentInjector: dialogInjector,
    });
    this.document.body.appendChild(this.dialog.location.nativeElement);
    this.appRef.attachView(this.dialog.hostView);
    return returnDataSubject.asObservable();
  }

   close() {
    this.dialog?.destroy();
  }
}
