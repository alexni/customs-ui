import { DeclarantJson } from 'src/app/modules/claims/json/declarant.json-interface';

export interface DeclarantsListJson {
  declarants: DeclarantJson[];
  total: number;
}
