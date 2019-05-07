import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { NotificationsService } from 'src/app/ui/notifications/notifications.service';
import { SnackBarComponent } from 'src/app/ui/notifications/snack-bar/snack-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
  ],

  declarations: [
    SnackBarComponent,
  ],

  providers: [
    NotificationsService,
  ],

  entryComponents: [
    SnackBarComponent,
  ],
})
export class NotificationsModule {
}
