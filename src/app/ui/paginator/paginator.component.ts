import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'dc-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {

  public readonly PAGE_SIZE_OPTIONS = [5, 10, 25, 100];

  @Input()
  public length!: number;

  @Input()
  public pageSize = 25;

  @Output()
  public readonly changePageData = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator)
  public matPaginator!: MatPaginator;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public resetPage(): void {
    this.matPaginator.firstPage();
    this.changeDetectorRef.markForCheck();
  }
}
