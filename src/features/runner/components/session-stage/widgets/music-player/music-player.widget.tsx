import { Play, SkipBackIcon, SkipForward } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function MusicPlayerWidget() {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-neutral-100 p-2 dark:bg-muted">
      <Image
        src="https://github.com/MrInspection.png"
        alt="Album Cover"
        className="size-10 rounded-md border object-cover"
        width={100}
        height={100}
      />
      <div>
        <p className="font-medium text-xs">YOLO</p>
        <p className="text-muted-foreground text-xs">Gims</p>
      </div>
      <div className="ml-6 flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="size-8">
          <SkipBackIcon className="size-4 fill-current" />
        </Button>
        <Button size="icon" className="size-8">
          <Play className="size-4 fill-current" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <SkipForward className="size-4 fill-current" />
        </Button>
      </div>
    </div>
  );
}
