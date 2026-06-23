import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import SongDetailScreen from '../screens/paroles/SongDetailScreen';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { Song } from '../types';
import { useSettingsStore } from '../services/storage/storage';

export type AppStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
  SongDetail: { song: Song };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  const theme = useSettingsStore((state) => state.theme);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="SongDetail" component={SongDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
