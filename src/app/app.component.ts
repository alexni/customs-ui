import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IdentityService } from 'src/app/modules/users/identity.service';
import { filterIdenticalRunning } from 'src/app/ui/common/rxjs-pipes/filter-identical-running.pipe';

@Component({
  selector: 'dc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  public initialized = false;

  private subscriptions = new Subscription();

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.initialUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initialUser(): void {
    const initialCurrentUserSubscription = this.identityService
      .loadCurrentUser()
      .subscribe(() => {
        this.initialCheckAuth();

        this.initialized = true;
        this.changeDetectorRef.markForCheck();
      });
    this.subscriptions.add(initialCurrentUserSubscription);
  }

  private initialCheckAuth(): void {
    const redirectToSignInSubscription = this.identityService
      .loadCurrentUser()
      .pipe(
        filterIdenticalRunning(),
        filter(user => !user),
      )
      .subscribe(() => this.router.navigate(['/users/sign-in']));
    this.subscriptions.add(redirectToSignInSubscription);
  }

}
