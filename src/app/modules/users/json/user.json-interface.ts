import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';

export interface UserJson {
  id: string;
  login: string;
  role: UserRolesEnum;
  name: string;
  email: string;
  state?: UserStatesEnum;
}
