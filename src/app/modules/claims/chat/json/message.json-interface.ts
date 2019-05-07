import { MessageStatesEnum } from 'src/app/modules/claims/chat/enum/message-states.enum';

export interface MessageJson {
  id: string;
  broker_id: string | null;
  timestamp: number;
  state: MessageStatesEnum;
  text: string;
}
