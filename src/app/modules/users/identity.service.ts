import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { UserJson } from 'src/app/modules/users/json/user.json-interface';
import { User } from 'src/app/modules/users/models/user';
import { UsersModelsFactory } from 'src/app/modules/users/models/users-models.factory';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  public readonly currentUser = new BehaviorSubject<User | null>(null);

  constructor(
    private usersModelsFactory: UsersModelsFactory,
  ) {
  }

  public logout(): void {
    this.currentUser.next(null);
  }

  public auth(login: string, password: string): Observable<void> {
    return of(userMock('broker-id-1', login, password))
      .pipe(
        delay(2500),
        map(json => this.usersModelsFactory.createUserFromJson(json)),
        map(user => this.currentUser.next(user)),
      );
  }

  public isCurrentUser(user: User): boolean {
    const currentUser = this.currentUser.value;

    return !!currentUser && user.id === currentUser.id;
  }

}

function userMock(id:string, login: string, password: string): UserJson {
  return {
    id,
    login,
    state: UserStatesEnum.ACTIVE,
    role: UserRolesEnum.ADMIN,
    name: 'admin',
    email: 'admin@devlc.ru',
  };
}
