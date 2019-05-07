import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { Driver } from 'src/app/modules/claims/models/driver';

export class Claim {
  constructor(
    public id: string,
    public number: string,
    public timestamp: number,
    public state: ClaimStatesEnum,
    public driver: Driver,
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
