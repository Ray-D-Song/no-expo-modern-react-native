import { NavigationContainer, Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useColorScheme } from '../lib/useColorScheme';
import { NAV_THEME } from '../lib/constants';
import HomeScreen from '../pages/home';
import SettingsScreen from '../pages/setting';

// 为 Web 平台声明全局变量类型
declare global {
  interface Window {}
  interface Document {
    documentElement: HTMLElement;
  }
}

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

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      // 添加背景色到 html 元素以防止过度滚动时出现白色背景
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
            title: '首页',
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            title: '设置',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;