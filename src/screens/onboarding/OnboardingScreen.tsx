import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OnboardingItem } from '../../types';
import onboardingData from '../../data/onboarding.json';
import { Colors } from '../../constants/theme';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = onboardingData as OnboardingItem[];

  useEffect(() => {
    if (activeIndex >= slides.length) {
      navigation.navigate('Main' as never);
    }
  }, [activeIndex, navigation, slides.length]);

  const handleContinue = () => {
    if (activeIndex === slides.length - 1) {
      navigation.navigate('Main' as never);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const slide = slides[activeIndex];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>{slide.icon}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((item, index) => (
            <View key={item.id} style={[styles.dot, index === activeIndex && styles.activeDot]} />
          ))}
        </View>
        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>{activeIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 24,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    marginTop: 80,
  },
  icon: {
    fontSize: 72,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: Colors.blue,
  },
  button: {
    backgroundColor: Colors.blue,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
