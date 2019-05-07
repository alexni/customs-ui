import { Injectable } from '@angular/core';
import { random } from 'lodash';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { ClaimJson } from 'src/app/modules/claims/json/claim.json-interface';
import { ClaimsListJson } from 'src/app/modules/claims/json/claims-list.json-interface';
import { Claim } from 'src/app/modules/claims/models/claim';
import { ClaimsList } from 'src/app/modules/claims/models/claims-list';
import { ClaimsModelsFactory } from 'src/app/modules/claims/models/claims-models.factory';
import { emptyArray } from 'src/app/ui/common/helpers/empty-array.function';
import { returnVoid } from 'src/app/ui/common/helpers/return-void.function';

@Injectable()
export class ClaimsService {

  constructor(private claimsModelsFactory: ClaimsModelsFactory) {
  }

  public loadList(
    offset: number,
    limit: number,
    query: string | null = null,
    managerId: string | null = null,
    state: ClaimStatesEnum | null = null,
  ): Observable<ClaimsList> {
    return of(mockClaimsList(offset, limit, query, managerId, state))
      .pipe(
        delay(1500),
        map(json => this.claimsModelsFactory.createClaimsListFromJson(json)),
      );
  }

  public loadClaim(id: string): Observable<Claim> {
    return of(mockClaim(id))
      .pipe(
        delay(1500),
        map(json => this.claimsModelsFactory.createClaimFromJson(json)),
      );
  }

  public changeClaimState(id: string, state: ClaimStatesEnum): Observable<void> {
    let directory: string;

    if (state === ClaimStatesEnum.START) {
      directory = 'start';
    } else if (state === ClaimStatesEnum.ERROR) {
      directory = 'error';
    } else if (state === ClaimStatesEnum.SUCCESS) {
      directory = 'success';
    } else if (state === ClaimStatesEnum.REJECT) {
      directory = 'reject';
    } else {
      return throwError('Incorrect state');
    }

    return of(null)
      .pipe(
        delay(1500),
        map(returnVoid),
      );
  }

}

function mockClaim(id: string): ClaimJson {
  const states = [
    ClaimStatesEnum.START,
    ClaimStatesEnum.ERROR,
    ClaimStatesEnum.REJECT,
    ClaimStatesEnum.SUCCESS,
  ];
  const state = states[random(0, 3)];

  return {
    id,
    state,
    number: `number-${ id }`,
    timestamp: Date.now() - random(100, 99999) * 100,
    managerIds: [],
    is_have_new_message: [true, false][random(0, 1)],
    service_type: 'ОБЕСПЕЧЕНИЕ ТАМОЖЕННОГО ТРАНЗИТА',
    checkpoint: 'Калиниград',
    service_payer: 'ООО "Рога и Копыта"',
    carrier: 'ООО "Рога и Копыта логистик"',
    number_car: 'Б222ББ 22',
    number_trailer: 'А111АА 11',
    documents_photos: [
      'https://img.craftpix.net/2017/09/Free-Horizontal-2D-Game-Backgrounds-3.jpg',
      'https://previews.123rf.com/images/vitaliyvill/vitaliyvill1707/vitaliyvill170700015/81951383-forest-game-background-2d-game-application-vector-design-tileable-horizontally-size-1024x512-.jpg',
      'https://i.ytimg.com/vi/gaRME3x9Wfw/maxresdefault.jpg',
      'https://previews.123rf.com/images/vitaliyvill/vitaliyvill1609/vitaliyvill160900015/62999358-game-background-flat-style-2d-game-application.jpg',
      'https://previews.123rf.com/images/vitaliyvill/vitaliyvill1609/vitaliyvill160900011/62999356-seamless-game-background-flat-style-2d-game-application.jpg',
    ],
    comment: 'Какой-то непонятный комментарий от водителя.',
    driver_surname: 'Иванов',
    driver_name: 'Иван',
    driver_patronymic: 'Иванович ',
    driver_birthday: '30.04.1987',
    driver_passport_series: '2211',
    driver_passport_number: '347612',
    driver_passport_date: '01.05.2007',
    driver_phone: '+79507682365',
  };
}

function mockClaimsList(
  offset: number,
  limit: number,
  query: string | null = null,
  managerId: string | null = null,
  state: ClaimStatesEnum | null = null,
): ClaimsListJson {
  const claims = emptyArray(limit)
    .map((v: null, i: number) => String(i + 1 + offset))
    .map(id => mockClaim(id));

  return {
    claims,
    total: 100,
  };
}
