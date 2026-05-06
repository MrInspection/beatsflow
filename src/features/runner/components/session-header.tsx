import { Play, Slash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SessionHeader() {
  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <div className="inline-flex items-center gap-2">
          <div className="font-medium">BeatsFlōw.</div>
          <Slash className="size-4 -rotate-30 text-muted-foreground/50" />
          <div className="font-medium text-muted-foreground text-sm">
            Jolly Pink Rock
          </div>
          <Badge variant="secondary" className="ml-2">
            2 of 3 blocks
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Play className="fill-current" /> Resume Workflow
          </Button>
        </div>
      </div>
    </header>
  );
}
