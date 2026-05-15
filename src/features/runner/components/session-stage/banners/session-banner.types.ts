import type { LucideIcon } from "lucide-react";

export type SessionBannerVariant = "default" | "success" | "warning" | "error";

export type SessionBannerModel = {
  label: string;
  icon: LucideIcon;
  variant: SessionBannerVariant;
  isVanished: boolean;
};
