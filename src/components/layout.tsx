import { NavigationContainer, Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import HomeScreen from '~/pages/home';
import SettingsScreen from '~/pages/setting';
import { useTranslation } from 'react-i18next';
import { Home, Settings } from 'lucide-react-native';

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

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar barStyle={isDarkColorScheme ? 'light-content' : 'dark-content'} />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('home'),
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
