import { Message } from 'src/app/modules/chat/models/message';

export class MessagesList {
  constructor(
    public messages: Message[],
  ) {
  }
}
