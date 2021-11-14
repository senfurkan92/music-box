import {
  required, email as Email, alpha, between, maxLength, numeric,
} from '@vuelidate/validators';

export class SignUp {
  constructor(name, email, age, password, repassword, country, accept) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.password = password;
    this.repassword = repassword;
    this.country = country;
    this.accept = accept;
  }
}

export const signUpValidation = () => ({
  name: {
    required,
    maxLength: maxLength(20),
    alpha,
  },
  email: {
    required,
    Email,
    maxLength: maxLength(50),
  },
  age: {
    required,
    numeric,
    between: between(18, 80),
  },
  password: {
    required,
    regexPassword: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,20})/.test(value),
  },
  country: {
    required,
  },
  accept: {
    checked: (value) => value === true,
  },
});
