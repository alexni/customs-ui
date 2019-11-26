import { NgModule } from '@angular/core';
import { PluralsPipe } from 'src/app/ui/plurals/plurals.pipe';

@NgModule({
  declarations: [
    PluralsPipe,
  ],

  exports: [
    PluralsPipe,
  ],
})
export class PluralsModule {
}
