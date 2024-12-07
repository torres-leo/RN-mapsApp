import {View, ViewStyle, StyleProp, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import CustomIcon, {IconName} from './CustomIcon';

interface Props {
  iconName: IconName;
  onPress: () => void;

  style?: StyleProp<ViewStyle>;
}

export default function FAB({style, onPress, iconName}: Props) {
  return (
    <View style={[styles.btn, style]}>
      <Pressable onPress={onPress}>
        <CustomIcon name={iconName} size={30} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    zIndex: 1,
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5,
    },
    elevation: 5,
  },
});
