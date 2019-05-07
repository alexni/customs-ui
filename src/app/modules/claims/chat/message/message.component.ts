import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageTypesEnum } from 'src/app/modules/claims/chat/enum/message-types.enum';
import { Message } from 'src/app/modules/claims/chat/models/message';

@Component({
  selector: 'dc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnChanges {

  @Input()
  public message!: Message;

  @HostBinding('class.incoming')
  public incoming!: boolean;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.message) {
      this.refreshIncoming();
    }
  }

  private refreshIncoming(): void {
    this.incoming = this.message.type === MessageTypesEnum.INCOMING;
  }

}
