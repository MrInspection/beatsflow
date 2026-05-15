import { RunnerBackground } from "@/features/music/components/runner-background/runner-background";
import type { SessionBannerModel } from "@/features/runner/components/session-stage/banners/session-banner.types";
import { SessionStageBottomBar } from "@/features/runner/components/session-stage/layout/session-stage-bottom-bar";
import { SessionStageContent } from "@/features/runner/components/session-stage/layout/session-stage-content";
import { cn } from "@/lib/utils";
import { AnnouncementBanner } from "../../announcement-banner";

type SessionStageShellProps = {
  banner: SessionBannerModel;
};

export function SessionStageShell({ banner }: SessionStageShellProps) {
  return (
    <div className="relative flex size-full flex-col overflow-clip rounded-4xl border bg-background shadow-sm">
      <RunnerBackground />
      <div className="relative z-10 flex flex-col backdrop-blur">
        <AnnouncementBanner
          label={banner.label}
          icon={banner.icon}
          variant={banner.variant}
          isVanished={banner.isVanished}
        />
      </div>
      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col p-4",
          !banner.isVanished && "border-t",
        )}
      >
        <SessionStageContent />
        <SessionStageBottomBar />
      </div>
    </div>
  );
}
