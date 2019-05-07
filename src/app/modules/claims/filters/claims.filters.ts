import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';

export class ClaimsFilters {
  constructor(
    public query: string | null = null,
    public managerId: string | null = null,
    public state: ClaimStatesEnum | null = null,
  ) {
  }
}
