import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CLAIM_STATES_LABELS, ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';

@Component({
  selector: 'dc-claim-state',
  templateUrl: './claim-state.component.html',
  styleUrls: ['./claim-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimStateComponent {

  public readonly CLAIM_STATES_LABELS = CLAIM_STATES_LABELS;

  @Input()
  public state!: ClaimStatesEnum;

}
