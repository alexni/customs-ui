import { DeclarantStatesEnum } from 'src/app/modules/claims/enums/declarant-states.enum';

export interface DeclarantJson {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  birthday: string;
  passport_series: string;
  passport_number: string;
  passport_date: string;
  phone: string;
  state: DeclarantStatesEnum;
}
