import { Slash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SessionHeader() {
  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <div className="inline-flex items-center gap-2">
          <Link href="/" className="font-medium">
            BeatsFlōw.
          </Link>
          <Slash className="size-4 -rotate-30 text-muted-foreground/50" />
          <div className="font-medium text-muted-foreground text-sm">
            Jolly Pink Rock
          </div>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </header>
  );
}
