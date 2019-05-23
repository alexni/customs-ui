import { ClaimJson } from 'src/app/modules/claims/json/claim.json-interface';

export interface ClaimsListJson {
  list: ClaimJson[];
  total: number;
}
