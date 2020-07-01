/*
 * File: game.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 4th June 2020 4:11:43 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Game related actions in the redux state
 * Last Modified: Thursday, 4th June 2020 6:14:09 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { IPlayer } from '../reducers/interfaces';
import * as GameSockClient from '@rossmacd/gamesock-client';

import Constants from 'expo-constants';
import { Dispatch } from 'redux';
import { log } from 'console';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AppRoute } from '../navigation/app-routes';
// import { NavigationActions } from 'react-navigation'
import App from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

import manifest from './../variables.json'


/**
 * Interface for hosting a game
 */
export interface IHostGame {
  username: string;
  token: string;
}
export interface IRejoinGame {
  lobbyName: string;
  id: string;
}

/**
 * Interface for joining a game
 */
export interface IJoinGame {
  username: string;
  lobbyName: string;
}

/**
 * Determinds whether to set
 * loading or not
 */
export const setGameLoading = () => {
  return {
    type: 'IS_LOADING_GAME',
  };
};

/**
 * Messages sent from the gamesock library
 */
export const setMessages = (message: string, dispatch: Dispatch) => {
  console.log('Socket message: ', message);
  dispatch({
    type: 'SET_MESSAGES',
    payload: message,
  });

  setTimeout(() => {
    dispatch({
      type: 'HIDE_MESSAGE',
      payload: message,
    });
  }, 8000);
};

export const initGameSock = () => {
  return (dispatch: Dispatch) => {
    GameSockClient.setup(manifest.SERVER_URL, `${manifest.SERVER_URL}/timesync`);

    GameSockClient.onStartGame((newGameOptions: GameSockClient.GameOptions) => {
      console.log('starting game', newGameOptions.rounds);
      startGame(newGameOptions.rounds, dispatch);
    });

    GameSockClient.onStartRound((newRoundOptions) => {
      if (newRoundOptions.roundNum === 1) {
        setPhase('Starting Game', dispatch);
      } else {
        setPhase('Starting Round', dispatch);
      }
      console.log('starting round');

      startRound(newRoundOptions, dispatch);

      setTimeout(() => {
        setPhase('Question Gathering', dispatch);
      }, 2 * 1000);
    });

    GameSockClient.onStartHotseat((allQuestions, hotseatOptions) => {
      console.log('starting hotseat');

      setPhase('Hotseat', dispatch);
      startHotseat(allQuestions, hotseatOptions, dispatch);
    });

    GameSockClient.onRoundEnd(() => {
      console.log('ending round');

      setPhase('Round Ended', dispatch);
      endGame();
    });

    GameSockClient.onSinglePlayerUpdate((newPlayer) => {
      console.log('single player update', newPlayer);

      playerUpdate(newPlayer, dispatch);
    });

    GameSockClient.onPlayerListUpdate((players) => {
      console.log('player list update', players);
      playerListUpdate(players, dispatch);
    });

    //   GameSockClient.onRequestQuestions(()=>{
    //       return props.questions.map(question => question.question);
    //   })

    GameSockClient.onHotseatAnswer((questionIndex, answers) => {
      onHotseatAnswer(questionIndex, answers, dispatch);
    });

    GameSockClient.onTimerUpdate((secondsLeft) => {
      timerUpdate(secondsLeft, dispatch);
    });

    GameSockClient.onMessage((message) => {
      setMessages(message.msg, dispatch);
    });

    /**
     * @todo add error handling here and hook up to state
     */
    GameSockClient.onError((error) => {
      console.log('error check my structure!!', error)
      // setMessages(message.msg, dispatch);
    })

    dispatch({
      type: 'INITIALISE_GAMESOCK',
    });
  };
};

/**
 * Initilise a lobby as a host from the home page
 *
 * @param {IHostGame} body
 */
export const hostGameAction = (body: IHostGame) => {
  return (dispatch: Dispatch) => {
    const lobbyName = Math.random().toString(36).substr(2, 4).toUpperCase();

    GameSockClient.createLobby(lobbyName, body.username, body.token).then((players) => {
      let user = Array.isArray(players) ? players[0] : players;

      dispatch({
        type: 'HOST_GAME',
        payload: { lobbyName: lobbyName, user: user },
      });
    });
  };
};

/**
 * Initilise a lobby as a host from the login function
 *
 * @param {IHostGame} body
 */
export const hostGame = (body: IHostGame, dispatch: any) => {
  // GameSocketConfigExport();
  const lobbyName = Math.random().toString(36).substr(2, 4).toUpperCase();

  GameSockClient.createLobby(lobbyName, body.username, body.token).then((players) => {
    let user = Array.isArray(players) ? players[0] : players;

    dispatch({
      type: 'HOST_GAME',
      payload: { lobbyName: lobbyName, user: user },
    });
  });
};

// interface ID{
//   id:string
//   expiry:number;
//   lobby:string;
// }
/**
 * Initilise a lobby as a join
 *
 * @param {IJoinGame} body
 */
export const joinGame = (body: IJoinGame) => {
  return (dispatch: Dispatch) => {
    return GameSockClient.joinLobby(body.lobbyName, body.username).then((players) => {
      let user = Array.isArray(players) ? players[players.length - 1] : players;
      AsyncStorage.setItem(
        'myId',
        JSON.stringify({
          id: user.id,
          expiry: Date.now() + 30 * 60 * 1000,
          lobby: body.lobbyName,
        })
      ).catch((e: any) => console.log(e));

      dispatch({
        type: 'JOIN_GAME',
        payload: { lobbyName: body.lobbyName, user: user },
      });
    });
  };
};

