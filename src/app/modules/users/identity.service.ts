import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { UserJson } from 'src/app/modules/users/json/user.json-interface';
import { User } from 'src/app/modules/users/models/user';
import { UsersModelsFactory } from 'src/app/modules/users/models/users-models.factory';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  public static readonly HEADER_TOKEN_NAME = 'x-auth-token';

  public readonly token = new BehaviorSubject<string | null>('');

  private user: BehaviorSubject<User | null> | null = null;

  private isUserLoaded = false;

  constructor(
    private usersModelsFactory: UsersModelsFactory,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    @Inject(API_URL_GATEWAY) private api: string,
  ) {
  }

  public getCurrentUser(): User | null {
    return this.user ? this.user.getValue() : null;
  }

  public loadCurrentUser(): Observable<User | null> {
    if (this.user) {
      return this.loadedUser();
    }

    this.user = new BehaviorSubject<User | null>(null);

    const token = this.getTokenFromStorage();
    if (!token) {
      this.isUserLoaded = true;

      return this.loadedUser();
    }

    this.token.next(token);

    return this
      .httpClient
      .get<UserJson>(`${ this.api }/user`)
      .pipe(
        map(json => this.usersModelsFactory.createUserFromJson(json)),
        tap(user => {
          this.isUserLoaded = true;
          this.user!.next(user);
        }),
        switchMap(() => this.loadedUser()),
        catchError(() => {
          this.isUserLoaded = true;
          this.saveTokenInStorage(null);
          this.token.next(null);
          this.user!.next(null);

          return this.loadedUser();
        }),
      );
  }

  public logout(): void {
    this.saveTokenInStorage(null);
    this.token.next(null);
    this.user!.next(null);
  }

  public auth(login: string, password: string): Observable<void> {
    return this
      .httpClient
      .post<UserJson>(`${ this.api }/auth`, { login, password }, { observe: 'response' })
      .pipe(
        map(response => {
          const token = response.headers.get(IdentityService.HEADER_TOKEN_NAME)!;
          this.saveTokenInStorage(token);
          this.token.next(token);

          return response.body! as UserJson;
        }),
        map(json => this.usersModelsFactory.createUserFromJson(json)),
        map(user => this.user!.next(user)),
      );
  }

  public isCurrentUser(user: User): boolean {
    const currentUser = this.user!.value;

    return !!currentUser && user.id === currentUser.id;
  }

  private saveTokenInStorage(token: string | null): void {
    this.localStorageService.set('token', token);
  }

  private getTokenFromStorage(): string | null {
    return this.localStorageService.get('token') || null;
  }

  private loadedUser(): Observable<User | null> {
    return this
      .user!
      .pipe(filter(() => this.isUserLoaded));
  }

}
