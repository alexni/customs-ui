import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';

import { LoaderWithBackdropComponent } from './loader-with-backdrop.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],

  declarations: [
    LoaderWithBackdropComponent,
  ],

  exports: [
    LoaderWithBackdropComponent,
  ],
})
export class LoaderWithBackdropModule { }
