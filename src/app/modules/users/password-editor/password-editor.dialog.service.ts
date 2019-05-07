import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PasswordEditorDialogData } from 'src/app/modules/users/password-editor/password-editor.dialog-data';
import { PasswordEditorDialogComponent } from 'src/app/modules/users/password-editor/password-editor.dialog.component';

@Injectable()
export class PasswordEditorDialogService {

  constructor(private dialog: MatDialog) {
  }

  public openEditor(userId: string): Observable<boolean> {

    return this.dialog
      .open<PasswordEditorDialogComponent, PasswordEditorDialogData, boolean>(PasswordEditorDialogComponent, {
        disableClose: true,
        panelClass: [
          'mat-dialog-no-padding',
        ],
        data: {
          userId,
        },
      })
      .afterClosed()
      .pipe(
        map(changed => !!changed),
      );
  }
}
