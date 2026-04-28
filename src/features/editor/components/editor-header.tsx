import { Button } from "@/components/ui/button";
import {ThemeToggle} from "@/components/theme-toggle";

export function EditorHeader() {
  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <div className="font-medium">BeatsFlōw.</div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button>
            Share
          </Button>
        </div>
      </div>
    </header>
  );
}
