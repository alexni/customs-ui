import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClaimsFilters } from 'src/app/modules/claims/claims-filters/claims.filters';
import { ClaimStatesEnum } from 'src/app/modules/claims/enums/claim-states.enum';
import { IdentityService } from 'src/app/modules/users/identity.service';
import { User } from 'src/app/modules/users/models/user';

@Component({
  selector: 'dc-claims-filters',
  templateUrl: 'claims-filters.component.html',
  styleUrls: ['claims-filters.component.scss'],
})
export class ClaimsFiltersComponent implements OnChanges, OnDestroy {

  public readonly CLAIM_STATES_ENUM = ClaimStatesEnum;

  @Input()
  public filters = new ClaimsFilters();

  @Output()
  public changeFilters = new EventEmitter<ClaimsFilters>();

  public form!: FormGroup;

  public subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
  ) {
    this.createForm();
  }

  private get user(): User {
    return this.identityService.getCurrentUser()!;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      this.refreshForm();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public applyFilters(): void {
    const query = this.form.get('query')!.value as string | null;
    const state = this.form.get('state')!.value as ClaimStatesEnum | null;
    const managerId = this.form.get('onlyMyClaims')!.value ? this.user.id : null;

    this.filters = new ClaimsFilters(query && query.length ? query : null, managerId, state);
    this.changeFilters.emit(this.filters);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      query: [null],
      state: [null],
      onlyMyClaims: [null],
    });
  }

  private refreshForm(): void {
    this.form.setValue({
      query: this.filters.query,
      state: this.filters.state,
      onlyMyClaims: this.filters.managerId
        ? this.filters.managerId === this.user.id
        : null,
    });
  }
}
