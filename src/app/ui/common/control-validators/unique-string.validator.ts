import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueStringValidator(neighborStrings: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').toLowerCase();

    const found = neighborStrings.some(neighborString => neighborString.toLowerCase() === value);
    if (found) {
      return { 'unique-string': true };
    }

    return null;
  };
}
