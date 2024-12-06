import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {globalStyles} from '@/config/theme/styles';

interface Props {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export default function LoadingScreen({
  color = 'grey',
  size = 50,
  style,
}: Props) {
  const theme = useTheme();

  return (
    <ActivityIndicator
      size={size}
      style={[
        globalStyles.loader,
        {backgroundColor: theme.colors.background},
        style,
      ]}
      color={color}
    />
  );
}
