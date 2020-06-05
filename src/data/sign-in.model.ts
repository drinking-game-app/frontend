import * as Yup from 'yup';

export class SignInData {

  constructor(
    readonly email: string,
    readonly password: string) {

  }

  static empty(): SignInData {
    return new SignInData(
      '',
      '',
    );
  }
}

export const SignInSchema = Yup.object().shape({
  email: Yup.string().min(1, "Email cannot be blank").email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

