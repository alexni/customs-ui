import { Message } from 'src/app/modules/claims/chat/models/message';

export class MessagesList {
  constructor(
    public messages: Message[],
  ) {
  }
}
