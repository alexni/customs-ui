import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { defer, isEqual } from 'lodash';
import { Subject, Subscription, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ChatService } from 'src/app/modules/chat/chat.service';
import { MessagesList } from 'src/app/modules/chat/models/messages-list';
import { IdentityService } from 'src/app/modules/users/identity.service';

@Component({
  selector: 'dc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnChanges, OnDestroy {

  private static readonly POOLING_INTERVAL = 3000;

  @Input()
  public claimId!: string;

  public messagesList!: MessagesList;

  public loading = true;

  @ViewChild('messages')
  private messagesElement!: ElementRef;

  private subscriptions = new Subscription();

  private refreshListSubject = new Subject<boolean>();

  private poolingSubscription: Subscription | null = null;

  constructor(
    private chatService: ChatService,
    private changeDetectorRef: ChangeDetectorRef,
    private identityService: IdentityService,
  ) {
    this.initialListLoad();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.claimId) {
      this.restartPooling(true);
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.stopPooling();
  }

  public hasBrokerActivity(): boolean {
    return !!this.messagesList && this.messagesList
      .messages
      .map(message => message.broker)
      .filter(broker => !!broker)
      .some(broker => broker!.id === this.identityService.getCurrentUser()!.id);
  }

  public restartPooling(firstNotLazy: boolean): void {
    this.stopPooling();
    this.startPooling(firstNotLazy);
  }

  public startPooling(firstNotLazy: boolean): void {
    let firstPool = true;
    this.poolingSubscription = timer(0, ChatComponent.POOLING_INTERVAL)
      .subscribe(() => {
        this.refreshListSubject.next(!(
          firstPool && firstNotLazy
        ));
        firstPool = false;
      });
  }

  private stopPooling(): void {
    if (this.poolingSubscription) {
      this.poolingSubscription.unsubscribe();
      this.poolingSubscription = null;
    }
  }

  private initialListLoad(): void {
    let isLazy: boolean;
    const loadQueueSubscription = this.refreshListSubject
      .pipe(
        map(lazy => {
          isLazy = lazy;

          if (!isLazy) {
            this.setLoading(true);
          }
        }),
        switchMap(() => this.chatService.loadMessagesList(this.claimId)),
        map(list => {
          if (!isLazy) {
            this.setLoading(false);
          }

          return list;
        }),
        filter(list => !isEqual(list, this.messagesList)),
      )
      .subscribe(list => {
        this.messagesList = list;
        this.changeDetectorRef.markForCheck();
        defer(() => this.goToLastMessage());
      });
    this.subscriptions.add(loadQueueSubscription);
  }

  private goToLastMessage(): void {
    const element = this.messagesElement.nativeElement;
    element.scroll({ top: element.scrollHeight, left: 0, behavior: 'smooth' });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
