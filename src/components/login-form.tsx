import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Github } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
interface LoginFormProps {
  className?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  className,
  onSubmit,
  isLoading = false,
  ...props
}: LoginFormProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View className={cn("flex flex-col gap-6", className)} {...props}>
      <View className="flex flex-col items-center gap-2">
        <Text className="text-2xl font-bold text-center">{t('loginToAccount')}</Text>
        <Text className="text-muted-foreground text-sm text-center">
          {t('enterAccountBelow')}
        </Text>
      </View>
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-3">
          <Label htmlFor="account">{t('account')}</Label>
          <Input id="account" placeholder={t('accountPlaceholder')} />
        </View>
        <View className="flex flex-col gap-3">
          <View className="flex flex-row items-center justify-between">
            <Label htmlFor="password">{t('password')}</Label>
          </View>
          <View className="relative">
            <Input 
              placeholder={t('passwordPlaceholder')} 
              secureTextEntry={!showPassword}
            />
            <Pressable 
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-muted-foreground" />
              ) : (
                <Eye size={20} className="text-muted-foreground" />
              )}
            </Pressable>
          </View>
        </View>
        <Button onPress={onSubmit} className="w-full" disabled={isLoading}>
          <Text>{isLoading ? t('loggingIn') : t('login')}</Text>
        </Button>
      </View>
    </View>
  )
}