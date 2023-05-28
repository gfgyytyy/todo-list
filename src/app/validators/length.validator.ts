import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function arrayMinLength (min: number = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!Array.isArray(control.value)) {
      return {
        required: true,
      }
    }
    const value = control.value as any[]
    if (value.length < min) {
      return {
        required: true,
      }
    }
    return null
  }
}

export function maxLength (max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString()
    if (!value) {
      return {
        required: true,
      }
    }
    if (value.length > max) {
      return {
        maxLengthExceeded: true,
      }
    }
    return null
  }
}
