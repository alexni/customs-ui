import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material';
import { isEqual } from 'lodash';
import { Subscription } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { PaginatorComponent } from 'src/app/ui/paginator/paginator.component';
import { TableData } from 'src/app/ui/table-with-paginator/table-data.interface';
import { TableDataSource } from 'src/app/ui/table-with-paginator/table-data.source';
import { Column } from 'src/app/ui/table/column';
import { defaultTrClassName, TrClassNameFn } from 'src/app/ui/table/tr-class-name.function';

@Component({
  selector: 'dc-table-with-paginator',
  templateUrl: './table-with-paginator.component.html',
  styleUrls: ['./table-with-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWithPaginatorComponent<T> implements OnChanges {

  @Input()
  public columns!: Column[];

  @Input()
  public dataSource!: TableDataSource<T>;

  @Input()
  public trClassName: TrClassNameFn<T> = defaultTrClassName;

  @ContentChild('actions')
  public actionsTemplate?: TemplateRef<any>;

  @ViewChild(PaginatorComponent)
  public paginatorComponent!: PaginatorComponent;

  public page = 1;

  public pageSize = 25;

  public list!: TableData<T>;

  public loading = true;

  private loadListSubscription: Subscription | null = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource) {
      this.reloadList();
    }
  }

  public setPageData(event: PageEvent): void {
    if (event.pageIndex + 1 === this.page && event.pageSize === this.pageSize) {
      return;
    }

    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;

    this.loadList(true);
  }

  public reloadList(): void {
    this.page = 1;
    this.paginatorComponent.resetPage();
    this.loadList(true);
  }

  public replaceEntity(targetEntity: T, predicate: (targetEntity: T, entity: T) => boolean): boolean {
    const items = [...this.list.items];

    const index = items.findIndex(entity => predicate(targetEntity, entity));
    if (index !== -1) {
      items[index] = targetEntity;
      this.list.items = items;
      this.changeDetectorRef.markForCheck();

      return true;
    }

    return false;
  }

  public loadList(displayLoading: boolean): void {
    this.loadListUnsubscribe();
    displayLoading && this.setLoading(true);

    this.loadListSubscription = this.dataSource
      .loadList((this.page - 1) * this.pageSize, this.pageSize)
      .pipe(
        finalize(() => displayLoading && this.setLoading(false)),
        filter(list => !isEqual(list, this.list)),
      )
      .subscribe(list => {
        this.list = list;
        this.changeDetectorRef.markForCheck();
      });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

  private loadListUnsubscribe(): void {
    if (this.loadListSubscription) {
      this.loadListSubscription.unsubscribe();
      this.loadListSubscription = null;
    }
  }

}
