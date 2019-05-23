import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityService } from 'src/app/modules/users/identity.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {

  constructor(private identityService: IdentityService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this
      .identityService
      .loadCurrentUser()
      .pipe(
        map(user => {
          if (user) {
            this.router.navigate(['/']);

            return false;
          }

          return true;
        }),
      );
  }
}
