"use client"

import {Separator} from "@/components/ui/separator";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import lofiTracksData from "@/data/lofi-tracks-data";
import TrackPlayer from "@/components/track-player";
import {useState} from "react";

export function LofiTracksPlaylist() {

    const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
    const handlePlay = (index: number) => {setCurrentlyPlaying(currentlyPlaying === index ? null : index)}

    return (
        <>
            <section>
                <div className={"space-y-1"}>
                    <h1 className={"text-2xl font-semibold tracking-tight"}>Lofi Music</h1>
                    <p className={"text-muted-foreground text-sm"}>
                        Listen to a Lofi beat music and start working
                    </p>
                </div>
                <Separator className="my-4"/>
                <ScrollArea className={"w-full h-fit"}>
                    <div className={"flex space-x-5 pb-4"}>
                        {lofiTracksData.map((track, index) => (
                            <TrackPlayer
                                key={index}
                                image_cover={track.thumbnail}
                                audio_path={track.sound}
                                title={track.title}
                                subtitle={track.description}
                                isPlaying={currentlyPlaying === index}
                                onPlay={() => handlePlay(index)}
                            />
                        ))}
                    </div>
                    <ScrollBar orientation={"horizontal"}/>
                </ScrollArea>
            </section>
        </>
    )
}