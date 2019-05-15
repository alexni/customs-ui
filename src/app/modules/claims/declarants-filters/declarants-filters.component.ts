import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeclarantsFilters } from 'src/app/modules/claims/declarants-filters/declarants.filters';

@Component({
  selector: 'dc-declarants-filters',
  templateUrl: 'declarants-filters.component.html',
  styleUrls: ['declarants-filters.component.scss'],
})
export class DeclarantsFiltersComponent implements OnChanges, OnDestroy {

  @Input()
  public filters = new DeclarantsFilters();

  @Output()
  public changeFilters = new EventEmitter<DeclarantsFilters>();

  public form!: FormGroup;

  public subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
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

    this.filters = new DeclarantsFilters(query && query.length ? query : null);
    this.changeFilters.emit(this.filters);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      query: [null],
    });
  }

  private refreshForm(): void {
    this.form.setValue({
      query: this.filters.query,
    });
  }
}
