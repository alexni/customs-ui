import { Injectable } from '@angular/core';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { UserJson } from 'src/app/modules/users/json/user.json-interface';
import { UsersListJson } from 'src/app/modules/users/json/users-list.json-interface';
import { User } from 'src/app/modules/users/models/user';
import { UsersList } from 'src/app/modules/users/models/users-list';

@Injectable({
  providedIn: 'root',
})
export class UsersModelsFactory {

  public createUser(
    id: string,
    state: UserStatesEnum,
    role: UserRolesEnum,
    login: string,
    name: string,
    email: string,
  ): User {
    return new User(id, state, role, login, name, email);
  }

  public createUserFromJson(json: UserJson): User {
    return this.createUser(
      json.id,
      json.state || UserStatesEnum.INACTIVE,
      json.role,
      json.login,
      json.name,
      json.email,
    );
  }

  public createUsersList(users: User[]): UsersList {
    return new UsersList(users);
  }

  public createUsersListFromJson(json: UsersListJson): UsersList {
    const users = json.map(itemJson => this.createUserFromJson(itemJson));

    return this.createUsersList(users);
  }
}
