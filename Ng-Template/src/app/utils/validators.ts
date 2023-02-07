import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const email = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    /// get value from control
    const value = control.value;

    /// check if value is null or empty
    /// if it is null or empty return null
    if (!value) {
      return null;
    }

    /// set regular expression for email
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
    /// test email with regular expression
    const emailTest = emailRegex.test(value);

    /// if email is not valid return error
    /// else return null
    return !emailTest ? { email: true } : null;
  };
};

const phone = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    /// get value from control
    const value = control.value;
    /// check if value is null or empty
    /// if it is null or empty return null
    if (!value) {
      return null;
    }
    /// set regular expression for phone
    const phoneRegex = new RegExp(/^((\+92)|(0))(3)([0-9]{9})$/);
    /// test phone with regular expression
    const phoneTest = phoneRegex.test(value);
    /// if phone is not valid return error
    /// else return null
    return !phoneTest ? { phone: true } : null;
  };
};


const CustomValidators = {
  email,
  phone,
};


export default CustomValidators;
