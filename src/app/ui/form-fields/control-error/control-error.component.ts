import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dc-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
}
