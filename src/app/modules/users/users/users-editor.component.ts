import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { UserStatesEnum } from 'src/app/modules/users/enum/user-states.enum';
import { IdentityService } from 'src/app/modules/users/identity.service';
import { User } from 'src/app/modules/users/models/user';
import { UsersList } from 'src/app/modules/users/models/users-list';
import { PasswordEditorDialogService } from 'src/app/modules/users/password-editor/password-editor.dialog.service';
import { UserDialogService } from 'src/app/modules/users/user/user.dialog.service';
import { UsersService } from 'src/app/modules/users/users.service';
import { NotificationsService } from 'src/app/ui/notifications/notifications.service';
import { Column } from 'src/app/ui/table/column';

@Component({
  selector: 'dc-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditorComponent implements OnDestroy {

  public readonly USER_STATES_ENUM = UserStatesEnum;

  public columns = [
    new Column('login', 'Логин'),
    new Column('role', 'Роль'),
    new Column('name', 'Имя'),
    new Column('email', 'E-mail'),
  ];

  public usersList!: UsersList;

  public loading = false;

  public filtersForm!: FormGroup;

  public subscriptions = new Subscription();

  constructor(
    private usersService: UsersService,
    private userDialogService: UserDialogService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private passwordEditorDialogService: PasswordEditorDialogService,
    private notificationsService: NotificationsService,
  ) {
    this.createFiltersForm();
    this.loadUsersList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public canChangeState(user: User): boolean {
    return !this.identityService.isCurrentUser(user);
  }

  public canDelete(user: User): boolean {
    /*
    todo: раскоментить, когда будет потдержано на бэкенде
    return !this.identityService.isCurrentUser(user);
    */
    return false;
  }

  public openEditor(user: User | null): void {
    const neighborUsers = user
      ? this.usersList.users.filter(item => item.id !== user.id)
      : [...this.usersList.users];

    this.userDialogService
      .openEditor(user, neighborUsers)
      .pipe(
        filter(result => !!result),
      )
      .subscribe(result => {
        const users = [...  this.usersList.users];

        if (!user) {
          users.unshift(result!);
          this.notificationsService.success('Пользователь успешно создан.');
        } else {
          const index = users.findIndex(item => item.id === user.id);
          users[index] = result!;
          this.notificationsService.success('Пользователь успешно отредактирован.');
        }

        this.usersList.users = users;
        this.changeDetectorRef.markForCheck();
      });
  }

  public editPassword(user: User): void {
    this.passwordEditorDialogService.openEditor(user.id);
  }

  public updateUserState(user: User, state: UserStatesEnum): void {
    if (state === UserStatesEnum.BLOCKED) {
      if (!confirm('Вы действительно хотите деактивировать пользователя?')) {
        return;
      }
    }

    this.setLoading(true);
    const updateStateSubscription = this.usersService
      .updateState(user.id, state)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(() => {
        const users = [...this.usersList.users];
        const index = users.findIndex(item => item.id === user.id);
        user.state = state;
        users[index] = user;
        this.usersList.users = users;
        this.changeDetectorRef.markForCheck();

        if (state === UserStatesEnum.BLOCKED) {
          this.notificationsService.success('Пользователь успешно деактивирован.');
        } else {
          this.notificationsService.success('Пользователь успешно активироваан.');
        }
      });
    this.subscriptions.add(updateStateSubscription);
  }

  public deleteUser(user: User): void {
    if (!confirm('Вы действительно хотите удалить пользователя?')) {
      return;
    }

    this.setLoading(true);
    const changeStateSubscription = this.usersService
      .deleteUser(user.id)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(() => {
        this.usersList.users = this.usersList.users.filter(item => item.id !== user.id);
        this.changeDetectorRef.markForCheck();
        this.notificationsService.success('Пользователь успешно удалён.');
      });
    this.subscriptions.add(changeStateSubscription);
  }

  private loadUsersList(): void {
    this.setLoading(true);

    const loadUsersListSubscription = this.usersService
      .loadList()
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(usersList => {
        this.usersList = usersList;
        this.changeDetectorRef.markForCheck();
      });
    this.subscriptions.add(loadUsersListSubscription);
  }

  private createFiltersForm(): void {
    this.filtersForm = this.formBuilder.group({
      sampleCode: [null, [Validators.required]],
      year: [null, [Validators.required]],
    });

    const refreshViewSubscription = this.filtersForm.valueChanges.subscribe(() => this.changeDetectorRef.markForCheck());
    this.subscriptions.add(refreshViewSubscription);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
