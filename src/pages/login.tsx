import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '~/components/login-form';
import { useAuth } from '~/hooks/useAuth';

export default function LoginScreen() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // In a real app, you would get these values from the form inputs
    // For now, we'll use mock values
    setIsLoading(true);
    
    try {
      const success = await login('user', 'password');
      
      if (!success) {
        Alert.alert(t('loginError'), t('invalidCredentials'));
      }
    } catch (error) {
      Alert.alert(t('loginError'), t('networkError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-background">
      <LoginForm 
        onSubmit={handleLogin}
        isLoading={isLoading}
        className="max-w-sm mx-auto w-full"
      />
    </View>
  );
}