export type DownloadState = 'notDownloaded' | 'downloading' | 'downloaded';

export type Song = {
  id: string;
  title: string;
  lyrics: string;
  hasSolfa: boolean;
  hasMp3: boolean;
  hasPlayback: boolean;
  solfaFileName: string;
  mp3FileName: string;
  playbackFileName: string;
};

export type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type DownloadItem = {
  songId: string;
  type: 'solfa' | 'mp3' | 'playback';
  state: DownloadState;
  localUri?: string;
};
