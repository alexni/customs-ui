import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ClaimsFilters } from 'src/app/modules/claims/claims-filters/claims.filters';
import { ClaimsService } from 'src/app/modules/claims/claims.service';
import { Claim } from 'src/app/modules/claims/models/claim';
import { TableDataSource } from 'src/app/ui/table-with-paginator/table-data.source';
import { TableWithPaginatorComponent } from 'src/app/ui/table-with-paginator/table-with-paginator.component';
import { Column } from 'src/app/ui/table/column';
import { TrClassNameFn } from 'src/app/ui/table/tr-class-name.function';

@Component({
  selector: 'dc-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent implements OnInit, OnDestroy {

  private static readonly POOLING_INTERVAL = 3000;

  public columns: Column[] = [];

  public filters = new ClaimsFilters();

  public paginatorSource!: TableDataSource<Claim>;

  @ContentChild('actions')
  public actionsTemplate?: TemplateRef<any>;

  @ViewChild(TableWithPaginatorComponent)
  private tableComponent!: TableWithPaginatorComponent<Claim>;

  @ViewChild('timestampTemplate')
  private timestampTemplate!: TemplateRef<any>;

  @ViewChild('declarantTemplate')
  private declarantTemplate!: TemplateRef<any>;

  @ViewChild('stateTemplate')
  private stateTemplate!: TemplateRef<any>;

  private poolingSubscription: Subscription | null = null;

  constructor(
    private claimsService: ClaimsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.columns = [
      new Column('id', 'Номер заявки'),
      new Column('checkpoint', 'Пункт пропуска'),
      new Column('carrier', 'Перевозчик'),
      new Column('declarant', 'Декларант', this.declarantTemplate),
      new Column('timestamp', 'Дата создания', this.timestampTemplate),
      new Column('state', 'Статус заявки', this.stateTemplate),
    ];
    this.createPaginatorSource();
    this.startPooling();
  }

  public ngOnDestroy(): void {
    this.stopPooling();
  }

  public setFilters(filters: ClaimsFilters): void {
    this.filters = filters;
    this.changeDetectorRef.markForCheck();
    this.tableComponent.reloadList();
  }

  public trClassName: TrClassNameFn<Claim> = (entity: Claim): string => {
    if (entity.isNew) {
      return 'claim-new';
    }

    return '';
  }

  private stopPooling(): void {
    if (this.poolingSubscription) {
      this.poolingSubscription.unsubscribe();
      this.poolingSubscription = null;
    }
  }

  private startPooling(): void {
    this.poolingSubscription = timer(0, ClaimsComponent.POOLING_INTERVAL)
        .subscribe(() => this.tableComponent.loadList(false));
  }

  private createPaginatorSource(): void {
    this.paginatorSource = new TableDataSource<Claim>((offset: number, limit: number) => this
      .claimsService
      .loadClaimsList(offset, limit, this.filters.query, this.filters.managerId, this.filters.state),
    );
  }

}
