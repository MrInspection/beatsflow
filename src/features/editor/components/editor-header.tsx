import { ThemeToggle } from "@/components/theme-toggle";

export function EditorHeader() {
  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <div className="font-medium">BeatsFlōw Editor.</div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
