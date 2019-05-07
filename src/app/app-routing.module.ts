import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'users', loadChildren: './route-modules/users/route.users.routing.module#RouteUsersRoutingModule' },
  { path: 'claims', loadChildren: './route-modules/claims/route.claims.routing.module#RouteClaimsRoutingModule' },
  { path: '**', redirectTo: 'claims' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [
    RouterModule,
  ],

  providers: [],
})
export class AppRoutingModule {
}
