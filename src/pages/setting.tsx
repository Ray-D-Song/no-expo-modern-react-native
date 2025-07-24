import React from 'react';
import { View, Alert } from 'react-native';
import { Button } from '~/components/ui/button';
import { useAuth } from '~/hooks/useAuth';
import ToggleTheme from '~/components/toggle-theme';
import { Text } from '~/components/ui/text';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

function Item({ children, label, value }: { children?: React.ReactNode, label: string, value?: string | number }) {
  return (
    <View className="flex flex-row items-center justify-between py-4 border-b border-border">
      <Text className="text-base text-foreground">{label}</Text>
      {value ? <Text className="text-foreground">{value}</Text> : children}
    </View>
  );
}

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('java');

  const handleLogout = () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };

  return (
    <View className="flex-1 p-6">

      <View className="space-y-4">
        <Item label="账户信息" value={user?.username || ''} />
        <Item label="主题切换">
          <ToggleTheme />
        </Item>
        <Item label="语言">
          <Text>good</Text>
        </Item>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
      </View>

      <View className="mt-auto mb-8">
        <Button
          onPress={handleLogout}
          className="w-full"
        >
          <Text>退出登录</Text>
        </Button>
      </View>
    </View>
  );
}
