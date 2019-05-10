import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { DriverJson } from 'src/app/modules/claims/json/driver.json-interface';

export interface ClaimJson extends DriverJson {
  id: string;
  number: string;
  timestamp: number;
  state: ClaimStatesEnum;
  manager_ids: string[];
  is_have_new_message: boolean;
  service_type: string;
  checkpoint: string;
  service_payer: string;
  carrier: string;
  number_car: string;
  number_trailer: string;
  documents_photos: string[];
  comment: string;
}
