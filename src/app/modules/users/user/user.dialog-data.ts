import { User } from 'src/app/modules/users/models/user';

export interface UserDialogData {
  user: User | null;
  neighborUsers: User[];
}
