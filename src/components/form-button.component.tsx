import React from 'react';
import { Button, Spinner, ButtonElement, ButtonProps, IconProps, Icon } from '@ui-kitten/components';
import { View } from 'react-native';


interface ButtonInputProps extends ButtonProps {
  text: string;
  loading: boolean;
  disabled: boolean;
  icon?: string;
}

export const ButtonInput = ({ text, loading, icon = "", ...ButtonProps }: ButtonInputProps): ButtonElement => {

  const LoadingIndicator = (props: any) => (
    <View>
      <Spinner size="small" status="danger" />
    </View>
  );

  const renderIcon = (props: IconProps): React.ReactElement => (
    <Icon {...props} name={icon} />
  )  

  if(loading) return (
    <Button
    {...ButtonProps}
    accessoryRight={LoadingIndicator}
    disabled={true}
    >{text}</Button>
  )
  if(icon && icon !== "") return (
    <Button
      {...ButtonProps}
      accessoryRight={renderIcon}
    >{text}</Button>
  )

  return (
    <Button
      {...ButtonProps}
    >{text}</Button>
  );
};

