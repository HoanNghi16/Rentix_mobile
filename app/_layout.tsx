import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/providers/auth/authProvider';
import { ColorProvider } from '@/providers/colors/colorProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <SafeAreaProvider >
      <AuthProvider>
        <ColorProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="login" options={{  title: 'Login' }} />
          </Stack>
          <StatusBar style="auto" />
        </ColorProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
