import { SessionHeader } from "@/features/runner/components/session-header";
import { SessionManager } from "@/features/runner/components/session-manager";

export default function SessionPage() {
  return (
    <div className="flex h-screen flex-col bg-muted/60">
      <SessionHeader />
      <SessionManager />
    </div>
  );
}
