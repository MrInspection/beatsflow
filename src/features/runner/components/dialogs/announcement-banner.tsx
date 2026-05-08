"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "flex h-10 items-center justify-center rounded-t-2xl",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-muted-foreground dark:bg-muted",
        success:
          "bg-blue-100/60 text-blue-900 dark:bg-blue-900/20 dark:text-blue-400",
        warning:
          "bg-orange-100/60 text-orange-900 dark:bg-orange-900/20 dark:text-orange-400",
        error:
          "bg-red-100/60 text-red-900 dark:bg-red-900/20 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AnnouncementBannerProps = VariantProps<typeof bannerVariants> & {
  label: string;
  icon?: LucideIcon;
  isVanished: boolean;
};

export function AnnouncementBanner({
  label,
  icon: Icon,
  variant = "default",
  isVanished = true,
}: AnnouncementBannerProps) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isVanished ? "max-h-0 p-0 opacity-0" : "max-h-16 p-2 opacity-100",
      )}
    >
      <div className={cn(bannerVariants({ variant }))}>
        {Icon && <Icon className="mr-2 size-4" />}
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}
