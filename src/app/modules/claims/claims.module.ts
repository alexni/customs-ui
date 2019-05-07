import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { ClaimComponent } from 'src/app/modules/claims/claim/claim.component';
import { ClaimsService } from 'src/app/modules/claims/claims.service';
import { ClaimsComponent } from 'src/app/modules/claims/claims/claims.component';
import { ClaimFiltersComponent } from 'src/app/modules/claims/filters/claim-filters.component';
import { ClaimsModelsFactory } from 'src/app/modules/claims/models/claims-models.factory';
import { SelectControlModule } from 'src/app/ui/form-controls/select-control/select-control.module';
import { TextControlModule } from 'src/app/ui/form-controls/text-control/text-control.module';
import { FormFieldsModule } from 'src/app/ui/form-fields/form-fields.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { TableWithPaginatorModule } from 'src/app/ui/table-with-paginator/table-with-paginator.module';

@NgModule({
  imports: [
    CommonModule,
    TableWithPaginatorModule,
    LoaderWithBackdropModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    AngularSplitModule,
    FormFieldsModule,
    TextControlModule,
    SelectControlModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    ClaimsModelsFactory,
    ClaimsService,
  ],

  declarations: [
    ClaimsComponent,
    ClaimComponent,
    ClaimFiltersComponent,
  ],

  exports: [
    ClaimsComponent,
    ClaimComponent,
  ],
})
export class ClaimsModule {
}
