import React from "react";
import "react-native-gesture-handler";
import PhoneFrame from "./src/components/ui/PhoneFrame";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <PhoneFrame>
      <RootNavigator />
    </PhoneFrame>
  );
}
