export type SoundType =
  | "workflowStart"
  | "workflowEnd"
  | "sessionStart"
  | "sessionEnd"
  | "workflowCancel";

// Map of sound URLs
const soundMap: Record<SoundType, string> = {
  workflowStart: "/sounds/workflow_start.ogg",
  workflowEnd: "/sounds/workflow_end.ogg",
  sessionStart: "/sounds/session_start.ogg",
  sessionEnd: "/sounds/session_end.ogg",
  workflowCancel: "/sounds/workflow_cancelled.ogg",
};

const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * Play a sound effect
 * @param soundType The type of sound to play
 * @param volume Volume level (0-1)
 */
export function playSound(soundType: SoundType, volume = 0.7): void {
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
export function preloadSounds(): void {
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
