import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/common/base/form-controls/simple-form-control.base-component';

@Component({
  selector: 'dc-user-password-control',
  templateUrl: './user-password-control.component.html',
  styleUrls: ['./user-password-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserPasswordControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserPasswordControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPasswordControlComponent extends SimpleFormControlBaseComponent<string, string> {

  public readonly PASSWORD_MIN_LENGTH = 6;

  public readonly PASSWORD_MAX_LENGTH = 32;

  @Input()
  public required = false;

  @Input()
  public label = 'Пароль';

  protected readonly validatorKey = 'dc-user-password-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [
      Validators.minLength(this.PASSWORD_MIN_LENGTH),
      Validators.maxLength(this.PASSWORD_MAX_LENGTH),
    ]);
  }

  public createValueFromInputData(inputData: string | null): string | null {
    return inputData;
  }

  public createInputDataFromValue(value: string | null): string | null {
    return value;
  }

  public hasError(errorCode: string): boolean {
    return this.control.dirty && this.control.hasError(errorCode);
  }
}
