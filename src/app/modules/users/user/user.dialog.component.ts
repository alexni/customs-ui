import { ChangeDetectionStrategy, Component, Inject, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserDialogData } from 'src/app/modules/users/user/user.dialog-data';

// tslint:disable:enforce-component-selector
@Component({
  template: `
    <dc-user
        [user]="data.user"
        [neighborUsers]="data.neighborUsers"
        (userSaved)="dialogRef.close($event)"
        (cancel)="dialogRef.close(null)"
    ></dc-user>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: UserDialogData,
    public dialogRef: MatDialogRef<Type<any>>,
  ) {
  }
}
