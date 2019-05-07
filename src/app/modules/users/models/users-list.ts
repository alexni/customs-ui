import { User } from 'src/app/modules/users/models/user';

export class UsersList {
  constructor(
    public users: User[],
  ) {
  }
}
