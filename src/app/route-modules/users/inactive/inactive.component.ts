import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InactiveComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Деактивированая четная запись.');
  }
}
