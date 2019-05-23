import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { MessagesListJson } from 'src/app/modules/chat/json/messages-list.json-interface';
import { ChatModelsFactory } from 'src/app/modules/chat/models/chat-models.factory';
import { MessagesList } from 'src/app/modules/chat/models/messages-list';
import { returnVoid } from 'src/app/ui/common/helpers/return-void.function';

@Injectable()
export class ChatService {

  constructor(
    private chatModelsFactory: ChatModelsFactory,
    private httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private api: string,
  ) {
  }

  public loadMessagesList(claimId: string): Observable<MessagesList> {
    return this
      .httpClient
      .get<MessagesListJson>(`${ this.api }/claim/${ claimId }/messages`)
      .pipe(
        map(json => this.chatModelsFactory.createMessagesListFromJson(json)),
      );
  }

  public sendMessage(claimId: string, text: string): Observable<void> {
    return this
      .httpClient
      .post(`${ this.api }/claim/${ claimId }/message`, { text })
      .pipe(
        map(returnVoid),
      );
  }

}
