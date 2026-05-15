import { useSessionBanner } from "@/features/runner/components/session-stage/banners/use-session-banner";

export function useSessionStageModel() {
  const banner = useSessionBanner();
  return { banner };
}
