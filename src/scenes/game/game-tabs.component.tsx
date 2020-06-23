
import React from 'react'
import { TabBar, Tab, Icon, IconProps, Layout } from '@ui-kitten/components'
import PlayerList from '../../components/player-list.component';
import QuestionList from '../../components/question-list.component';
import { StyleSheet, View } from "react-native";

interface IProps {
    showTabs: boolean;
}

const useTabBarState = (initialState = 0) => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
};

const GameTabs = (props: IProps) => {

    const topState = useTabBarState()

    const renderIcon = (props: IconProps, name: string) => (
        <Icon {...props} name={name} />
    )

    if (props.showTabs) {
        return (
            <React.Fragment>
                <TabBar {...topState} >
                    <Tab title="Score" icon={(props) => renderIcon(props, "person-outline")}
                    />
                    <Tab title="Questions" icon={(props) => renderIcon(props, "question-mark-outline")}

                    />
                </TabBar>
                <View style={styles.tabContainer}>
                    {
                        topState.selectedIndex === 0
                            ? <PlayerList />
                            : <QuestionList />
                    }

                </View>
            </React.Fragment>
        )
    }

    return (
        <PlayerList />
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1
    },
});

export default GameTabs