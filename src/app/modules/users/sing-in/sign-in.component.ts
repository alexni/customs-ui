import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityService } from 'src/app/modules/users/identity.service';

@Component({
  selector: 'dc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  public loading = false;

  private subscriptions = new Subscription();

  constructor(
    private identityService: IdentityService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public apply(): void {
    const login = this.form.get('login')!.value;
    const password = this.form.get('password')!.value;

    this.setLoading(true);
    const signInSubscription = this.identityService
      .signIn(login, password)
      .pipe(
        map(() => this.setLoading(false)),
      )
      .subscribe(() => this.router.navigate(['/']));
    this.subscriptions.add(signInSubscription);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      login: [null],
      password: [null, [Validators.required]],
    });
    this.changeDetectorRef.markForCheck();
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
