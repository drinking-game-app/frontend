import React from 'react';
import { Button, Spinner, ButtonElement, ButtonProps } from '@ui-kitten/components';
import { View } from 'react-native';


interface ButtonInputProps extends ButtonProps {
  text: string;
  loading: boolean;
  disabled: boolean;
}

export const ButtonInput = ({ text, loading, ...ButtonProps }: ButtonInputProps): ButtonElement => {

  const LoadingIndicator = (props: any) => (
    <View>
      <Spinner size="small" status="danger" />
    </View>
  );
    if(loading) return (
      <Button
      {...ButtonProps}
      accessoryRight={LoadingIndicator}
      disabled={true}
      >{text}</Button>
    )
  return (
    <Button
      {...ButtonProps}
    >{text}</Button>
  );
};

