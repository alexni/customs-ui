import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { Declarant } from 'src/app/modules/claims/models/declarant';

export class Claim {
  constructor(
    public id: string,
    public number: string,
    public timestamp: number,
    public state: ClaimStatesEnum,
    public declarant: Declarant,
    public managerIds: string[],
    public isHaveNewMessage: boolean,
    public serviceType: string,
    public checkpoint: string,
    public servicePayer: string,
    public carrier: string,
    public numberCar: string,
    public numberTrailer: string,
    public documentsPhotos: string[],
    public comment: string,
  ) {
  }
}
