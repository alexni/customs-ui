import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersModule } from 'src/app/modules/users/users.module';
import { EditorComponent } from 'src/app/route-modules/users/editor/editor.component';
import { InactiveComponent } from 'src/app/route-modules/users/inactive/inactive.component';
import { SignInComponent } from 'src/app/route-modules/users/sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
  ],

  declarations: [
    SignInComponent,
    EditorComponent,
    InactiveComponent,
  ],
})
export class RouteUsersModule {
}
