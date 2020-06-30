import * as Yup from 'yup';

export class EditUserData {

  constructor(
    readonly username: string) {

  }

  static empty(): EditUserData {
    return new EditUserData(
      '',
    );
  }
}

export const EditUserSchema = Yup.object().shape({
  username: Yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
});

