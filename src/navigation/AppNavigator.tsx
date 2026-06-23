import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import SplashScreen from "../screens/onboarding/SplashScreen";
import SongDetailScreen from "../screens/paroles/SongDetailScreen";
import { useSettingsStore } from "../services/storage/storage";
import { Song } from "../types";
import { BottomTabNavigator, BottomTabParamList } from "./BottomTabNavigator";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    card: "#ffffff",
    border: "#E5E7EB",
    text: "#111827",
    primary: "#0077CC",
    notification: "#0284C7",
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0F172A",
    card: "#1E293B",
    border: "#334155",
    text: "#ECEDEE",
    primary: "#38BDF8",
    notification: "#67E8F9",
  },
};

export type AppStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<BottomTabParamList>;
  SongDetail: { song: Song };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  const theme = useSettingsStore((state) => state.theme);

  return (
    <NavigationContainer theme={theme === "dark" ? darkTheme : lightTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="SongDetail" component={SongDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
