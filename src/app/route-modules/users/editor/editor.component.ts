import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from 'src/app/ui/common/services/title.service';

// tslint:disable:enforce-component-selector
@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Управление пользователями');
  }
}
