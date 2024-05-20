"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {Pause, Play} from "lucide-react";

interface EffectsPlayerProps {
    thumbnail: string;
    audio_effect: string;
    title: string;
}

const EffectsPlayer: React.FC<EffectsPlayerProps> = ({ thumbnail, audio_effect, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.33); // Default volume set to 33%
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.loop = true;
            audio.volume = volume;
        }
    }, [volume]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(err => console.log("Audio play error: ", err));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        const volumeValue = value[0] / 100; // Convert to a range of 0 to 1
        setVolume(volumeValue);
        if (audioRef.current) {
            audioRef.current.volume = volumeValue;
        }
    };

    return (
        <div className="flex my-3">
            <div
                className={cn("w-48 h-48 relative group", { "ring-4 rounded-xl ring-green-500 ": isPlaying })}
            >
                <Image
                    src={thumbnail}
                    alt="Thumbnails"
                    height={200}
                    width={150}
                    className="h-full w-full object-cover transition-all rounded-xl"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                    <button
                        onClick={togglePlayPause}
                        className="rounded-2xl px-4 py-2 bg-white text-black text-sm font-medium flex items-center gap-1.5"
                    >
                        {isPlaying ? <Pause className={"h-4 w-4"} /> : <Play className={"h-4 w-4"} /> } {title}
                    </button>
                </div>
                {isPlaying && (
                    <Slider
                        defaultValue={[100]}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="mt-5"
                    />
                )}
                <audio ref={audioRef} src={audio_effect} loop />
            </div>
        </div>
    );
};

export default EffectsPlayer;
