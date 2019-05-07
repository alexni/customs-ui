import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { IdentityService } from 'src/app/modules/users/identity.service';
import { User } from 'src/app/modules/users/models/user';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  selector: 'dc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  public currentUser!: User | null;

  public title!: Observable<string>;

  private subscriptions = new Subscription();

  constructor(
    private identityService: IdentityService,
    private changeDetectorRef: ChangeDetectorRef,
    titleService: TitleService,
  ) {
    this.title = titleService.title.asObservable();
  }

  public get isSigned(): boolean {
    return !!this.currentUser;
  }

  public get isAdmin(): boolean {
    return this.isSigned && this.currentUser!.role === UserRolesEnum.ADMIN;
  }

  public ngOnInit(): void {
    const changeSignedSubscription = this.identityService
      .currentUser
      .subscribe(user => {
        this.currentUser = user;
        this.changeDetectorRef.markForCheck();
      });
    this.subscriptions.add(changeSignedSubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public logout(): void {
    this.identityService.logout();
  }
}
