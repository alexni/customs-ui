import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/modules/users/guards/admin.guard';
import { AnonymousGuard } from 'src/app/modules/users/guards/anonymous.guard';
import { InactiveUserGuard } from 'src/app/modules/users/guards/inactive-user.guard';
import { EditorComponent } from 'src/app/route-modules/users/editor/editor.component';
import { InactiveComponent } from 'src/app/route-modules/users/inactive/inactive.component';
import { RouteUsersModule } from 'src/app/route-modules/users/route.users.module';
import { SignInComponent } from 'src/app/route-modules/users/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [
      AnonymousGuard,
    ],
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [
      AdminGuard,
    ],
  },
  {
    path: 'inactive',
    component: InactiveComponent,
    canActivate: [
      InactiveUserGuard,
    ],
  },
];

@NgModule({
  imports: [
    RouteUsersModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteUsersRoutingModule {
}
