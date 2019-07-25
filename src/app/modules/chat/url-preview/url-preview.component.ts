import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { UrlTypesEnum } from 'src/app/modules/chat/enum/url-types.enum';
import { UrlPreviewService } from 'src/app/modules/chat/url-preview/url-preview.service';

@Component({
  selector: 'dc-url-preview',
  templateUrl: './url-preview.component.html',
  styleUrls: ['./url-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlPreviewComponent implements OnChanges, OnDestroy {

  public readonly URL_TYPES_ENUM = UrlTypesEnum;

  @Input()
  public url!: string;

  public type: UrlTypesEnum | null = null;

  private subscriptions = new Subscription();

  constructor(
    private urlPreviewService: UrlPreviewService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.url) {
      this.refreshUrlType();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private refreshUrlType(): void {
    this.type = null;

    const getUrlTypeSubscription = this.urlPreviewService
      .getUrlType(this.url)
      .subscribe(type => {
        this.type = type;
        this.changeDetectorRef.markForCheck();
      });
    this.subscriptions.add(getUrlTypeSubscription);
  }

}
