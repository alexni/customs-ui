import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Column } from 'src/app/ui/table/column';
import { defaultTrClassName, TrClassNameFn } from 'src/app/ui/table/tr-class-name.function';

@Component({
  selector: 'dc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements AfterContentInit {

  @Input()
  public columns!: Column[];

  @Input()
  public items!: T[];

  @Input()
  public trClassName: TrClassNameFn<T> = defaultTrClassName;

  @ContentChild('actions')
  public actionsTemplate?: TemplateRef<any>;

  public displayedColumns!: string[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngAfterContentInit(): void {
    this.displayedColumns =
      (
        this.columns || []
      ).map(column => column.property);

    if (this.actionsTemplate) {
      this.displayedColumns.push('actions');
    }
    this.changeDetectorRef.markForCheck();
  }

}
