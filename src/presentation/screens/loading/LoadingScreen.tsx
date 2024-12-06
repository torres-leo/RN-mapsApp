import {ScrollView, View} from 'react-native';
import React from 'react';
import {Text, useTheme} from 'react-native-paper';

export default function LoadingScreen() {
  const theme = useTheme();

  return (
    <View style={{flex: 1}}>
      <Text>LoadingScreen</Text>
    </View>
  );
}
