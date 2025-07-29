import React from 'react';
import './global.css';
import RootLayout from './src/components/layout';
import { SWRConfig } from 'swr';
import { AuthProvider } from './src/hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <SWRConfig value={{ provider: () => new Map() }}>
        <GestureHandlerRootView className='bg-background'>
          <RootLayout />
        </GestureHandlerRootView>
      </SWRConfig>
    </AuthProvider>
  );
}
