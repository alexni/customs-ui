import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { IdentityService } from 'src/app/modules/users/identity.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(
    private identityService: IdentityService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this
      .identityService
      .loadCurrentUser()
      .pipe(
        map(user => {
          if (!user) {
            this.router.navigate(['/users/sign-in'], { queryParams: { returnUrl: state.url } });

            return false;
          }

          if (user.state === UserStatesEnum.BLOCKED) {
            this.router.navigate(['/users/inactive']);

            return false;
          }

          if (user.role !== UserRolesEnum.ADMIN) {
            this.router.navigate(['/']);
          }

          return true;
        }),
      );
  }
}
