import { SessionHeader } from "@/features/runner/components/session-header";
import { SessionManager } from "@/features/runner/components/session-manager";

export default function SessionPage() {
  return (
    <div className="flex h-screen flex-col bg-neutral-100 dark:bg-muted/20">
      <SessionHeader />
      <SessionManager />
    </div>
  );
}
