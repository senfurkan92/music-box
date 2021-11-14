import {
  required, email as Email, maxLength,
} from '@vuelidate/validators';

export class SignIn {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

export const signInValidation = () => ({
  email: {
    required,
    Email,
    maxLength: maxLength(50),
  },
  password: {
    required,
  },
});
