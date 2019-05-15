import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClaimsService } from 'src/app/modules/claims/claims.service';
import { DeclarantStatesEnum } from 'src/app/modules/claims/enums/declarant-states.enum';
import { Declarant } from 'src/app/modules/claims/models/declarant';

@Component({
  selector: 'dc-declarant-state',
  templateUrl: 'declarant-state.component.html',
  styleUrls: ['declarant-state.component.scss'],
})
export class DeclarantStateComponent implements OnChanges, OnDestroy {

  @Input()
  public declarant!: Declarant;

  @Output()
  public changeState = new EventEmitter<Declarant>();

  public control!: FormControl;

  public subscriptions = new Subscription();

  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private claimsService: ClaimsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.createControl();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.declarant) {
      this.refreshForm();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private createControl(): void {
    this.control = this.formBuilder.control(null);

    const changeStateSubscription = this.control.valueChanges.subscribe(() => this.updateState());
    this.subscriptions.add(changeStateSubscription);
  }

  private refreshForm(): void {
    this.control.setValue(this.declarant.state === DeclarantStatesEnum.ACTIVE);
  }

  private updateState(): void {
    const state = this.control.value ? DeclarantStatesEnum.ACTIVE : DeclarantStatesEnum.INACTIVE;
    if (state === this.declarant.state) {
      return;
    }

    this.setLoading(true);
    const updateStateSubscription = this.claimsService
      .updateDeclarantState(this.declarant.id, state)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(() => {
        const declarant = this.declarant.clone();
        declarant.state = state;
        this.declarant = declarant;
        this.changeState.emit(declarant);
      });
    this.subscriptions.add(updateStateSubscription);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
