export type SoundType =
  | "workflow-start"
  | "workflow-end"
  | "session-start"
  | "session-end"
  | "task-complete"
  | "workflow-cancelled"
  | "timer-paused"
  | "timer-resume"
  | "session-restart"
  | "champion";

const soundMap: Record<SoundType, string> = {
  "workflow-start": "/sfx/workflow-start.ogg",
  "workflow-end": "/sfx/workflow-end.ogg",
  "session-start": "/sfx/session-start.ogg",
  "session-end": "/sfx/session-end.ogg",
  "task-complete": "/sfx/task-complete.ogg",
  "workflow-cancelled": "/sfx/workflow-cancelled.ogg",
  "timer-paused": "/sfx/timer-paused.ogg",
  "timer-resume": "/sfx/timer-resume.ogg",
  "session-restart": "/sfx/session-restart.ogg",
  champion: "/sfx/champion.ogg",
};

const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * Play a sound effect
 * @param soundType The type of sound to play
 * @param volume Volume level (0-1)
 */
export function playSound(soundType: SoundType, volume = 0.7) {
  try {
    let audio = audioCache[soundType];

    if (!audio) {
      const soundUrl = soundMap[soundType];
      audio = new Audio(soundUrl);
      audioCache[soundType] = audio;
    }

    audio.currentTime = 0;
    audio.volume = volume;

    audio.play().catch((error) => {
      console.warn(`Failed to play sound: ${error.message}`);
    });
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}

/**
 * Preload all sounds to avoid delay when playing
 */
export function preloadSounds() {
  Object.keys(soundMap).forEach((key) => {
    const soundType = key as SoundType;
    const soundUrl = soundMap[soundType];

    if (!audioCache[soundType]) {
      const audio = new Audio();
      audio.src = soundUrl;
      audio.preload = "auto";
      audioCache[soundType] = audio;
    }
  });
}
