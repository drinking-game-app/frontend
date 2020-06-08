import * as GameSockClient from '@rossmacd/gamesock-client'
import { setPhase, endGame, startGame, startHotseat, playerListUpdate, timerUpdate, onHotseatAnswer, setMessages, playerUpdate } from './game'
import { IInitialState } from '../reducers/interfaces'
import { connect } from 'react-redux'


export interface GameOptions{
    // The total nuber of rounds
    rounds:number;
}
export interface HotseatOptions{
    // The time to answer the question
    tta:number;
}

/**
 * Interface props for the
 *  gamesock config
 */
interface IProps {
    questions: GameSockClient.Question[]
}


console.log('running! socket')
/**
 * Set the functions for the Gamesock library
 * 
 * 
 */
const GameSockConfig =(props: IProps)=>{
    console.log('running! check 2 socket')

    // GameSockClient.setup(Constants.manifest.extra.SERVER_URL, `${Constants.manifest.extra.SERVER_URL}/timesync`)

    GameSockClient.onStartGame((newGameOptions:GameOptions)=>{
        startGame(newGameOptions)
    })

    GameSockClient.onStartRound((newRoundOptions)=>{
    if(newRoundOptions.roundNum === 1) {setPhase('Starting Game')}
      else {setPhase('Starting Round')}
    })

    GameSockClient.onStartHotseat((allQuestions,hotseatOptions)=>{
        setPhase('Hotseat')
        startHotseat(allQuestions,hotseatOptions)
    })

    GameSockClient.onRoundEnd(() => { 
        setPhase('Round Ended')
        endGame()
      })

      GameSockClient.onSinglePlayerUpdate((newPlayer)=>{
          playerUpdate(newPlayer)
        
      })

      GameSockClient.onPlayerListUpdate((players)=>{
        playerListUpdate(players)
      })

      GameSockClient.onRequestQuestions(()=>{
          return props.questions.map(question => question.question);
      })

    GameSockClient.onHotseatAnswer((questionIndex,answers)=>{
        onHotseatAnswer(questionIndex,answers)
    })

    GameSockClient.onTimerUpdate((secondsLeft)=>{
        timerUpdate(secondsLeft)
    })


    // 
    GameSockClient.onMessage((message)=>{
        setMessages(message.msg)
    })
}
// gamesockConfig();

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const { questions } = state.game;
  
    return {
        questions
    };
  };
  
  export const GameSocketConfigExport = () => {connect<IProps>(
    mapStateToProps
  )(GameSockConfig);}
  

// export default gamesockConfig 