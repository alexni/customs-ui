import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from 'src/app/ui/notifications/snack-bar/snack-bar.component';

@Injectable()
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) {
  }

  public success(message: string, matIcon = 'check'): void {
    this.custom(message, matIcon, '#00c853');
  }

  public warning(message: string, matIcon = 'warning'): void {
    this.custom(message, matIcon, '#ff6d00');
  }

  public error(message: string, matIcon = 'error'): void {
    this.custom(message, matIcon, '#ff5252');
  }

  public custom(message: string, matIcon: string, color: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message,
        matIcon,
        color,
      },
    });
  }

}
