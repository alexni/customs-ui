import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { UserJson } from 'src/app/modules/users/json/user.json-interface';
import { UsersListJson } from 'src/app/modules/users/json/users-list.json-interface';
import { User } from 'src/app/modules/users/models/user';
import { UsersList } from 'src/app/modules/users/models/users-list';
import { UsersModelsFactory } from 'src/app/modules/users/models/users-models.factory';
import { emptyArray } from 'src/app/ui/common/helpers/empty-array.function';
import { returnVoid } from 'src/app/ui/common/helpers/return-void.function';

@Injectable()
export class UsersService {

  constructor(
    private usersModelsFactory: UsersModelsFactory,
  ) {
  }

  public loadList(): Observable<UsersList> {
    return of(usersListMock())
      .pipe(
        delay(1500),
        map(json => this.usersModelsFactory.createUsersListFromJson(json)),
      );
  }

  public createUser(
    login: string,
    password: string,
    role: UserRolesEnum,
    name: string,
    email: string,
  ): Observable<User> {
    return of({ id: `test-id-${ login }` })
      .pipe(
        delay(1500),
        map(json => json.id),
        map(id => this.usersModelsFactory
          .createUser(id, UserStatesEnum.INACTIVE, role, login, name, email),
        ),
      );
  }

  public updateUser(
    originalUser: User,
    login: string,
    role: UserRolesEnum,
    name: string,
    email: string,
  ): Observable<User> {
    return of(null)
      .pipe(
        delay(1500),
        map(() => this.usersModelsFactory
          .createUser(originalUser.id, originalUser.state, role, login, name, email),
        ),
      );
  }

  public deleteUser(userId: string): Observable<void> {
    return of(null)
      .pipe(
        delay(1500),
        map(returnVoid),
      );
  }

  public updateState(userId: string, state: UserStatesEnum): Observable<void> {
    return of(null)
      .pipe(
        delay(1500),
        map(returnVoid),
      );
  }

  public updatePassword(userId: string, password: string): Observable<void> {
    return of(null)
      .pipe(
        delay(1500),
        map(returnVoid),
      );
  }

}

function userMock(id: string): UserJson {
  return {
    id,
    state: UserStatesEnum.ACTIVE,
    role: UserRolesEnum.ADMIN,
    login: `login_${ id }`,
    name: `Фамилия Имя Отчество ${ id }`,
    email: `login_${ id }@devlc.ru`,
  };
}

function usersListMock(): UsersListJson {
  return {
    users: emptyArray(50)
      .map((v: null, i: number) => String(i + 1))
      .map(id => userMock(id)),
  };
}
