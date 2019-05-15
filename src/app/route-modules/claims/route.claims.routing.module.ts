import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerGuard } from 'src/app/modules/users/guards/broker.guard';
import { ClaimComponent } from 'src/app/route-modules/claims/claim/claim.component';
import { ClaimsListComponent } from 'src/app/route-modules/claims/claims/claims-list.component';
import { DeclarantsListComponent } from 'src/app/route-modules/claims/declarants/declarants-list.component';
import { RouteClaimsModule } from 'src/app/route-modules/claims/route.claims.module';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'claims',
        component: ClaimsListComponent,
      },
      {
        path: 'claim/:claimId',
        component: ClaimComponent,
      },
      {
        path: 'declarants',
        component: DeclarantsListComponent,
      },
      { path: '**', redirectTo: 'claims' },
    ],
    canActivate: [
      BrokerGuard,
    ],
  },
];

@NgModule({
  imports: [
    RouteClaimsModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteClaimsRoutingModule {
}
