import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import ToggleTheme from '~/components/toggle-theme';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <ToggleTheme />
    </View>
  );
}
