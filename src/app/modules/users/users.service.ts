import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { UsersListJson } from 'src/app/modules/users/json/users-list.json-interface';
import { User } from 'src/app/modules/users/models/user';
import { UsersList } from 'src/app/modules/users/models/users-list';
import { UsersModelsFactory } from 'src/app/modules/users/models/users-models.factory';
import { returnVoid } from 'src/app/ui/common/helpers/return-void.function';

@Injectable()
export class UsersService {

  constructor(
    private usersModelsFactory: UsersModelsFactory,
    private httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private api: string,
  ) {
  }

  public loadList(): Observable<UsersList> {
    return this.httpClient
      .get<UsersListJson>(`${ this.api }/admin/users`)
      .pipe(
        map(json => this.usersModelsFactory.createUsersListFromJson(json)),
      );
  }

  public createUser(
    login: string,
    password: string,
    role: UserRolesEnum,
    name: string,
    email: string,
    state = UserStatesEnum.BLOCKED,
  ): Observable<User> {
    return this.httpClient
      .post<{ id: string; }>(`${ this.api }/admin/user`, {
        login,
        role,
        name,
        email,
        state,
        pass: password,
      })
      .pipe(
        map(json => json.id),
        map(id => this.usersModelsFactory
          .createUser(id, state, role, login, name, email),
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
    return this.httpClient
      .put(`${ this.api }/admin/user/${ originalUser.id }`, {
        login,
        role,
        name,
        email,
      })
      .pipe(
        map(() => this.usersModelsFactory
          .createUser(originalUser.id, originalUser.state, role, login, name, email),
        ),
      );
  }

  public updatePassword(userId: string, password: string): Observable<void> {
    return this.httpClient
      .put(`${ this.api }/admin/user/${ userId }/password`, {
        password,
      })
      .pipe(
        map(returnVoid),
      );
  }

  public updateState(userId: string, state: UserStatesEnum): Observable<void> {
    return this.httpClient
      .put(`${ this.api }/admin/user/${ userId }`, {
        state,
      })
      .pipe(
        map(returnVoid),
      );
  }

  public deleteUser(userId: string): Observable<void> {
    return this.httpClient
      .delete(`${ this.api }/admin/user/${ userId }`)
      .pipe(
        map(returnVoid),
      );
  }

}
