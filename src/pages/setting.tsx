import React from 'react';
import { Text, View } from 'react-native';
import ToggleTheme from '~/components/toggle-theme';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text className='text-red-500 text-2xl'>Settings Screen</Text>
      <ToggleTheme />
    </View>
  );
}
