import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { ChatModule } from 'src/app/modules/claims/chat/chat.module';
import { ClaimsModule } from 'src/app/modules/claims/claims.module';
import { ClaimComponent } from 'src/app/route-modules/claims/claim/claim.component';
import { ClaimsListComponent } from 'src/app/route-modules/claims/list/claims-list.component';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';

@NgModule({
  imports: [
    CommonModule,
    ClaimsModule,
    RouterModule,
    MatButtonModule,
    AngularSplitModule,
    LoaderWithBackdropModule,
    ChatModule,
  ],

  declarations: [
    ClaimsListComponent,
    ClaimComponent,
  ],
})
export class RouteClaimsModule {
}
