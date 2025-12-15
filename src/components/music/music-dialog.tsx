"use client";

import { Disc3, Play, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MusicPlayer } from "@/components/music/music-player";
import { TrackList } from "@/components/music/track-list";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { searchMusic } from "@/lib/music-services";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/use-music";
import { usePanelStore } from "@/stores/use-side-panel";
import { MiniPlayer } from "./mini-player";
import { YouTubePlayer } from "./youtube-player";

export function AudioElement() {
  const { currentTrack, isPlaying, isLooping, nextTrack } = useMusicStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && currentTrack && currentTrack.source !== "youtube") {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack || currentTrack.source === "youtube") return null;

  return (
    <audio
      ref={audioRef}
      src={currentTrack.url}
      onEnded={() =>
        isLooping
          ? ((audioRef.current!.currentTime = 0), audioRef.current!.play())
          : nextTrack()
      }
      loop={isLooping}
    />
  );
}

function SearchResults() {
  const { searchResults, setCurrentTrack, isLoading } = useMusicStore();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <Skeleton className="size-11" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[160px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No results found
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {searchResults.map((track) => (
        <div
          key={track.id}
          className="group flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted/50"
          onClick={() => setCurrentTrack(track)}
        >
          <div className="relative size-11 flex-shrink-0">
            <Image
              src={track.cover}
              alt={track.title}
              className="rounded object-cover"
              width={44}
              height={44}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="size-6 text-white" />
            </div>
          </div>
          <div className="min-w-0 max-w-[calc(100%-5rem)] flex-1">
            <h3 className="truncate font-medium text-sm leading-5">
              {track.title}
            </h3>
            <p className="truncate text-muted-foreground text-xs leading-4">
              {track.artist}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MusicDialog() {
  const { openPanel, setOpenPanel } = usePanelStore();
  const { setSearchQuery, searchQuery, setSearchResults, setIsLoading } =
    useMusicStore();
  const [activeTab, setActiveTab] = useState<"playlist" | "search">("playlist");
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length > 2) {
      setActiveTab("search");
      setIsLoading(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const results = await searchMusic(query);
          setSearchResults(results);
        } catch (error) {
          console.error("Search failed:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <AudioElement />
      <YouTubePlayer />
      <ResponsiveDialog
        open={openPanel === "music"}
        onOpenChange={(open) => setOpenPanel(open ? "music" : null)}
      >
        <ResponsiveDialogTrigger asChild className="sm:hidden">
          <button className={cn(buttonVariants({ variant: "ghost" }))}>
            <Disc3 className="size-4" />
            <p className="sr-only">Music</p>
          </button>
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent className="gap-0 p-0 max-sm:rounded-t-3xl sm:rounded-3xl">
          <ResponsiveDialogHeader className="p-6 pb-0 text-left">
            <ResponsiveDialogTitle className="mb-2 text-lg tracking-tight">
              BeatsFlōw Music
            </ResponsiveDialogTitle>
            <div className="relative">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search on YouTube..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setActiveTab("playlist")}
                className={cn(
                  "relative cursor-pointer px-4 py-2 font-medium text-sm transition-colors",
                  activeTab === "playlist"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                Playlist
                {activeTab === "playlist" && (
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("search")}
                className={cn(
                  "relative cursor-pointer px-4 py-2 font-medium text-sm transition-colors",
                  activeTab === "search"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                YouTube Search
                {activeTab === "search" && (
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>
          </ResponsiveDialogHeader>
          <div className="border-t p-2 py-0">
            <MusicPlayer />
          </div>
          <div className="max-h-[400px] overflow-y-auto border-t p-6">
            {activeTab === "playlist" ? <TrackList /> : <SearchResults />}
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}

export { MiniPlayer };
