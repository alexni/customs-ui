import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Авторизация');
  }
}
