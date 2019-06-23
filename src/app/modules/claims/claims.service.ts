import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { DeclarantStatesEnum } from 'src/app/modules/claims/enums/declarant-states.enum';
import { ClaimJson } from 'src/app/modules/claims/json/claim.json-interface';
import { ClaimsListJson } from 'src/app/modules/claims/json/claims-list.json-interface';
import { DeclarantsListJson } from 'src/app/modules/claims/json/declarants-list.json-interface';
import { Claim } from 'src/app/modules/claims/models/claim';
import { ClaimsList } from 'src/app/modules/claims/models/claims-list';
import { ClaimsModelsFactory } from 'src/app/modules/claims/models/claims-models.factory';
import { DeclarantsList } from 'src/app/modules/claims/models/declarants-list';
import { returnVoid } from 'src/app/ui/common/helpers/return-void.function';

@Injectable()
export class ClaimsService {

  constructor(
    private claimsModelsFactory: ClaimsModelsFactory,
    private httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private api: string,
  ) {
  }

  public loadClaimsList(
    offset: number,
    limit: number,
    query: string | null = null,
    managerId: string | null = null,
    state: ClaimStatesEnum | null = null,
  ): Observable<ClaimsList> {
    let params = new HttpParams()
      .set('offset', String(offset))
      .set('limit', String(limit));

    if (managerId) {
      params = params.set('manager_id', managerId);
    }

    if (query) {
      params = params.set('query', query);
    }

    if (state) {
      params = params.set('state', state);
    }

    return this
      .httpClient
      .get<ClaimsListJson>(`${ this.api }/declarant/claim/list`, { params })
      .pipe(
        map(json => this.claimsModelsFactory.createClaimsListFromJson(json)),
      );
  }

  public loadClaim(id: string): Observable<Claim> {
    return this
      .httpClient
      .get<ClaimJson>(`${ this.api }/declarant/claim/${ id }`)
      .pipe(
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

    return this
      .httpClient
      .post(`${ this.api }/declarant/claim/${ id }/state/${ directory }`, {})
      .pipe(
        map(returnVoid),
      );
  }

  public loadDeclarantsList(
    offset: number,
    limit: number,
    query: string | null = null,
  ): Observable<DeclarantsList> {
    let params = new HttpParams()
      .set('offset', String(offset))
      .set('limit', String(limit));

    if (query) {
      params = params.set('query', query);
    }

    return this
      .httpClient
      .get<DeclarantsListJson>(`${ this.api }/declarants/list`, { params })
      .pipe(
        map(json => this.claimsModelsFactory.createDeclarantsListFromJson(json)),
      );
  }

  public updateDeclarantState(declarantId: string, state: DeclarantStatesEnum): Observable<void> {
    return this
      .httpClient
      .post<ClaimsListJson>(`${ this.api }/declarant/${ declarantId }/state`, {
        state,
      })
      .pipe(
        map(returnVoid),
      );
  }

}
