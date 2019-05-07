import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';

export class User {
  constructor(
        public id: string,
        public state: UserStatesEnum,
        public role: UserRolesEnum,
        public login: string,
        public name: string,
        public email: string | null,
    ) {
  }
}
