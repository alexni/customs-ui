import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { UICommonModule } from 'src/app/ui/common/ui-common.module';
import { OptionComponent } from 'src/app/ui/form-controls/select-control/option/option.component';
import { SelectControlComponent } from 'src/app/ui/form-controls/select-control/select-control.component';

@NgModule({
  imports: [
    CommonModule,
    UICommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],

  declarations: [
    OptionComponent,
    SelectControlComponent,
  ],

  exports: [
    OptionComponent,
    SelectControlComponent,
  ],
})
export class SelectControlModule {
}
