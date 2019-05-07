import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SimpleFormControlBaseComponent } from 'src/app/ui/common/base/form-controls/simple-form-control.base-component';
import { OptionComponent } from 'src/app/ui/form-controls/select-control/option/option.component';

@Component({
  selector: 'dc-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlComponent<T = any> extends SimpleFormControlBaseComponent<T, T> implements AfterContentInit, OnDestroy {

  @Input()
  public placeholder: string | null = null;

  @ContentChildren(OptionComponent)
  public optionsList!: QueryList<OptionComponent>;

  public options: OptionComponent[] = [];

  protected readonly validatorKey = 'dc-select-control';

  private optionsChangeSubscription: Subscription | null = null;

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngAfterContentInit(): void {
    this.optionsUnsubscribe();

    this.optionsChangeSubscription = this.optionsList
      .changes
      .subscribe(() => this.refreshOptions());
    this.refreshOptions();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: T | null): T | null {
    return inputData;
  }

  public createInputDataFromValue(value: T | null): T | null {
    return value;
  }

  private optionsUnsubscribe(): void {
    if (this.optionsChangeSubscription) {
      this.optionsChangeSubscription.unsubscribe();
      this.optionsChangeSubscription = null;
    }
  }

  private refreshOptions(): void {
    this.options = this.optionsList.toArray();
    this.changeDetectorRef.markForCheck();
  }

}
