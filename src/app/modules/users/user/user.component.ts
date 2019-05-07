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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserRolesEnum } from 'src/app/modules/users/enum/user-roles.enum';
import { IdentityService } from 'src/app/modules/users/identity.service';
import { User } from 'src/app/modules/users/models/user';
import { UsersService } from 'src/app/modules/users/users.service';
import { uniqueStringValidator } from 'src/app/ui/common/control-validators/unique-string.validator';

@Component({
  selector: 'dc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnChanges, OnDestroy {

  public readonly USER_ROLES_ENUM = UserRolesEnum;

  @Input()
  public user!: User | null;

  @Input()
  public neighborUsers!: User[];

  @Output()
  public userSaved = new EventEmitter<User>();

  @Output()
  public cancel = new EventEmitter<void>();

  public form!: FormGroup;

  public loading = false;

  private subscriptions = new Subscription();

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private identityService: IdentityService,
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

  public canChangeRole(): boolean {
    return !this.user || !this.identityService.isCurrentUser(this.user);
  }

  public hasError(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName)!;

    return control.dirty && control.hasError(errorCode);
  }

  public loginErrors(): string[] {
    const errors = [];

    if (this.hasError('login', 'unique-string')) {
      errors.push('Логин должен быть уникальным.');
    }

    return errors;
  }

  public apply(): void {
    const login = this.form.get('login')!.value as string;
    const password = this.form.get('password')!.value as string | null;
    const role = this.form.get('role')!.value as UserRolesEnum;
    const name = this.form.get('name')!.value as string;
    const email = this.form.get('email')!.value as string;

    this.setLoading(true);
    const request = this.user
      ? this.userService.updateUser(this.user, login, role, name, email)
      : this.userService.createUser(login, password!, role, name, email);

    const saveSubscription = request
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(user => this.userSaved.emit(user));
    this.subscriptions.add(saveSubscription);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      login: [null],
      password: [null],
      role: [null, [Validators.required]],
      name: [null],
      email: [null],
    });
    this.changeDetectorRef.markForCheck();
  }

  private updateForm(): void {
    const value: any = {
      password: null,
    };

    (
      <(keyof User)[]>['login', 'role', 'name', 'email']
    )
      .forEach(key => value[key] = this.user ? this.user[key] : null);

    this.form.setValue(value);

    this.form.get('login')!.setValidators([
      Validators.required,
      uniqueStringValidator(this.neighborUsers.map(user => user.login)),
    ]);

    this.form.get('email')!.setValidators([
      Validators.email,
      uniqueStringValidator(this.neighborUsers
        .filter(user => !!user.email)
        .map(user => user.email!),
      ),
    ]);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
