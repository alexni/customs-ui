import { Injectable } from '@angular/core';
import { MessageStatesEnum } from 'src/app/modules/claims/chat/enum/message-states.enum';
import { MessageTypesEnum } from 'src/app/modules/claims/chat/enum/message-types.enum';
import { MessageJson } from 'src/app/modules/claims/chat/json/message.json-interface';
import { MessagesListJson } from 'src/app/modules/claims/chat/json/messages-list.json-interface';
import { Message } from 'src/app/modules/claims/chat/models/message';
import { MessagesList } from 'src/app/modules/claims/chat/models/messages-list';
import { User } from 'src/app/modules/users/models/user';
import { UsersModelsFactory } from 'src/app/modules/users/models/users-models.factory';

@Injectable()
export class ChatModelsFactory {

  constructor(private usersModelsFactory: UsersModelsFactory) {
  }

  public createMessage(
    id: string,
    type: MessageTypesEnum,
    broker: User | null, // todo: user!
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

  public createMessageFromJson(json: MessageJson, type: MessageTypesEnum, brokers: Map<string, User>): Message {
    return this.createMessage(
      json.id,
      type,
      json.broker_id ? brokers.get(json.broker_id) || null : null,
      json.timestamp,
      json.state,
      json.text,
    );
  }

  public createMessagesListFromJson(json: MessagesListJson): MessagesList {
    const brokers = new Map<string, User>();
    Object
      .keys(json.brokers)
      .forEach(id => brokers.set(id, this.usersModelsFactory.createUserFromJson(json.brokers[id])));

    const messages = json
      .messages
      .map(itemJson => this.createMessageFromJson(itemJson, this.getMessageType(!!itemJson.broker_id), brokers));

    return new MessagesList(messages);
  }

  private getMessageType(outgoing: boolean): MessageTypesEnum {
    return outgoing
      ? MessageTypesEnum.OUTGOING
      : MessageTypesEnum.INCOMING;
  }

}
