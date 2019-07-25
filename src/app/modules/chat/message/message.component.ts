import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageTypesEnum } from 'src/app/modules/chat/enum/message-types.enum';
import { Message } from 'src/app/modules/chat/models/message';
import { PartOfString } from 'src/app/ui/urls-parser/part-of-string';
import { UrlsParserService } from 'src/app/ui/urls-parser/urls-parser.service';
import { uniq } from 'lodash';

@Component({
  selector: 'dc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnChanges {

  @Input()
  public message!: Message;

  public textParts!: PartOfString[];

  public urls: string[] = [];

  @HostBinding('class.incoming')
  public incoming!: boolean;

  constructor(private urlsParserService: UrlsParserService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.message) {
      this.refreshIncoming();
      this.refreshTextParts();
      this.refreshUrls();
    }
  }

  private refreshIncoming(): void {
    this.incoming = this.message.type === MessageTypesEnum.INCOMING;
  }

  private refreshTextParts(): void {
    this.textParts = this.urlsParserService.parse(this.message.text);
  }

  private refreshUrls(): void {
    const urls = this.textParts
      .filter(part => part.isUrl)
      .map(part => part.value);

    this.urls = uniq(urls);
  }

}
