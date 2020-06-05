import * as Yup from 'yup';

export class SignUpData {

  constructor(
    readonly email: string,
    readonly password: string) {

  }

  static empty(): SignUpData {
    return new SignUpData(
      '',
      '',
    );
  }
}

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(4, "Name must be at least 4 characters").required(),
  email: Yup.string().min(1, "Email cannot be blank").email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  password_confirm: Yup.string().oneOf([Yup.ref('password')], 'Password must match'),
});

