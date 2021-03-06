import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { ClaimComponent } from 'src/app/modules/claims/claim/claim.component';
import { ClaimsFiltersComponent } from 'src/app/modules/claims/claims-filters/claims-filters.component';
import { ClaimsService } from 'src/app/modules/claims/claims.service';
import { ClaimsComponent } from 'src/app/modules/claims/claims/claims.component';
import { DeclarantStateComponent } from 'src/app/modules/claims/declarant-state/declarant-state.component';
import { DeclarantsFiltersComponent } from 'src/app/modules/claims/declarants-filters/declarants-filters.component';
import { DeclarantsComponent } from 'src/app/modules/claims/declarants/declarants.component';
import { ClaimsModelsFactory } from 'src/app/modules/claims/models/claims-models.factory';
import { ClaimServiceTypeComponent } from 'src/app/modules/claims/service-type/claim-service-type.component';
import { ClaimStateComponent } from 'src/app/modules/claims/state/claim-state.component';
import { SelectControlModule } from 'src/app/ui/form-controls/select-control/select-control.module';
import { TextControlModule } from 'src/app/ui/form-controls/text-control/text-control.module';
import { FormFieldsModule } from 'src/app/ui/form-fields/form-fields.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { PluralsModule } from 'src/app/ui/plurals/plurals.module';
import { PluralsPipe } from 'src/app/ui/plurals/plurals.pipe';
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
    MatSlideToggleModule,
    PluralsModule,
  ],

  providers: [
    ClaimsModelsFactory,
    ClaimsService,
    PluralsPipe,
  ],

  declarations: [
    ClaimsComponent,
    ClaimComponent,
    ClaimsFiltersComponent,
    DeclarantsComponent,
    DeclarantsFiltersComponent,
    DeclarantStateComponent,
    ClaimServiceTypeComponent,
    ClaimStateComponent,
  ],

  exports: [
    ClaimsComponent,
    ClaimComponent,
    DeclarantsComponent,
  ],
})
export class ClaimsModule {
}
