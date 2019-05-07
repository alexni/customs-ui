import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { PaginatorModule } from 'src/app/ui/paginator/paginator.module';
import { TableWithPaginatorComponent } from 'src/app/ui/table-with-paginator/table-with-paginator.component';
import { TableModule } from 'src/app/ui/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    LoaderWithBackdropModule,
    PaginatorModule,
    TableModule,
  ],

  declarations: [
    TableWithPaginatorComponent,
  ],

  exports: [
    TableWithPaginatorComponent,
  ],
})
export class TableWithPaginatorModule {
}
