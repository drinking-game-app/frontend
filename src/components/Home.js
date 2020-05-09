import React from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require('../themes')('App');

const reasonsArr = [
    {id: 0, text: 'he smells'},
    {id: 1, text: 'he is bad at C++'},
    {id: 2, text: 'nobody really likes him'},
]

export default () => (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Drinking Game App</Text>
        <View>
            <Text style={styles.title}>Reasons why people don't like <Text style={styles.accent}>Ryan</Text>:</Text>
            <FlatList
                data={reasonsArr}
                renderItem={({item}) => <Item text={item.text} />}
                keyExtractor={item => item.id}
            />
        </View>
      </SafeAreaView>
)

function Item({ text }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{text}</Text>
      </View>
    );
}