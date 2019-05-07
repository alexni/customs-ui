import { ChangeDetectionStrategy, Component, Inject, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PasswordEditorDialogData } from 'src/app/modules/users/password-editor/password-editor.dialog-data';

@Component({
  template: `
    <dc-password-editor
        [userId]="data.userId"
        (passwordSaved)="dialogRef.close(true)"
        (cancel)="dialogRef.close(false)"
    ></dc-password-editor>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordEditorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PasswordEditorDialogData,
    public dialogRef: MatDialogRef<Type<any>>,
  ) {
  }
}
