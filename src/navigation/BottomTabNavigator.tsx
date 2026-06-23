import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AccueilScreen from "../screens/accueil/AccueilScreen";
import Mp3Screen from "../screens/mp3/Mp3Screen";
import ParolesScreen from "../screens/paroles/ParolesScreen";
import PlaybackScreen from "../screens/playback/PlaybackScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import SolfaScreen from "../screens/solfa/SolfaScreen";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 12,
          height: 64,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          paddingBottom: 10,
          paddingTop: 8,
          // shadow
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof MaterialIcons>["name"] =
            "home";

          if (route.name === "Accueil") iconName = "home";
          if (route.name === "Paroles") iconName = "library-music";
          if (route.name === "Playback") iconName = "play-arrow";
          if (route.name === "Solfa") iconName = "description";
          if (route.name === "MP3") iconName = "music-note";
          if (route.name === "Paramètres") iconName = "settings";

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="Paroles" component={ParolesScreen} />
      <Tab.Screen name="Playback" component={PlaybackScreen} />
      <Tab.Screen name="Solfa" component={SolfaScreen} />
      <Tab.Screen name="MP3" component={Mp3Screen} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
