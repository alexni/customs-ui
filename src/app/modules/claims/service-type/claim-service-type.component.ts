import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CLAIM_SERVICE_TYPES_LABELS, ClaimServiceTypesEnum } from 'src/app/modules/claims/enums/claim-service-types.enum';

@Component({
  selector: 'dc-claim-service-type',
  templateUrl: './claim-service-type.component.html',
  styleUrls: ['./claim-service-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimServiceTypeComponent {

  public readonly CLAIM_SERVICE_TYPES_LABELS = CLAIM_SERVICE_TYPES_LABELS;

  @Input()
  public serviceType!: ClaimServiceTypesEnum;

}
