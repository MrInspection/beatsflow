import {Separator} from "@/components/ui/separator";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import effectsData from "@/data/effects-data";
import EffectsPlayer from "@/components/effect-player";

export function EffectsPlaylist() {
    return (
        <>
            <section>
                <div className={"space-y-1"}>
                    <h1 className={"text-2xl font-semibold tracking-tight"}>BeatsFlōw Effects</h1>
                    <p className={"text-muted-foreground text-sm"}>
                        Combine sound effects to create your perfect beat
                    </p>
                </div>
                <Separator className="my-4"/>
                <ScrollArea className={"w-full h-fit"}>
                    <div className={"flex gap-7 pb-11 mx-2.5"}>
                        {effectsData.map((effect, index) => (
                            <EffectsPlayer
                                thumbnail={effect.thumbnail} audio_effect={effect.sound}
                                title={effect.title} key={index}
                            />
                        ))}
                    </div>
                    <ScrollBar orientation={"horizontal"}/>
                </ScrollArea>
            </section>
        </>
    )
}