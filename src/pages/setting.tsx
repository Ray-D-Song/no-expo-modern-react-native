import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import ToggleTheme from '~/components/toggle-theme';

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Settings Screen</Text>
      <ToggleTheme />
    </View>
  );
}
