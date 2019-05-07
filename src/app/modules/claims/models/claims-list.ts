import { Claim } from 'src/app/modules/claims/models/claim';
import { TableData } from 'src/app/ui/table-with-paginator/table-data.interface';

export class ClaimsList implements TableData<Claim> {
  constructor(
    public items: Claim[],
    public total: number,
  ) {
  }
}
