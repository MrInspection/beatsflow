"use client";

import {
  AlertTriangle,
  CheckCircle,
  Info,
  Settings2,
  SquareCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getRunnableNodes,
  useSessionStore,
} from "@/features/runner/store/session.store";
import { cn } from "@/lib/utils";
import { AnnouncementBanner } from "./dialogs/announcement-banner";
import { MusicPlayerWidget } from "./widgets/music-player.widget";
import { SessionTimerRing } from "./widgets/session-timer-ring";

const WORKFLOW_QUOTE = "Life begins at the end of your comfort zone";

type BannerState = {
  label: string;
  icon: typeof AlertTriangle;
  variant: "default" | "success" | "warning" | "error";
  isVanished: boolean;
};

function useSessionBanner(): BannerState {
  const status = useSessionStore((state) => state.status);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const nodes = useSessionStore((state) => state.nodes);

  const currentNode = getRunnableNodes(nodes)[currentBlockIndex];

  if (status === "paused") {
    return {
      label: "Take a breath. Hit resume whenever you're ready.",
      icon: AlertTriangle,
      variant: "warning",
      isVanished: false,
    };
  }

  if (status === "completed") {
    return {
      label: "You did it. That's a wrap on this session.",
      icon: CheckCircle,
      variant: "success",
      isVanished: false,
    };
  }

  if (currentNode?.type === "task" && status === "running") {
    const { advanceCondition, label } = currentNode.data;
    if (advanceCondition === "all-tasks") {
      return {
        label: `Finish every task in "${label}" to move forward.`,
        icon: Info,
        variant: "default",
        isVanished: false,
      };
    }
    if (advanceCondition === "any-task") {
      return {
        label: `Knock out one task in "${label}" and you're free to move on.`,
        icon: Info,
        variant: "default",
        isVanished: false,
      };
    }
  }

  return {
    label: "Processing your intention...",
    icon: Info,
    variant: "default",
    isVanished: true,
  };
}

export function SessionStage() {
  const banner = useSessionBanner();

  return (
    <div className="flex size-full flex-col overflow-clip rounded-4xl border bg-background shadow-sm">
      <AnnouncementBanner
        label={banner.label}
        icon={banner.icon}
        variant={banner.variant}
        isVanished={banner.isVanished}
      />
      <div
        className={cn(
          "flex flex-1 flex-col p-4",
          !banner.isVanished && "border-t",
        )}
      >
        <section className="flex items-center justify-between">
          <MusicPlayerWidget />
        </section>
        <div className="flex flex-1 flex-col items-center justify-center">
          <SessionTimerRing />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost">
            <Settings2 className="size-5" />
          </Button>
          <p className="text-muted-foreground">"{WORKFLOW_QUOTE}"</p>
          <Button variant="ghost">
            <SquareCheck className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
