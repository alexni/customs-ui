import { MessageJson } from 'src/app/modules/claims/chat/json/message.json-interface';
import { UserJson } from 'src/app/modules/users/json/user.json-interface';

export interface MessagesListJson {
  messages: MessageJson[];
  brokers: {
    [id: string]: UserJson;
  };
}
