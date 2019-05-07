import { Observable } from 'rxjs';
import { TableData } from 'src/app/ui/table-with-paginator/table-data.interface';

export type SourceFn<T> = (offset: number, limit: number) => Observable<TableData<T>>;

export class TableDataSource<T> {
  constructor(private sourceFn: SourceFn<T>) {
  }

  public loadList(offset: number, limit: number): Observable<TableData<T>> {
    return this.sourceFn(offset, limit);
  }
}
