import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClaimsService } from 'src/app/modules/claims/claims.service';
import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { Claim } from 'src/app/modules/claims/models/claim';

@Component({
  selector: 'dc-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimComponent {

  public readonly CLAIM_STATES_ENUM = ClaimStatesEnum;

  @Input()
  public claim!: Claim;

  @Output()
  public readonly stateChanged = new EventEmitter<void>();

  public loading = false;

  public changeClaimStateSubscription: Subscription | null = null;

  constructor(
    private claimsService: ClaimsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public error(): void {
    if (!confirm('Вы действительно хотите отправить заявку на доработку?')) {
      return;
    }

    this.changeClaimState(ClaimStatesEnum.ERROR);
  }

  public reject(): void {
    if (!confirm('Вы действительно хотите отвергнуть заявку?')) {
      return;
    }

    this.changeClaimState(ClaimStatesEnum.REJECT);
  }

  public success(): void {
    if (!confirm('Вы действительно хотите пометить заяку как оказанную?')) {
      return;
    }

    this.changeClaimState(ClaimStatesEnum.SUCCESS);
  }

  private changeClaimState(state: ClaimStatesEnum): void {
    this.changeClaimStateUnsubscribe();
    this.setLoading(true);
    this.changeClaimStateSubscription = this.claimsService
      .changeClaimState(this.claim.id, state)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(() => {
        this.claim.state = state;
        this.changeDetectorRef.markForCheck();
        this.stateChanged.emit();
      });
  }

  private changeClaimStateUnsubscribe(): void {
    if (this.changeClaimStateSubscription) {
      this.changeClaimStateSubscription.unsubscribe();
      this.changeClaimStateSubscription = null;
    }
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
