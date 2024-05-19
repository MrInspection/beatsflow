"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";

interface AudioPlayerProps {
    image_cover: string;
    audio_path: string;
    title: string;
    subtitle: string;
    isPlaying: boolean;
    onPlay: () => void;
}

const TrackPlayer: React.FC<AudioPlayerProps> = ({ image_cover, audio_path, title, subtitle, isPlaying, onPlay }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.loop = true;
            if (isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [isPlaying]);

    const togglePlayPause = () => {
        onPlay();
    };

    return (
        <div className="">
            <div className="flex">
                <div className="w-64 h-80 relative group">
                    <Image
                        src={image_cover}
                        alt="Thumbnails"
                        height={200}
                        width={150}
                        className="h-full w-full object-cover transition-all rounded-xl"
                        unoptimized={true}
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <button onClick={togglePlayPause} className="rounded-2xl px-6 py-3 bg-primary/70 hidden group-hover:block">
                            {isPlaying ? <Pause className="h-10 w-10 text-secondary" /> : <Play className="h-10 w-10 text-secondary" />}
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-3 text-sm space-y-1">
                <h3 className={cn("font-medium leading-none", { 'text-green-500': isPlaying })}>
                    {title}
                </h3>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <audio ref={audioRef} src={audio_path} loop />
        </div>
    );
};

export default TrackPlayer;
