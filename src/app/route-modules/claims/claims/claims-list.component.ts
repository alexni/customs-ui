import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsListComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Заявки');
  }
}
