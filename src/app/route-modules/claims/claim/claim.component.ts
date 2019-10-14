import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ChatComponent } from 'src/app/modules/chat/chat.component';
import { ClaimsService } from 'src/app/modules/claims/claims.service';
import { Claim } from 'src/app/modules/claims/models/claim';
import { TitleService } from 'src/app/ui/common/services/title.service';

// tslint:disable:enforce-component-selector
@Component({
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimComponent implements OnInit, OnDestroy {

  public claim!: Claim;

  public loading = false;

  @ViewChild(ChatComponent)
  public chatComponent!: ChatComponent;

  private subscriptions = new Subscription();

  private loadClaimSubscription: Subscription | null = null;

  constructor(
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private claimsService: ClaimsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.titleService.setTitle('Обработка заявки');
  }

  public ngOnInit(): void {
    this.initialChangeClaimId();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public changeClaim(claim: Claim): void {
    this.claim = claim.lazyClone();
    this.changeDetectorRef.markForCheck();
  }

  private initialChangeClaimId(): void {
    const changeClaimIdSubscription = this.activatedRoute
      .params
      .pipe(
        map(params => params['claimId'] || null),
      )
      .subscribe(id => {
        if (!id) {
          return this.returnToClaims();
        }

        this.loadClaim(id!);
      });
    this.subscriptions.add(changeClaimIdSubscription);
  }

  private loadClaim(id: string): void {
    this.loadClaimUnsubscribe();
    this.setLoading(true);
    this.loadClaimSubscription = this.claimsService
      .loadClaim(id)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(
        claim => {
          this.claim = claim;
          this.changeDetectorRef.markForCheck();
        },
        () => this.returnToClaims(),
      );
  }

  private loadClaimUnsubscribe(): void {
    if (this.loadClaimSubscription) {
      this.loadClaimSubscription.unsubscribe();
      this.loadClaimSubscription = null;
    }
  }

  private returnToClaims(): void {
    this.router.navigate(['/claims/list']);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
