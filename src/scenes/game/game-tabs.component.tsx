
import React from 'react'
import { TabBar, Tab, Icon, IconProps, Layout, TabView } from '@ui-kitten/components'
import PlayerList from '../../components/player-list.component';
import QuestionList from '../../components/question-list.component';
import { StyleSheet, View } from "react-native";

interface IProps {
    showTabs: boolean;
    editPage: () => void;
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
            <Layout style={styles.tabTop}>
                <TabView {...topState} tabBarStyle={styles.tabTop} indicatorStyle={{backgroundColor: '#00b0ff'}} >
                    <Tab title="Score" icon={(props) => renderIcon(props, "person-outline")} style={styles.tabContainer}> 
                        <PlayerList editPage={(id: string) => props.editPage(id)} />
                    </Tab>
                    <Tab title="Questions" icon={(props) => renderIcon(props, "question-mark-outline")} style={styles.tabContainer}>
                        <QuestionList />
                    </Tab>
                </TabView>
  
            </Layout>
        )
    }

    return (
        <PlayerList editPage={(id: string) => props.editPage(id)} />
    )
}

const styles = StyleSheet.create({
    tabTop: {
        backgroundColor: '#d14787',
        color: '#fff',
        borderRadius: 8
    },
    tabContainer: {
        // flex: 1,
        // backgroundColor: '#161f26',
    },
});

export default GameTabs