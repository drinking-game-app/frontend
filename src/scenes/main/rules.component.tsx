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

const icon = Constants.manifest.icon

const contentArr = [
    {
        imgSrc: '../../assets/img/icon.png',
        title: 'This is a title',
        description: 'This is a description on how some shit is gonna work I dont know it just needs to fill up some space john doesnt actually have a niece its all a myth to get your money'
    },
    {
        imgSrc: '../../assets/img/icon.png',
        title: 'This is a title',
        description: 'This is a description on how some shit is gonna work I dont know it just needs to fill up some space john doesnt actually have a niece its all a myth to get your money'
    },
    {
        imgSrc: '../../assets/img/icon.png',
        title: 'This is a title',
        description: 'This is a description on how some shit is gonna work I dont know it just needs to fill up some space john doesnt actually have a niece its all a myth to get your money'
    }
]

const Rules = (props: RulesScreenProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const navigate = (i: number) => {
        if(i >= contentArr.length - 1) return props.navigation.navigate(AppRoute.HOME)

        setSelectedIndex(selectedIndex+1)
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
                    level='2'>
                        <Text category='h1'>{page.title}</Text>
                        <Image style={styles.rulesImage} source={require('../../assets/img/icon.png')} />
                        <Text>{page.description}</Text>
                        <Button status="success" style={styles.rulesBtn} onPress={() => navigate(selectedIndex)}>{selectedIndex >= contentArr.length - 1 ? 'YEEHAW TIME' : 'NEXT'}</Button>
                    </Layout>
                )
            })}
      
        </ViewPager>   
    )
}

export default Rules