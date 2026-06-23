import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PhoneFrame from "./src/components/ui/PhoneFrame";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <PhoneFrame>
        <RootNavigator />
      </PhoneFrame>
    </SafeAreaProvider>
  );
}
