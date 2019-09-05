import { ClaimServiceTypesEnum } from 'src/app/modules/claims/enums/claim-service-types.enum';
import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { Declarant } from 'src/app/modules/claims/models/declarant';

export class Claim {
  constructor(
    public id: string,
    public timestamp: number,
    public state: ClaimStatesEnum,
    public declarant: Declarant,
    public managerIds: string[],
    public isHaveNewMessage: boolean,
    public serviceTypes: ClaimServiceTypesEnum[],
    public checkpoint: string,
    public contractNumber: string,
    public servicePayer: string,
    public carrier: string,
    public numberCar: string,
    public numberTrailer: string,
    public documentsPhotos: string[],
    public comment: string,
  ) {
  }

  public get isNew(): boolean {
    return this.state === ClaimStatesEnum.START && this.managerIds.length === 0;
  }

}
