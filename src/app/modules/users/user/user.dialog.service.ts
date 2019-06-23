import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/modules/users/models/user';
import { UserDialogData } from 'src/app/modules/users/user/user.dialog-data';
import { UserDialogComponent } from 'src/app/modules/users/user/user.dialog.component';

@Injectable()
export class UserDialogService {

  constructor(private dialog: MatDialog) {
  }

  public openEditor(user: User | null, neighborUsers: User[]): Observable<User | null> {

    return this.dialog
      .open<UserDialogComponent, UserDialogData, User | null>(UserDialogComponent, {
        disableClose: true,
        panelClass: [
          'mat-dialog-no-padding',
          'mat-dialog-overflow-auto',
        ],
        data: {
          user,
          neighborUsers,
        },
      })
      .afterClosed()
      .pipe(
        map(user => user || null),
      );
  }
}
