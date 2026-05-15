import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface NodeShellProps extends ComponentProps<"div"> {
  selected?: boolean;
}

export function NodeShell({ selected, className, ...props }: NodeShellProps) {
  return (
    <div
      className={cn(
        "h-fit w-84 overflow-hidden rounded-xl border bg-background transition-shadow",
        selected && "border-ring shadow-md ring-3 ring-ring/30",
        className,
      )}
      {...props}
    />
  );
}
