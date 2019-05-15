import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClaimsFilters } from 'src/app/modules/claims/claims-filters/claims.filters';
import { ClaimsService } from 'src/app/modules/claims/claims.service';
import { DeclarantsFilters } from 'src/app/modules/claims/declarants-filters/declarants.filters';
import { Declarant } from 'src/app/modules/claims/models/declarant';
import { TableDataSource } from 'src/app/ui/table-with-paginator/table-data.source';
import { TableWithPaginatorComponent } from 'src/app/ui/table-with-paginator/table-with-paginator.component';
import { Column } from 'src/app/ui/table/column';

@Component({
  selector: 'dc-declarants',
  templateUrl: './declarants.component.html',
  styleUrls: ['./declarants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarantsComponent implements OnInit {

  public columns: Column[] = [];

  public filters = new DeclarantsFilters();

  public paginatorSource!: TableDataSource<Declarant>;

  @ContentChild('actions')
  public actionsTemplate?: TemplateRef<any>;

  @ViewChild(TableWithPaginatorComponent)
  private tableComponent!: TableWithPaginatorComponent<Declarant>;

  @ViewChild('stateTemplate')
  private stateTemplate!: TemplateRef<any>;

  constructor(
    private claimsService: ClaimsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.columns = [
      new Column('phone', 'Телефон'),
      new Column('surname', 'Фамилия'),
      new Column('name', 'Имя'),
      new Column('patronymic', 'Отчество'),
      new Column('state', 'Статус декларанта', this.stateTemplate),
    ];

    this.createPaginatorSource();
  }

  public setFilters(filters: ClaimsFilters): void {
    this.filters = filters;
    this.changeDetectorRef.markForCheck();
    this.tableComponent.reloadList();
  }

  public replaceDeclarant(declarant: Declarant): void {
    this
      .tableComponent
      .replaceEntity(declarant, (targetEntity: Declarant, entity: Declarant) => targetEntity.id === entity.id);
  }

  private createPaginatorSource(): void {
    this.paginatorSource = new TableDataSource<Declarant>((offset: number, limit: number) => this
      .claimsService
      .loadDelarantsList(offset, limit, this.filters.query),
    );
  }

}
