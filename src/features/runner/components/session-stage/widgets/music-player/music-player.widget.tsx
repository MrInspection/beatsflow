"use client";

import {
  Image as ImageIcon,
  type LucideIcon,
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MusicPopoverScenes } from "@/features/music/components/music-popover/music-popover-scenes";
import { MusicPopoverStations } from "@/features/music/components/music-popover/music-popover-stations";
import { useMusicStore } from "@/features/music/store/music.store";
import { useMusicPlayer } from "@/features/runner/components/session-stage/widgets/music-player/music-player.hook";

type DrawerTab = "stations" | "scenes";

const DRAWER_TABS: { tab: DrawerTab; label: string; icon: LucideIcon }[] = [
  { tab: "stations", label: "Music", icon: Music2 },
  { tab: "scenes", label: "Scenes", icon: ImageIcon },
];

function StationThumbnail({ src, title }: { src: string; title: string }) {
  return (
    <Image
      src={src}
      alt={title}
      className="size-10 shrink-0 rounded-lg object-cover"
      height={40}
      width={40}
    />
  );
}

function StationInfo({
  title,
  category,
}: {
  title: string | undefined;
  category: string | undefined;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <span className="truncate font-semibold text-sm">
        {title ?? "No station selected"}
      </span>
      <span className="truncate text-muted-foreground text-xs capitalize">
        {category ?? "—"}
      </span>
    </div>
  );
}

function PlaybackControls({
  isPlaying,
  isMuted,
  volume,
  onTogglePlayback,
  onToggleMute,
  onVolumeChange,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlayback: () => void;
  onToggleMute: () => void;
  onVolumeChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Button size="icon-sm" onClick={onTogglePlayback} className="ml-6">
        {isPlaying ? (
          <Pause className="size-4 fill-current" />
        ) : (
          <Play className="size-4 fill-current" />
        )}
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" onClick={onToggleMute}>
          {isMuted || volume === 0 ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
        </Button>
        <div className="w-36">
          <Slider
            min={0}
            max={100}
            step={1}
            value={[isMuted ? 0 : volume]}
            onValueChange={(value) => onVolumeChange(value as number)}
          />
        </div>
      </div>
    </div>
  );
}

function DrawerTabButton({
  tab,
  label,
  icon: Icon,
  onTabSelect,
}: {
  tab: DrawerTab;
  label: string;
  icon: LucideIcon;
  onTabSelect: (tab: DrawerTab) => void;
}) {
  return (
    <PopoverTrigger
      render={
        <Button
          variant="ghost"
          size="sm"
          className="group flex h-auto flex-col gap-0.5 rounded-lg py-1"
          onClick={() => onTabSelect(tab)}
        />
      }
    >
      <Icon className="size-4" />
      <span className="mt-0.5 text-[10px] text-muted-foreground">{label}</span>
    </PopoverTrigger>
  );
}

function PopoverLayout({
  activeTab,
  onTabChange,
  onDismiss,
}: {
  activeTab: DrawerTab;
  onTabChange: (tab: DrawerTab) => void;
  onDismiss: () => void;
}) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as DrawerTab)}
      className="flex flex-col overflow-hidden"
    >
      <div className="border-b px-6 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-medium text-base">BeatsFlōw Configurator</span>
          <Button variant="secondary" size="icon-sm" onClick={onDismiss}>
            <XIcon className="size-4" aria-label="Close" />
          </Button>
        </div>
        <TabsList variant="line" className="gap-2">
          <TabsTrigger value="stations">Stations</TabsTrigger>
          <TabsTrigger value="scenes">Scenes</TabsTrigger>
        </TabsList>
      </div>
      <div className="max-h-96 overflow-y-auto p-6">
        <TabsContent value="stations">
          <MusicPopoverStations />
        </TabsContent>
        <TabsContent value="scenes">
          <MusicPopoverScenes />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export function MusicPlayerWidget() {
  const { selectedStation, isPlaying, volume, togglePlayback, setVolume } =
    useMusicPlayer();
  const { drawerTab, setDrawerTab } = useMusicStore();
  const [openPopover, setOpenPopover] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(volume);

  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  function handleMuteToggle() {
    if (isMuted) {
      setVolume(volumeBeforeMute);
      setIsMuted(false);
    } else {
      setVolumeBeforeMute(volume);
      setVolume(0);
      setIsMuted(true);
    }
  }

  function handleVolumeChange(newVolume: number) {
    setVolume(newVolume);
    if (isMuted && newVolume > 0) setIsMuted(false);
  }

  function handleTabSelect(tab: DrawerTab) {
    setDrawerTab(tab);
    if (barRef.current) {
      setBarWidth(barRef.current.getBoundingClientRect().width);
    }
  }

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <div
        ref={barRef}
        className="z-40 flex h-16 items-center justify-between gap-8 rounded-3xl bg-background px-3 py-2 backdrop-blur dark:bg-muted/65"
      >
        <div className="flex min-w-0 items-center gap-3">
          {selectedStation ? (
            <StationThumbnail
              src={selectedStation.thumbnailUrl}
              title={selectedStation.title}
            />
          ) : (
            <div className="size-10 shrink-0 rounded-xl bg-muted" />
          )}
          <StationInfo
            title={selectedStation?.title}
            category={selectedStation?.category}
          />
          <PlaybackControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
            onTogglePlayback={togglePlayback}
            onToggleMute={handleMuteToggle}
            onVolumeChange={handleVolumeChange}
          />
        </div>

        <div className="flex items-center gap-1">
          {DRAWER_TABS.map(({ tab, label, icon }) => (
            <DrawerTabButton
              key={tab}
              tab={tab}
              label={label}
              icon={icon}
              onTabSelect={handleTabSelect}
            />
          ))}
        </div>
      </div>

      <PopoverContent
        side="top"
        align="center"
        anchor={barRef}
        sideOffset={16}
        style={{ width: barWidth > 0 ? `${barWidth}px` : undefined }}
        className="w-96 p-0"
      >
        <PopoverLayout
          activeTab={drawerTab}
          onTabChange={setDrawerTab}
          onDismiss={() => setOpenPopover(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
