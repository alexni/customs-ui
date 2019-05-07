import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlErrorComponent } from 'src/app/ui/form-fields/control-error/control-error.component';
import { FormFieldControlDirective } from 'src/app/ui/form-fields/form-field-control/form-field-control.directive';
import { FormFieldErrorsDirective } from 'src/app/ui/form-fields/form-field-errors/form-field-errors.directive';
import { FormFieldLabelComponent } from 'src/app/ui/form-fields/form-field-label/form-field-label.component';
import { VerticalFormFieldComponent } from 'src/app/ui/form-fields/vertical-form-field/vertical-form-field.component';

@NgModule({
  imports: [
    CommonModule,
  ],

  declarations: [
    VerticalFormFieldComponent,
    FormFieldControlDirective,
    FormFieldErrorsDirective,
    ControlErrorComponent,
    FormFieldLabelComponent,
  ],

  exports: [
    VerticalFormFieldComponent,
    FormFieldControlDirective,
    FormFieldErrorsDirective,
    ControlErrorComponent,
    FormFieldLabelComponent,
  ],
})
export class FormFieldsModule { }
