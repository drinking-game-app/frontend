/*
 * File: toast.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 11th June 2020 5:50:32 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: A toast component which takes in a message and optional action
 * Last Modified: Thursday, 11th June 2020 5:55:50 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */



import { Modal, Layout, Text } from "@ui-kitten/components"
import React from "react"
import { ButtonInput } from "./form-button.component";
import { View } from "react-native";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("Toast");


/**
 * Interface props for the component
 */
interface IProps {
    message: string;
    time?: number;
    action?: () => void;
    actionText?: string;
}

const Toast = ({message, time = 0, action = () => {return}, actionText = ""}: IProps) => {
    const [visible, setVisible] = React.useState<boolean>(true)

    /**
     * Dismiss the toast
     */
    const dismiss = () => {
        setVisible(old => false)
    }

    /**
     * If time prop
     */
    // if(time !== 0) {
    //     setTimeout(() => {
    //         dismiss()
    //     }, time);
    // }

    const renderActionButton = () =>{
        if(actionText !== "") return (
            <ButtonInput
                style={styles.modalDismiss}
                text={actionText}
                disabled={false}
                loading={false}
                onPress={() => action()}
            />
        )

        return <></>
    }


    return (
        <Modal visible={visible} style={[styles.modal, {top: '90%'}]}>
            <Text>{message}</Text>
            {renderActionButton}
            <ButtonInput
                style={styles.modalDismiss}
                text=""
                icon="close-outline"
                disabled={false}
                loading={false}
                onPress={() => dismiss()}
            />
        </Modal>
    )
}

export default Toast