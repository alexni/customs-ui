import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material';

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
}
