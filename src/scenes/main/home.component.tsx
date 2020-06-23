/*
 * File: Home.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 11th May 2020 11:36:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: A simple static page to demonstrate some features of react native
 * Last Modified: Saturday, 16th May 2020 8:57:16 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Layout, Text, Icon, IconProps } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import { IInitialState } from '../../reducers/interfaces';
import { connect } from 'react-redux';
import { gameActions } from '../../actions';
import { HomeScreenProps } from '../../navigation/main.navigator';
import { IHostGame, IRejoinGame } from '../../actions/game';
import SignoutScreen from '../auth/sign-out.component';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import { Player } from '@rossmacd/gamesock-client';
/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require('../../themes')('App');
const baseUrl = Constants.manifest.extra.SERVER_URL || 'http://192.168.0.164:3000';
interface IActions extends HomeScreenProps {
  hostGameAction: (body: IHostGame) => void;
  autoRejoinLobby:(body:IRejoinGame)=>Promise<Player[]>;
}

interface IProps {
  name: string;
  token: string;
  isHost: boolean;
}

/**
 * Rendering the view
 */
const Home = (props: IProps & IActions) => {
  const [canRejoin, setCanRejoin] = useState<boolean>(false);
  const [rejoinInfo,setRejoinInfo]=useState<IRejoinGame>({id:'',lobbyName:''})

  useEffect(() => {
    // Check if a previous game is in localstorage
    AsyncStorage.getItem('myId').then(unparsedID=>{
      if (unparsedID) {
        // Parse the object
        const parsedOldID = JSON.parse(unparsedID);
        if (parsedOldID && parsedOldID.expiry && parsedOldID.expiry > Date.now()) {
          fetch(`${baseUrl}/api/gameActive`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              id: parsedOldID.id,
              lobbyName: parsedOldID.lobby,
            }),
          }).then((res) => {
            console.log('FETCH:RES', res);
            if (res.ok) {
              res.json().then((data) => {
                if (data && data.active) {
                  console.log('Shes sound let her go', data.active);
                  setRejoinInfo({id:parsedOldID,lobbyName:parsedOldID.lobby})
                  setCanRejoin(true);
                }
              });
            }
          });
        }
      }
    }).catch(e=>console.error(e));
  }, []);
  /**
   * If the user is logged in, start a new game as a host
   *
   * if not redirect them to auth
   */
  const hostOrLogin = () => {
    if (props.token && props.token !== '') {
      props.hostGameAction({ username: props.name, token: props.token });
      props.navigation.navigate(AppRoute.GAME);
    } else props.navigation.navigate(AppRoute.AUTH);
  };

  const settingsIcon = (props: IconProps) => <Icon {...props} name="settings-2-outline" />;

  const renderSignoutAndCogContainer = () => {
    if (props.token && props.token !== '')
      return (
        <View style={styles.signOutAndCogContainer}>
          <SignoutScreen />
          <Button style={styles.settingsCog} onPress={() => props.navigation.navigate(AppRoute.DEVINFO)} appearance="ghost" accessoryRight={settingsIcon}></Button>
        </View>
      );

    return (
      <View style={styles.signOutAndCogContainer}>
        <Button style={styles.settingsCog} onPress={() => props.navigation.navigate(AppRoute.DEVINFO)} appearance="ghost" accessoryRight={settingsIcon}></Button>
      </View>
    );
  };

  const renderRejoin = () => {
    if (canRejoin) {
      console.log(canRejoin)
      //Show the rejoin button
      return (
        <Button style={styles.formButtonAlternate} onPress={() => {
            props.autoRejoinLobby(rejoinInfo).then(()=>{
            //TODO make this conditional
            props.navigation.navigate(AppRoute.GAME)
          }).catch(e=>{
            console.log(e)
            setCanRejoin(false)
          })
        }}>
          {'REJOIN GAME '+rejoinInfo.lobbyName}
        </Button>
      );
    }
  };





  return (
    <Layout style={styles.container}>
      {renderSignoutAndCogContainer()}
      <Text style={styles.title}>WHO IS</Text>
      <Text style={styles.titleRed}>MORE LIKELY</Text>
      <Text style={styles.title}>TO</Text>

      <View>
        {renderRejoin()}
        <Button style={styles.formButton} onPress={() => hostOrLogin()}>
          HOST
        </Button>

        <Button style={styles.formButton} onPress={() => props.navigation.navigate(AppRoute.GAME)}>
          JOIN
        </Button>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state: IInitialState): IProps => {
  const { token, name } = state.auth;
  const { isHost } = state.game;

  return { token, name, isHost };
};

export default connect(mapStateToProps, gameActions)(Home);
