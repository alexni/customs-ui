import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/common/base/form-controls/simple-form-control.base-component';

@Component({
  selector: 'dc-user-login-control',
  templateUrl: './user-login-control.component.html',
  styleUrls: ['./user-login-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserLoginControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserLoginControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginControlComponent extends SimpleFormControlBaseComponent<string, string> {

  public readonly LOGIN_MIN_LENGTH = 3;

  public readonly LOGIN_MAX_LENGTH = 32;

  @Input()
  public outerErrors: string[] = [];

  protected readonly validatorKey = 'dc-user-login-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [
      Validators.required,
      Validators.minLength(this.LOGIN_MIN_LENGTH),
      Validators.maxLength(this.LOGIN_MAX_LENGTH),
      Validators.pattern(/^[a-z][a-z0-9\-_@.]+$/i),
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
