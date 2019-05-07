import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TableData } from 'src/app/ui/table-with-paginator/table-data.interface';
import { TableDataSource } from 'src/app/ui/table-with-paginator/table-data.source';
import { Column } from 'src/app/ui/table/column';

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

  @ContentChild('actions')
  public actionsTemplate?: TemplateRef<any>;

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
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;

    this.loadList();
  }

  public reloadList(): void {
    this.page = 1;
    this.loadList();
  }

  private loadList(): void {
    this.loadListUnsubscribe();
    this.setLoading(true);
    this.loadListSubscription = this.dataSource
      .loadList((this.page - 1) * this.pageSize, this.pageSize)
      .pipe(
        finalize(() => this.setLoading(false)),
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
