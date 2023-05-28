import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'

export function onlyNumberAndAlphabet (): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    if (typeof value === 'string') {
      const regexResult = value.toString().match(/^[A-Z0-9]$/)
      if (regexResult === null) {
        return {
          regexError: true,
        }
      } else {
        return null
      }
    } else {
      return {
        regexError: true,
      }
    }
  }
}
