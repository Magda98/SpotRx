import { type Meta, type StoryObj } from '@storybook/angular';
import { TrackComponent } from 'src/app/shared/track/track.component';
import { savedTracks } from 'src/tests/mocks';

import { Component, inject } from "@angular/core";
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { DIALOG_CONTEXT, DialogService, RETURN_DATA } from 'src/app/shared/dialog/dialog.service';
import { ButtonDirective } from 'src/app/shared/button/button.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog-example',
  imports: [DialogComponent, ButtonDirective],
  template: `
  <app-dialog>
  <div header>{{dialogContext}}</div>  
  <div style="height: 200px;">dialog content!</div>
  <div style="display: flex; gap: 8px;" footer> <button type="button" (click)="confirmData()" appButton>primary</button>  <button type="button" [mode]="'text'" appButton>secondary</button> </div>
</app-dialog>
    `,
  standalone: true,
}) export class DialogExampleComponent {
  dialogContext = inject<string>(DIALOG_CONTEXT);
  returnData = inject<Subject<string>>(RETURN_DATA);
  dialogService = inject(DialogService);

  confirmData() {
    this.returnData.next('value');
    this.returnData.complete();
    this.dialogService.close();
  }
}

@Component({
  selector: 'app-example-view',
  imports: [DialogExampleComponent, ButtonDirective],
  template: `
       <button type="button" (click)="openDialog()" appButton>button</button>
    `,
  standalone: true,
}) export class ExampleViewComponent {
  private dialogService = inject(DialogService)

  openDialog() {
    this.dialogService.open(DialogExampleComponent,  'dialogTitle')
  }
}

const meta: Meta<ExampleViewComponent> = {
  title: 'Example/Dialog',
  component: ExampleViewComponent,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
    <app-example-view></app-example-view>
    `,
  }),
};

export default meta;
type Story = StoryObj<TrackComponent>;

export const Track: Story = {
  args: {
    track: savedTracks.items[0].track,
  },
};
