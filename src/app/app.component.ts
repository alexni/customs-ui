import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IdentityService } from 'src/app/modules/users/identity.service';

@Component({
  selector: 'dc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  constructor(
    private identityService: IdentityService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.initialCheckAuth();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initialCheckAuth(): void {
    const redirectToSignInSubscription = this.identityService
      .currentUser
      .pipe(
        filter(user => !user),
      )
      .subscribe(() => this.router.navigate(['/users/sign-in']));
    this.subscriptions.add(redirectToSignInSubscription);
  }

}
