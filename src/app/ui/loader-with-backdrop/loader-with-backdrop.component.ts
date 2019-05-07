import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'dc-loader-with-backdrop',
  templateUrl: './loader-with-backdrop.component.html',
  styleUrls: ['./loader-with-backdrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderWithBackdropComponent {

  @HostBinding('class.without-padding')
  @Input()
  public withoutPadding = false;

}
