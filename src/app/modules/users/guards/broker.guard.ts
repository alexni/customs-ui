import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { IdentityService } from 'src/app/modules/users/identity.service';

@Injectable({
  providedIn: 'root',
})
export class BrokerGuard implements CanActivate {

  constructor(private identityService: IdentityService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.identityService.currentUser.value;

    if (!user) {
      this.router.navigate(['/users/sign-in'], { queryParams: { returnUrl: state.url } });

      return false;
    }

    if (user.state === UserStatesEnum.INACTIVE) {
      this.router.navigate(['/users/inactive']);

      return false;
    }

    return true;
  }
}
