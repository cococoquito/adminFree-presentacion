import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Function que no permite espacios en blanco para los inputs
 */
export function NoWhitespaceValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {

        // messy but you get the idea
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': 'value is only whitespace' }
    };
}