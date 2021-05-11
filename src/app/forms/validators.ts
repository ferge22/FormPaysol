import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const oneOfControlRequired: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const { email, name } = control.value;

  if (email || name) {
    return null;
  }

  return { atLeastOne: true };
};
