import { MessageStatesEnum } from 'src/app/modules/chat/enum/message-states.enum';
import { UserJson } from 'src/app/modules/users/json/user.json-interface';

export interface MessageJson {
  id: string;
  manager: UserJson | null;
  timestamp: number;
  state: MessageStatesEnum;
  text: string;
}
