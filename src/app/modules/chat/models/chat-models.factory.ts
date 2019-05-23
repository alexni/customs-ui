import { Injectable } from '@angular/core';
import { MessageStatesEnum } from 'src/app/modules/chat/enum/message-states.enum';
import { MessageTypesEnum } from 'src/app/modules/chat/enum/message-types.enum';
import { MessageJson } from 'src/app/modules/chat/json/message.json-interface';
import { MessagesListJson } from 'src/app/modules/chat/json/messages-list.json-interface';
import { Message } from 'src/app/modules/chat/models/message';
import { MessagesList } from 'src/app/modules/chat/models/messages-list';
import { User } from 'src/app/modules/users/models/user';
import { UsersModelsFactory } from 'src/app/modules/users/models/users-models.factory';

@Injectable()
export class ChatModelsFactory {

  constructor(private usersModelsFactory: UsersModelsFactory) {
  }

  public createMessage(
    id: string,
    type: MessageTypesEnum,
    broker: User | null,
    timestamp: number,
    state: MessageStatesEnum,
    text: string,
  ): Message {
    return new Message(
      id,
      type,
      broker,
      timestamp,
      state,
      text,
    );
  }

  public createMessageFromJson(json: MessageJson, type: MessageTypesEnum): Message {
    return this.createMessage(
      json.id,
      type,
      json.manager ? this.usersModelsFactory.createUserFromJson(json.manager) || null : null,
      json.timestamp,
      json.state,
      json.text,
    );
  }

  public createMessagesListFromJson(json: MessagesListJson): MessagesList {
    const messages = json
      .map(itemJson => this.createMessageFromJson(itemJson, this.getMessageType(!!itemJson.manager)));

    return new MessagesList(messages);
  }

  private getMessageType(outgoing: boolean): MessageTypesEnum {
    return outgoing
      ? MessageTypesEnum.OUTGOING
      : MessageTypesEnum.INCOMING;
  }

}
