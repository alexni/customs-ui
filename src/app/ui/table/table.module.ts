import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { TableComponent } from 'src/app/ui/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
  ],

  declarations: [
    TableComponent,
  ],

  exports: [
    TableComponent,
  ],
})
export class TableModule {
}
