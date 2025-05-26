import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text className='text-red-500 text-2xl'>Home Screen</Text>
    </View>
  );
}
