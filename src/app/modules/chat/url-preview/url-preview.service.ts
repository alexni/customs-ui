import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UrlTypesEnum } from 'src/app/modules/chat/enum/url-types.enum';

@Injectable()
export class UrlPreviewService {

  // todo: нужно детектить через сервер, т.к. с клиента не позволит cors
  // сейчас простой вариант для картинок
  public getUrlType(url: string): Observable<UrlTypesEnum> {
    const subject = new Subject<UrlTypesEnum>();

    const image = new Image();
    image.onload = () => subject.next(UrlTypesEnum.IMAGE);
    image.onerror = () => subject.next(UrlTypesEnum.OTHER);
    image.src = url;

    return subject.asObservable()
      .pipe(first());
  }

}
