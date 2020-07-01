import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import manifest from './../variables.json'
import React, { useEffect } from 'react';
import { Text } from '@ui-kitten/components';


const PaymentComponent = () => {

    const runSetup = async() => {
        await Stripe.setOptionsAsync({
            publishableKey: manifest.STRIPE_PUBLISHABLE_TEST, // Your key
            androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
            merchantId: manifest.APPLE_MERCHANT_ID, // [optional] used for payments with ApplePay
        });
    }
    const setForm = async() => {
        await Stripe.paymentRequestWithCardFormAsync()
    }

    return (
    <React.Fragment>
        <Text>Cough Cough</Text>
    </React.Fragment>
    )
}

export default PaymentComponent