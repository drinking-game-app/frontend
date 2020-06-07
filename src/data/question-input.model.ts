import * as Yup from 'yup';

export class QuestionInputData {

  constructor(
    readonly questionInput: string) {

  }

  static empty(): QuestionInputData {
    return new QuestionInputData(
      'Who\'s more likely to',
    );
  }
}

export const QuestionSchema = Yup.object().shape({
    questionInput: Yup.string().matches(/^Who's more likely.*$/, { message: 'Question must start with \"Whos\'s more likely\"' }).required('Question is required')
});
