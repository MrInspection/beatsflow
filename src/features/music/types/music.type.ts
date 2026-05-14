export type MusicCategory = "focus" | "chill" | "nature" | "noise";

export type MusicStation = {
  id: string;
  title: string;
  category: MusicCategory;
  youtubeId: string;
  thumbnailUrl: string;
};

export type AmbienceTrack = {
  id: string;
  title: string;
  audioPath: string;
};

export type SceneBackground = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnailUrl: string;
};
