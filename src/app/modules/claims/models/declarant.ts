import { DeclarantStatesEnum } from 'src/app/modules/claims/enums/declarant-states.enum';

export class Declarant {
  constructor(
    public id: string,
    public surname: string,
    public name: string,
    public patronymic: string,
    public birthday: string,
    public passportSeries: string,
    public passportNumber: string,
    public passportDate: string,
    public phone: string,
    public state: DeclarantStatesEnum,
  ) {
  }

  public clone(): Declarant {
    return new Declarant(
      this.id,
      this.surname,
      this.name,
      this.patronymic,
      this.birthday,
      this.passportSeries,
      this.passportNumber,
      this.passportDate,
      this.phone,
      this.state,
    );
  }
}
