"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Disc3, Workflow } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePanelStore } from "@/stores/use-side-panel";

export function SidePanel() {
  const { setOpenPanel } = usePanelStore();

  return (
    <section className="flex h-screen w-12 flex-col gap-4 overflow-hidden border-l p-2 max-sm:hidden">
      <Button
        className="h-auto flex-col px-2 max-xl:flex xl:hidden"
        variant="ghost"
        onClick={() => setOpenPanel("workflow")}
      >
        <Workflow className="size-4" />
        <p className="[writing-mode:vertical-lr]">Workflōw</p>
      </Button>
      <Button
        className="flex h-auto flex-col"
        variant="ghost"
        onClick={() => setOpenPanel("music")}
      >
        <Disc3 className="size-4" />
        <p className="[writing-mode:vertical-lr]">Music</p>
      </Button>
      <Link
        href="https://github.com/MrInspection/beatsflow"
        target="_blank"
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: "flex h-auto flex-col",
          }),
        )}
      >
        <GitHubLogoIcon className="size-4" />
        <p className="[writing-mode:vertical-lr]">Star on GitHub</p>
      </Link>
    </section>
  );
}
