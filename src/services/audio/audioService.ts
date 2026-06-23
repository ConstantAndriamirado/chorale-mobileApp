import { Audio, AVPlaybackStatus } from 'expo-av';

export const playSound = async (uri: string) => {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
    return sound;
  } catch (error) {
    console.warn('Audio play error', error);
    return null;
  }
};

export const stopSound = async (sound: Audio.Sound | null) => {
  if (!sound) return;
  await sound.stopAsync();
  await sound.unloadAsync();
};

export const getPlaybackStatus = async (sound: Audio.Sound) => {
  const status = await sound.getStatusAsync();
  return status as AVPlaybackStatus;
};
