import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material';

import { PaginatorComponent } from './paginator.component';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],

  declarations: [
    PaginatorComponent,
  ],

  exports: [
    PaginatorComponent,
  ],
})
export class PaginatorModule { }
