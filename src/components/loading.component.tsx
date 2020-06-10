/*
 * File: loading.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Wednesday, 10th June 2020 5:35:40 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Component which displays loading spinner
 * Last Modified: Wednesday, 10th June 2020 5:36:37 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { Spinner, Text, Layout } from "@ui-kitten/components";
import { View } from "react-native";


/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("Game");

interface IProps {
    text?: string;
}

const LoadingComponent = ({text = ""}: IProps) => (
    <Layout style={styles.gameLoadingSpinner}>
        <View style={styles.loadingSpinner} >
            <Spinner size="giant" status="info" />
        </View>
        <Text style={styles.title}>{text}</Text>
    </Layout>
)

export default LoadingComponent