export const autoRejoinLobby = (body: IRejoinGame) => {
  return (dispatch: Dispatch) => {
    return AsyncStorage.getItem('myId')
      .then((store) => {
        if (store) {
          const parsedStore = JSON.parse(store);
          console.log('Attempting to claim with token' + parsedStore.toString(), parsedStore.expiry > Date.now());
          return GameSockClient.claimSocket(parsedStore.lobby, parsedStore.id)
            .then((data) => {
              const players = data.players;
              console.log('CLAIMED!!', players);
              const user = Array.isArray(players) ? players.find((player) => player.id === data.id) : players;
              if (!user) {
                throw 'Could not find user!';
              }
              AsyncStorage.setItem(
                'myId',
                JSON.stringify({
                  id: user.id,
                  expiry: Date.now() + 30 * 60 * 1000,
                  lobby: body.lobbyName,
                })
              ).catch((e) => console.error(e));
              console.log('TIME to dispatch');
              dispatch({
                type: 'JOIN_GAME',
                payload: { lobbyName: body.lobbyName, user: { ...user }, players: players },
              });
            })
            .catch((e) => console.error(e));
        }
      })
      .catch((e) => console.error(e));

    // return GameSockClient.claimSocket()
  };
};

// export const claimSocket = ()=>{

// }
/**
 * Start a new game as a host
 *
 */
// export const startHostGame = (lobbyName: string) => {
//     // console.log('running host game be')
//     // return (dispatch: Dispatch) => {
//     //     console.log('starting game')
//         GameSockClient.startGame(lobbyName)
//         // ((gameOptions: GameOptions) => {
//         //     console.log('game starting!', gameOptions)
//         //     dispatch({
//         //         type: 'START_GAME',
//         //         payload: gameOptions.rounds
//         //     })
//         // })
//     // }
// }

/**
 * Start a new game
 *
 */
export const startGame = (rounds: number, dispatch: Dispatch) => {
  dispatch({
    type: 'START_GAME',
    payload: rounds,
  });
};

/**
 * Start a new round
 *
 */
export const startRound = (roundOptions: GameSockClient.RoundOptions, dispatch: Dispatch) => {
  console.log('starting round!');
  dispatch({
    type: 'START_ROUND',
    payload: roundOptions,
  });
};

/**
 * Start a new game
 *
 */
export const inputQuestion = (question: GameSockClient.Question) => {
  return {
    type: 'INPUT_QUESTION',
    payload: question,
  };
};

/**
 * Updates the seconds left on a timer
 *
 * @param {number} time
 */
export const timerUpdate = (time: number, dispatch: Dispatch) => {
  dispatch({
    type: 'TIMER_UPDATE',
    payload: time,
  });
};

/**
 * Starting a hot seat during a round
 *
 * @param {Question[]} questions
 * @param {HotseatOptions} hotseatOptions
 */
export const startHotseat = (questions: GameSockClient.Question[], hotseatOptions: GameSockClient.HotseatOptions, dispatch: Dispatch) => {
  console.log('starting hotseat and setting questions!', questions);
  dispatch({
    type: 'START_HOTSEAT',
    payload: { questions, hotseatOptions },
  });
};

/**
 * When both hotseat players answer a question
 *
 * @param {number} questionIndex
 * @param {number[]} answers
 * @param {Dispatch} dispatch
 */
export const onHotseatAnswer = (questionIndex: number, answers: number[], dispatch: Dispatch) => {
  console.log('receiving answers!', answers, questionIndex);
  dispatch({
    type: 'ON_HOTSEAT_ANSWER',
    payload: { questionIndex, answers },
  });

  // setTimeout(() => {
  //       dispatch({
  //           type: "ON_NEXT_QUESTION"
  //       })
  // }, 2000);
};

export const onNextQuestion = (time: number) => {
  return (dispatch: Dispatch) => {
    console.log('next question in ', time, 'seconds');
    setTimeout(() => {
      dispatch({
        type: 'ON_NEXT_QUESTION',
      });
    }, time);
  };
};

/**
 * Update the list of players
 *
 * @param {IPlayer[]} players
 */
export const playerListUpdate = (players: IPlayer[], dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER_LIST_UPDATE',
    payload: players,
  });
};

/**
 * Update a single player
 *
 * @param {IPlayer} players
 */
export const playerUpdate = (player: IPlayer, dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER_SINGLE_UPDATE',
    payload: player,
  });
};

/**
 * Update a player by ID
 * 
 * @param {string} lobbyName
 * @param {IPlayer} user
 */
export const updateSinglePlayer = (lobbyName: string, user: IPlayer) => {
  return (dispatch: Dispatch) => {
    GameSockClient.updateSelf(lobbyName, user)
    dispatch({
      type: 'SINGLE_PLAYER_REDIRECT'
    })
  }
}

/**
 * Toggle the redirect from the update username page
 */
export const toggleRedirect = (id: string = '') => (dispatch: Dispatch) => dispatch({type: 'SINGLE_PLAYER_EDIT', payload: id})


/**
 * Leave a lobby / game
 *
 */
export const leaveGame = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'LEAVE_GAME',
    });
  };
};

/**
 * Ends a game / round depending
 * on the number of rounds
 */
export const endGame = () => {
  return {
    type: 'END_GAME',
  };
};

/**
 * Set the phase within a game
 */
export const setPhase = (phase: string, dispatch: Dispatch) => {
  dispatch({
    type: 'SET_PHASE',
    payload: phase,
  });
};

/**
 * Answer a question within a game
 */
export const answerQuestion = (lobbyName: string, questionIndex: number, playerIndex: number, roundNum: number) => {
  return (dispatch: Dispatch) => {
    console.log('new answer!', questionIndex, playerIndex);
    GameSockClient.sendAnswer(lobbyName, questionIndex, playerIndex, roundNum);
    dispatch({
      type: 'ANSWER_QUESTION',
    });
  };
};
