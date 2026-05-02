import { Save, Share, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EditorHeader() {
  const PRESETS = [
    {
      value: null,
      label: "Select a preset",
    },
    {
      value: "pomodoro",
      label: "Pomodoro",
    },
    {
      value: "sprint",
      label: "Sprint",
    },
  ];

  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <div className="inline-flex items-center gap-2">
          <div className="font-medium">BeatsFlōw.</div>{" "}
          <Slash className="size-6 -rotate-30 text-muted-foreground/50" />
          <Input className="h-8 min-w-52" placeholder="Untitled Workflow" />
        </div>
        <div className="flex items-center gap-2">
          <Select items={PRESETS}>
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Preset</SelectLabel>
                {PRESETS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="secondary">
            <Share className="size-4" /> Share
          </Button>
          <Button>
            <Save className="size-4" /> Save as Preset
          </Button>
        </div>
      </div>
    </header>
  );
}
