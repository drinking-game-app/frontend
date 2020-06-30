import React, { useState } from 'react';
import { ViewPager, Layout, Text, Button } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { Image } from 'react-native'
import { ModalHeader } from '../../components/modal-header.component';
import { AppRoute } from '../../navigation/app-routes';
import { RulesScreenProps } from '../../navigation/main.navigator';

/**
 * Importing styles
 * @param theme path
 * @param Rules Module name
 */
const styles = require('../../themes')('Rules');

const contentArr = [
    {
        imgSrc: require('../../../assets/Extra.png'),
        title: 'WELCOME TO SHCOOP',
        description: 'A "not a drinking game" game where you and your mates can be put up against each other to a "Who is more likely to..." deathmatch! Fun right? So, here are the rules...'
    },
    {
        imgSrc: require('../../../assets/Hosting.png'),
        title: 'HOSTING',
        description: 'To host, either sign in via Google/Apple or sign up with us then login with your custom account. Once signed in, you will be shcooped into your own lobby with a code to send to your friends. The more the merrier! (By the way, only you, as the host, can start the game). '
    },
    {
        imgSrc: require('../../../assets/Joining1.png'),
        title: 'JOINING',
        description: 'Simple. Enter the lobby code and your own username (can literally be anything) and hit join.'
    },
    {
        imgSrc: require('../../../assets/Hosting1.png'),
        title: 'IN-GAME: CHOSEN',
        description: 'So you got chosen? Poor bastard. Here is what you do: The non-chosen players will make up questions for you chosen players and once the time is up, you answer those questions by either tapping/clicking your avatar or your opponents.'
    },
    {
        imgSrc: require('../../../assets/ChosenorNotChosen.png'),
        title: 'IN-GAME: NOT CHOSEN',
        description: 'Ah yes, the lucky one. Your job is to make questions for the chosen players within a time limit. Cannot think of any? Do not worry, boo boo, we got you! Hit the randomise button on the bottom left, let us make the question for you. Questions good? Let em have it!'
    },
]

const Rules = (props: RulesScreenProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const navigate = (i: number) => {
        if (i >= contentArr.length - 1) return props.navigation.navigate(AppRoute.HOME)

        setSelectedIndex(selectedIndex + 1)
    }

    return (
        <ViewPager
            style={styles.rulesContainer}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
        >
            {contentArr.map((page, i) => {
                return (
                    <Layout
                        key={i}
                        style={styles.tab}
                        level='2'
                    >
                        <Text category='h1' style={styles.ruleHeading}>{page.title}</Text>
                        <Text style={styles.ruleDescription}>{page.description}</Text>
                        <Image resizeMode={'contain'} style={styles.rulesImage} source={page.imgSrc} />
                        <Button status="success" style={styles.rulesBtn} onPress={() => navigate(selectedIndex)}>{selectedIndex >= contentArr.length - 1 ? 'YEEHAW TIME' : 'NEXT'}</Button>
                    </Layout>
                )
            })}

        </ViewPager>
    )
}

export default Rules