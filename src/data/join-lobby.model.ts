import * as Yup from 'yup';

export class JoinLobbyData {

  constructor(
    readonly lobbyName: string,
    readonly username: string) {

  }

  static empty(): JoinLobbyData {
    return new JoinLobbyData(
      '',
      '',
    );
  }
}

export const JoinLobbySchema = Yup.object().shape({
  lobbyName: Yup.string().min(4, "Lobby code must be 4 characters").max(5, 'Lobby code cannot be over 5 characters').required('Lobby Code is required'),
  username: Yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
});

