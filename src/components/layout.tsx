import { NavigationContainer, Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Platform, StatusBar, ActivityIndicator, View } from 'react-native';
import { useColorScheme } from '~/hooks/useColorScheme';
import { useAuth } from '~/hooks/useAuth';
import { NAV_THEME } from '~/lib/constants';
import HomeScreen from '~/pages/home';
import SettingsScreen from '~/pages/setting';
import LoginScreen from '~/pages/login';
import { useTranslation } from 'react-i18next';
import { Home, Settings } from 'lucide-react-native';
import { Text } from '~/components/ui/text';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { isDarkColorScheme } = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { t } = useTranslation();

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      document.documentElement?.classList?.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded || isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-muted-foreground">Loading...</Text>
      </View>
    );
  }

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <NavigationContainer theme={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar barStyle={isDarkColorScheme ? 'light-content' : 'dark-content'} />
        <LoginScreen />
      </NavigationContainer>
    );
  }

  // If authenticated, show main app navigation
  return (
    <NavigationContainer theme={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar barStyle={isDarkColorScheme ? 'light-content' : 'dark-content'} />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('home'),
            header: () => <View className='h-12' />,
            tabBarIcon: ({ color, focused }) => (
              <Home color={color} size={focused ? 28 : 24} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t('settings'),
            header: () => <View className='h-12' />,
            tabBarIcon: ({ color, focused }) => (
              <Settings color={color} size={focused ? 28 : 24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
