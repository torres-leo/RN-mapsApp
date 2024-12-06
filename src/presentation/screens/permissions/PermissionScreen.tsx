import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import {globalStyles} from '@/config/theme/styles';
import {usePermissionStore} from '@/presentation/store/permissions/usePermissionStore';

export default function PermissionScreen() {
  const theme = useTheme();
  const {locationStatus, requestLocationPermission} = usePermissionStore();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text variant="headlineSmall" style={{marginBottom: 10}}>
        Location Permission
      </Text>

      <View style={styles.buttonsWrapper}>
        <Pressable
          style={[
            globalStyles.btnPrimary,
            {
              borderColor: theme.dark ? 'white' : theme.colors.backdrop,
            },
          ]}
          onPress={requestLocationPermission}>
          <Text>Enable Permission</Text>
        </Pressable>

        {/* <Pressable
          style={[globalStyles.btnPrimary, {backgroundColor: '#f05555'}]}>
          <Text style={{color: 'white'}}>Deny Permission</Text>
        </Pressable> */}
      </View>

      <Text variant="labelMedium">Current permission: {locationStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  buttonsWrapper: {
    rowGap: 10,
    marginBottom: 10,
  },
});
