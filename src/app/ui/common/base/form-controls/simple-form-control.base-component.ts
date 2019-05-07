import { ChangeDetectorRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, ValidationErrors, Validator } from '@angular/forms';
import { isEqual } from 'lodash';
import { Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import {
  ChangeEventFn,
  defaultChangeEventFn,
  defaultTouchEventFn,
  defaultValidateEventFn,
  TouchEventFn,
  ValidateEventFn,
} from 'src/app/ui/common/helpers/control-value-accessor.defaults';

@Injectable()
export abstract class SimpleFormControlBaseComponent<TInputData, TValueData> implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  public control!: FormControl;

  protected touchEventHandler: TouchEventFn = defaultTouchEventFn;

  protected changeEventHandler: ChangeEventFn<TValueData> = defaultChangeEventFn;

  protected validatorChange: ValidateEventFn = defaultValidateEventFn;

  protected controlSubscriptions = new Subscription();

  protected lastValue: TValueData | null = null;

  protected abstract readonly validatorKey: string;

  protected constructor(
    protected formBuilder: FormBuilder,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public abstract createControl(): FormControl;

  public abstract createValueFromInputData(inputData: TInputData | null): TValueData | null;

  public abstract createInputDataFromValue(value: TValueData | null): TInputData | null;

  public ngOnInit(): void {
    this.initialControl();
  }

  public writeValue(value: TValueData | null): void {
    const inputData = this.createInputDataFromValue(value);
    this.lastValue = value;
    this.control.setValue(inputData, { emitEvent: false });
  }

  public registerOnChange(fn: ChangeEventFn<TValueData>): void {
    this.changeEventHandler = fn;
  }

  public registerOnTouched(fn: TouchEventFn): void {
    this.touchEventHandler = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnValidatorChange(fn: ValidateEventFn): void {
    this.validatorChange = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (this.control.invalid) {
      return { [this.validatorKey]: true };
    }

    return null;
  }

  public ngOnDestroy(): void {
    this.controlSubscriptions.unsubscribe();
  }

  protected initialControl(): void {
    this.control = this.createControl();
    const changeValueSubscription = this.control
      .valueChanges
      .pipe(
        delay(1),
        map(rawValue => {
          this.touchEventHandler();
          return rawValue;
        }),
        map(rawValue => this.createValueFromInputData(rawValue)),
        filter(value => this.control.invalid || !isEqual(value, this.lastValue)),
      )
      .subscribe(value => this.changeValue(value));
    this.controlSubscriptions.add(changeValueSubscription);

    const changeStatusSubscription = this.control
      .statusChanges
      .subscribe(() => this.changeValue(this.createValueFromInputData(this.control.value)));
    this.controlSubscriptions.add(changeStatusSubscription);

    this.validatorChange();
  }

  protected changeValue(value: TValueData | null): void {
    this.lastValue = value;
    this.changeEventHandler(value);
    this.validatorChange();
    this.changeDetectorRef.markForCheck();
  }

}
