import { Declarant } from 'src/app/modules/claims/models/declarant';
import { TableData } from 'src/app/ui/table-with-paginator/table-data.interface';

export class DeclarantsList implements TableData<Declarant> {
  constructor(
    public items: Declarant[],
    public total: number,
  ) {
  }
}
