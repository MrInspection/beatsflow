import type { SessionBannerModel } from "@/features/runner/components/session-stage/banners/session-banner.types";
import { SessionStageBottomBar } from "@/features/runner/components/session-stage/layout/session-stage-bottom-bar";
import { SessionStageContent } from "@/features/runner/components/session-stage/layout/session-stage-content";
import { SessionStageTopBar } from "@/features/runner/components/session-stage/layout/session-stage-top-bar";
import { cn } from "@/lib/utils";
import { AnnouncementBanner } from "../../announcement-banner";

type SessionStageShellProps = {
  banner: SessionBannerModel;
};

export function SessionStageShell({ banner }: SessionStageShellProps) {
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
        <SessionStageTopBar />
        <SessionStageContent />
        <SessionStageBottomBar />
      </div>
    </div>
  );
}
