import { ClaimServiceTypesEnum } from 'src/app/modules/claims/enums/claim-service-types.enum';
import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { DeclarantJson } from 'src/app/modules/claims/json/declarant.json-interface';

export interface ClaimJson {
  id: number;
  timestamp: number;
  state: ClaimStatesEnum;
  manager_ids: string[];
  is_have_new_message: boolean;
  declarant: DeclarantJson;
  service_types: ClaimServiceTypesEnum[];
  checkpoint: string;
  contract_number: string;
  service_payer: string;
  carrier: string;
  number_car: string;
  number_trailer: string;
  document_photos: string[];
  comment: string;
}
