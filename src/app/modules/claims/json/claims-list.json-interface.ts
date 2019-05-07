import { ClaimJson } from 'src/app/modules/claims/json/claim.json-interface';

export interface ClaimsListJson {
  claims: ClaimJson[];
  total: number;
}
