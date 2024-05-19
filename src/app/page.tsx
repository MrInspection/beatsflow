import {LofiTracksPlaylist} from "@/components/playlists/lofi-tracks-playlist";
import {EffectsPlaylist} from "@/components/playlists/effects-playlist";
import {MusicPlaylists} from "@/components/playlists/music-playlists";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
    return (
        <>
            <div className={"container my-10 space-y-6 mb-20"}>
                <Tabs defaultValue="lofi">
                    <TabsList className={"mb-4"}>
                        <TabsTrigger value="lofi">Focus</TabsTrigger>
                        <TabsTrigger value="enjoy">Enjoy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lofi">
                        <LofiTracksPlaylist />
                    </TabsContent>
                    <TabsContent value="enjoy">
                        <MusicPlaylists />
                    </TabsContent>
                </Tabs>
                <EffectsPlaylist />
            </div>
        </>
    );
}
