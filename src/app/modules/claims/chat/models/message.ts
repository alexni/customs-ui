import { MessageStatesEnum } from 'src/app/modules/claims/chat/enum/message-states.enum';
import { MessageTypesEnum } from 'src/app/modules/claims/chat/enum/message-types.enum';
import { User } from 'src/app/modules/users/models/user';

export class Message {
  constructor(
    public id: string,
    public type: MessageTypesEnum,
    public broker: User  | null,
    public timestamp: number,
    public state: MessageStatesEnum,
    public text: string,
  ) {
  }
}
