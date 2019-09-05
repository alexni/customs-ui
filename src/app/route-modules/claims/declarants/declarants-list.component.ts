import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from 'src/app/ui/common/services/title.service';

// tslint:disable:enforce-component-selector
@Component({
  templateUrl: './declarants-list.component.html',
  styleUrls: ['./declarants-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarantsListComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Декларанты');
  }
}
