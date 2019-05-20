import { Injectable } from '@angular/core';
import { random } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MessageStatesEnum } from 'src/app/modules/claims/chat/enum/message-states.enum';
import { MessageJson } from 'src/app/modules/claims/chat/json/message.json-interface';
import { MessagesListJson } from 'src/app/modules/claims/chat/json/messages-list.json-interface';
import { ChatModelsFactory } from 'src/app/modules/claims/chat/models/chat-models.factory';
import { MessagesList } from 'src/app/modules/claims/chat/models/messages-list';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { UserJson } from 'src/app/modules/users/json/user.json-interface';
import { returnVoid } from 'src/app/ui/common/helpers/return-void.function';

@Injectable()
export class ChatService {

  constructor(private chatModelsFactory: ChatModelsFactory) {
  }

  public loadMessagesList(claimId: string): Observable<MessagesList> {
    return of(mockMessagesList())
      .pipe(
        delay(1500),
        map(json => this.chatModelsFactory.createMessagesListFromJson(json)),
      );
  }

  public sendMessage(claimId: string, text: string): Observable<void> {
    return of(null)
      .pipe(
        delay(1500),
        map(returnVoid),
      );
  }

}

function mockMessage(id: string, text: string): MessageJson {
  const brokerId = ['broker-id-1', null][Number(id) % 2];
  const state = [MessageStatesEnum.NEW, MessageStatesEnum.READ][random(0, 1)];

  return {
    id,
    state,
    text,
    broker_id: brokerId,
    timestamp: Date.now() - random(10000, 99999999),
  };
}

function mockMessagesList(): MessagesListJson {
  const texts = [
    'Сцена из сериала "Person of Interest", S02E20, интро: много компьютерной графики, много движения и смен планов. Сцена из той же серии сериала: мало движения, несколько смен планов и много деталей на заднем и переднем плане, от веток деревьев до деталей лиц.',

    'Обе сцены взяты из одного файла с разрешением 1920х1080 (Full HD), кодек H.264, битрейт — 12664 кбит в секунду. Это достаточно хорошее исходное качество для сериала. Сравнение результата апскейла производилось с файлом, увеличенным с помощью простейшей билинейной интерполяции (она указана в списке, как референс).',

    'Пример видео с сайта RED.com: реальный 4K HD (3840x2160), снятый в 120FPS. Видео было уменьшено до 1920х1080 с помощью Lanczos, а потом увеличено до 4К с помощью программ из списка выше. Фреймрейт был уменьшен до ~24 кадров в секунду. Сравнение результата производилось с исходным файлом, конвертированным из RED файла в уже привычный нам FFV1 (ffmpeg отказывается работать RED-файлами).',

    ' Рисованная анимация "Священная книга оборотня", скачано с YouTube, искусственная тряска «камеры», много смен планов. Исходный файл в разрешении 1280х720, контейнер WEBM, кодек VP9, битрейт 1556 кбит\\с. Это весьма низкое качество, но вполне обычное явление на YouTube.',
  ];

  return {
    messages: [...texts, ...texts, ...texts, ...texts, ...texts, ...texts, ...texts, ...texts].map((text: string, i: number) => mockMessage(String(i + 1), text)),
    brokers: {
      'broker-id-1': userMock('broker-id-1'),
    },
  };
}

function userMock(id: string): UserJson {
  return {
    id,
    state: UserStatesEnum.ACTIVE,
    role: UserRolesEnum.BROKER,
    login: `login_${ id }`,
    name: `Фамилия Имя Отчество ${ id }`,
    email: `login_${ id }@devlc.ru`,
  };
}
