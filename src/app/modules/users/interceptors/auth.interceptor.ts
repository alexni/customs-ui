import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentityService } from 'src/app/modules/users/identity.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private identityService: IdentityService,
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.identityService.token.getValue();
    if (token) {
      const requestWithToken = request.clone({
        setHeaders: {
          [IdentityService.HEADER_TOKEN_NAME]: token,
        },
      });

      return next.handle(requestWithToken);
    }

    return next.handle(request);
  }

}
