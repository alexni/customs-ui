import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserLoginControlComponent } from 'src/app/modules/users/controls/login/user-login-control.component';
import { UserPasswordControlComponent } from 'src/app/modules/users/controls/password/user-password-control.component';
import { PasswordEditorComponent } from 'src/app/modules/users/password-editor/password-editor.component';
import { PasswordEditorDialogComponent } from 'src/app/modules/users/password-editor/password-editor.dialog.component';
import { PasswordEditorDialogService } from 'src/app/modules/users/password-editor/password-editor.dialog.service';
import { SignInComponent } from 'src/app/modules/users/sing-in/sign-in.component';
import { UserComponent } from 'src/app/modules/users/user/user.component';
import { UserDialogComponent } from 'src/app/modules/users/user/user.dialog.component';
import { UserDialogService } from 'src/app/modules/users/user/user.dialog.service';
import { UsersService } from 'src/app/modules/users/users.service';
import { UsersEditorComponent } from 'src/app/modules/users/users/users-editor.component';
import { PasswordControlModule } from 'src/app/ui/form-controls/password-control/password-control.module';
import { SelectControlModule } from 'src/app/ui/form-controls/select-control/select-control.module';
import { TextControlModule } from 'src/app/ui/form-controls/text-control/text-control.module';
import { FormFieldsModule } from 'src/app/ui/form-fields/form-fields.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { NotificationsModule } from 'src/app/ui/notifications/notifications.module';
import { TableModule } from 'src/app/ui/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
    TextControlModule,
    SelectControlModule,
    PasswordControlModule,
    MatButtonModule,
    RouterModule,
    LoaderWithBackdropModule,
    TableModule,
    MatDialogModule,
    NotificationsModule,
  ],

  declarations: [
    SignInComponent,
    UsersEditorComponent,
    UserComponent,
    UserDialogComponent,
    UserLoginControlComponent,
    UserPasswordControlComponent,
    PasswordEditorComponent,
    PasswordEditorDialogComponent,
  ],

  providers: [
    UsersService,
    UserDialogService,
    PasswordEditorDialogService,
  ],

  entryComponents: [
    UserDialogComponent,
    PasswordEditorDialogComponent,
  ],

  exports: [
    SignInComponent,
    UsersEditorComponent,
    UserComponent,
    UserDialogComponent,
  ],
})
export class UsersModule {
}
