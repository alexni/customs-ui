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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UsersService } from 'src/app/modules/users/users.service';
import { NotificationsService } from 'src/app/ui/notifications/notifications.service';

@Component({
  selector: 'dc-password-editor',
  templateUrl: './password-editor.component.html',
  styleUrls: ['./password-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordEditorComponent implements OnChanges, OnDestroy {

  @Input()
  public userId!: string;

  @Output()
  public passwordSaved = new EventEmitter<void>();

  @Output()
  public cancel = new EventEmitter<void>();

  public form!: FormGroup;

  public loading = false;

  private subscriptions = new Subscription();

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationsService: NotificationsService,
  ) {
    this.createForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.updateForm();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public apply(): void {
    const password = this.form.get('password')!.value as string;

    this.setLoading(true);

    const saveSubscription = this.userService
      .updatePassword(this.userId, password)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(() => {
        this.notificationsService.success('Пароль пользователя успешно изменён.');
        this.passwordSaved.emit();
      });
    this.subscriptions.add(saveSubscription);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      password: [null],
    });
    this.changeDetectorRef.markForCheck();
  }

  private updateForm(): void {
    this.form.setValue({ password: null });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
