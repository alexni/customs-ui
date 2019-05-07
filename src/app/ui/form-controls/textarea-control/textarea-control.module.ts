import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { UICommonModule } from 'src/app/ui/common/ui-common.module';
import { TextareaControlComponent } from 'src/app/ui/form-controls/textarea-control/textarea-control.component';

@NgModule({
  imports: [
    CommonModule,
    UICommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  declarations: [
    TextareaControlComponent,
  ],

  exports: [
    TextareaControlComponent,
  ],
})
export class TextareaControlModule {
}
