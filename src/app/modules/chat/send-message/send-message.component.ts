import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ChatService } from 'src/app/modules/chat/chat.service';

@Component({
  selector: 'dc-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendMessageComponent implements OnChanges, OnDestroy {

  @Input()
  public claimId!: string;

  @Output()
  public messageSended = new EventEmitter<void>();

  public control!: FormControl;

  public sending = false;

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private chatService: ChatService,
  ) {
    this.createControl();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.reset();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public sendMessage(): void {
    this.setSending(true);
    const text = this.control.value as string;
    const sendMessageSubscription = this.chatService
      .sendMessage(this.claimId, text)
      .pipe(
        finalize(() => this.setSending(false)),
      )
      .subscribe(() => {
        this.messageSended.emit();
        this.reset();
      });

    this.subscriptions.add(sendMessageSubscription);
  }

  public reset(): void {
    this.control.reset();
  }

  private createControl(): void {
    this.control = this.formBuilder.control(null, [Validators.required]);
  }

  private setSending(sending: boolean): void {
    if (sending) {
      this.control.disable();
    } else {
      this.control.enable();
    }

    this.sending = sending;
    this.changeDetectorRef.markForCheck();
  }
}
