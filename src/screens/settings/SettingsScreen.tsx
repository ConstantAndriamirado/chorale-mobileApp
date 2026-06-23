import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import { useSettingsStore } from '../../services/storage/storage';
import { Colors } from '../../constants/theme';

const fontOptions = ['small', 'medium', 'large'] as const;

export default function SettingsScreen() {
  const theme = useSettingsStore((state: { theme: string }) => state.theme);
  const fontSize = useSettingsStore((state: { fontSize: string }) => state.fontSize);
  const setTheme = useSettingsStore((state: { setTheme: (theme: 'light' | 'dark') => void }) => state.setTheme);
  const setFontSize = useSettingsStore((state: { setFontSize: (fontSize: 'small' | 'medium' | 'large') => void }) => state.setFontSize);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Paramètres</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thème</Text>
          <View style={styles.optionRow}>
            <Pressable
              style={[styles.optionButton, theme === 'light' && styles.optionActive]}
              onPress={() => setTheme('light')}
            >
              <Text style={[styles.optionText, theme === 'light' && styles.optionTextActive]}>Clair</Text>
            </Pressable>
            <Pressable
              style={[styles.optionButton, theme === 'dark' && styles.optionActive]}
              onPress={() => setTheme('dark')}
            >
              <Text style={[styles.optionText, theme === 'dark' && styles.optionTextActive]}>Sombre</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Taille de police</Text>
          <View style={styles.optionRow}>
            {fontOptions.map((option) => (
              <Pressable
                key={option}
                style={[styles.optionButton, option !== 'large' && styles.optionButtonSpacing, fontSize === option && styles.optionActive]}
                onPress={() => setFontSize(option)}
              >
                <Text style={[styles.optionText, fontSize === option && styles.optionTextActive]}>
                  {option === 'small' ? 'Petit' : option === 'medium' ? 'Moyen' : 'Grand'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text style={styles.note}>Les paramètres sont sauvegardés localement et s’appliquent à votre session.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    color: Colors.dark,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.dark,
    marginBottom: 14,
    fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  optionButtonSpacing: {
    marginRight: 12,
  },
  optionActive: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  optionText: {
    color: Colors.dark,
    fontWeight: '700',
  },
  optionTextActive: {
    color: Colors.white,
  },
  note: {
    marginTop: 20,
    color: '#64748B',
    lineHeight: 22,
  },
});
