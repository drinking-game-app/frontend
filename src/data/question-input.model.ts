import * as Yup from 'yup';

export class QuestionInputData {

  constructor(
    readonly question: string) {

  }

  static empty(): QuestionInputData {
    return new QuestionInputData(
      'Who\'s more likely',
    );
  }
}

export const JoinLobbySchema = Yup.object().shape({
    question: Yup.string().matches(/^Who's more likely.*$/, { message: 'Question must start with \"Whos\'s more likely\"' })
});
