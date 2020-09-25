import { ValidatorFn, AbstractControl} from '@angular/forms';

export class CustomValidators {
    static patternValidator(regex: RegExp, error: any): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null;
          }
          const valid = regex.test(control.value);
          return valid ? null : error;
        };
      }

      static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; 
        const confirmPassword: string = control.get('currentpassword').value; 
        if (password !== confirmPassword) {
          control.get('currentpassword').setErrors({ NoPassswordMatch: true });
        }
      }
}
