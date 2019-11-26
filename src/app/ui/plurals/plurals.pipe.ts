import { Pipe, PipeTransform } from '@angular/core';

export enum Plurals {
  TYPE_0,
  TYPE_1,
  TYPE_2,
}

@Pipe({
  name: 'dcPlurals',
})
export class PluralsPipe implements PipeTransform {

  public transform(quantity: number, firstLabel: string, secondLabel: string, thirdLabel: string): string {
    const plural = this.calcPlural(quantity);

    let label = thirdLabel;
    if (plural === Plurals.TYPE_0) {
      label = firstLabel;
    } else if (plural === Plurals.TYPE_1) {
      label = secondLabel;
    }

    return `${quantity} ${label}`;
  }

  private calcPlural(rawQuantity: number): Plurals {
    const quantity = Math.abs(rawQuantity);

    if (quantity % 10 === 1 && quantity % 100 !== 11) {
      return Plurals.TYPE_1;
    }

    if (quantity % 10 >= 2 && quantity % 10 <= 4 && (quantity % 100 < 10 || quantity % 100 >= 20)) {
      return Plurals.TYPE_2;
    }

    return Plurals.TYPE_0;
  }

}
