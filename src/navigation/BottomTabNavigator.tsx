import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AccueilScreen from '../screens/accueil/AccueilScreen';
import ParolesScreen from '../screens/paroles/ParolesScreen';
import PlaybackScreen from '../screens/playback/PlaybackScreen';
import SolfaScreen from '../screens/solfa/SolfaScreen';
import Mp3Screen from '../screens/mp3/Mp3Screen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 8 },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof MaterialIcons>['name'] = 'home';

          if (route.name === 'Accueil') iconName = 'home';
          if (route.name === 'Paroles') iconName = 'library-music';
          if (route.name === 'Playback') iconName = 'play-arrow';
          if (route.name === 'Solfa') iconName = 'description';
          if (route.name === 'MP3') iconName = 'music-note';
          if (route.name === 'Paramètres') iconName = 'settings';

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
