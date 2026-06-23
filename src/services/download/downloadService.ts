import * as FileSystem from "expo-file-system";
import { DownloadState, Song } from "../../types";

const downloadDirectory = `${FileSystem.Paths.document.uri}AFIChoraleDownloads/`;

export const ensureDownloadDirectoryExists = async () => {
  const info = await FileSystem.getInfoAsync(downloadDirectory);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(downloadDirectory, {
      intermediates: true,
    });
  }
};

export const simulateDownload = async (
  song: Song,
  type: "solfa" | "mp3" | "playback",
) => {
  await ensureDownloadDirectoryExists();
  const fileName =
    type === "solfa"
      ? song.solfaFileName
      : type === "mp3"
        ? song.mp3FileName
        : song.playbackFileName;

  const localUri = `${downloadDirectory}${fileName}`;

  const fileExists = await FileSystem.getInfoAsync(localUri);
  if (fileExists.exists) {
    return { state: "downloaded" as DownloadState, localUri };
  }

  await FileSystem.writeAsStringAsync(
    localUri,
    `Simulated ${type} file for ${song.title}`,
  );
  return { state: "downloaded" as DownloadState, localUri };
};

export const isDownloaded = async (fileName: string) => {
  if (!fileName) {
    return false;
  }
  const localUri = `${downloadDirectory}${fileName}`;
  const fileInfo = await FileSystem.getInfoAsync(localUri);
  return fileInfo.exists;
};

export const verifyInternetConnection = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch("https://clients3.google.com/generate_204", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response.ok;
  } catch {
    return false;
  }
};
