import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { UICommonModule } from 'src/app/ui/common/ui-common.module';
import { PasswordControlComponent } from 'src/app/ui/form-controls/password-control/password-control.component';

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
    PasswordControlComponent,
  ],

  exports: [
    PasswordControlComponent,
  ],
})
export class PasswordControlModule {
}
