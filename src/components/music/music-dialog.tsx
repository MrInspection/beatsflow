"use client";

import { MusicPlayer } from "@/components/music/music-player";
import { TrackList } from "@/components/music/track-list";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { searchMusic } from "@/lib/music-services";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/use-music";
import { usePanelStore } from "@/stores/use-side-panel";
import { Disc3, Play, Search, Youtube } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
      <div className="text-center py-8 text-muted-foreground">
        No results found
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {searchResults.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer group"
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
            <div className="absolute bottom-0 right-0 bg-red-600 text-white p-0.5 rounded">
              <Youtube className="size-3" />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="size-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0 max-w-[calc(100%-5rem)]">
            <h3 className="font-medium truncate text-sm leading-5">
              {track.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate leading-4">
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
      <Dialog
        open={openPanel === "music"}
        onOpenChange={(open) => setOpenPanel(open ? "music" : null)}
      >
        <DialogTrigger asChild className="sm:hidden">
          <button className={cn(buttonVariants({ variant: "ghost" }))}>
            <Disc3 className="size-4" />
            <p className="sr-only">Music</p>
          </button>
        </DialogTrigger>
        <DialogContent className="p-0 gap-0 rounded-3xl">
          <DialogHeader className="p-6 pb-0 text-left">
            <DialogTitle className="text-lg tracking-tight mb-2">
              BeatsFlōw Music
            </DialogTitle>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search on YouTube..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setActiveTab("playlist")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors relative",
                  activeTab === "playlist"
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                Playlist
                {activeTab === "playlist" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("search")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors relative",
                  activeTab === "search"
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                Search
                {activeTab === "search" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>
          </DialogHeader>
          <div className="p-2 py-0 border-t">
            <MusicPlayer />
          </div>
          <div className="p-6 border-t max-h-[400px] overflow-y-auto">
            {activeTab === "playlist" ? <TrackList /> : <SearchResults />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { MiniPlayer };
