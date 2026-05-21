import { Monitor } from "lucide-react";

export function MobileUnsupported() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-2xl border bg-card p-4 shadow-sm">
          <Monitor className="size-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-xl tracking-tight">BeatsFlōw.</h1>
          <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
            This experience requires a larger screen. Please open BeatsFlōw on a
            tablet or desktop.
          </p>
        </div>
      </div>
    </div>
  );
}
