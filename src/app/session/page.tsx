import { SessionHeader } from "@/features/runner/components/session-header";
import { SessionViewer } from "@/features/runner/components/session-viewer";

export default function SessionPage() {
  return (
    <div className="flex h-screen flex-col">
      <SessionHeader />
      <SessionViewer />
    </div>
  );
}
