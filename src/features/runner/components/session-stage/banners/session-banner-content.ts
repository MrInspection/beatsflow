import {
  CheckCheck,
  Handshake,
  HeartPulse,
  Info,
  ListChecks,
} from "lucide-react";

export const SESSION_BANNER_CONTENT = {
  paused: {
    label: "Take a breath. Hit resume whenever you're ready.",
    icon: HeartPulse,
    variant: "warning",
  },

  completed: {
    label: "You did it. That's a wrap on this session.",
    icon: Handshake,
    variant: "success",
  },

  allTasks: {
    icon: ListChecks,
    variant: "default",
  },

  anyTask: {
    icon: CheckCheck,
    variant: "default",
  },

  hidden: {
    label: "Processing...",
    icon: Info,
    variant: "default",
  },
} as const;
