import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWorkflowStore } from "@/features/editor/store/use-workflow.store";
import { useSessionStore } from "@/features/runner/store/session.store";

export function useSessionInit() {
  const router = useRouter();
  const initSession = useSessionStore((s) => s.initSession);
  const status = useSessionStore((s) => s.status);
  const { workflowName, nodes, edges } = useWorkflowStore();

  useEffect(() => {
    if (nodes.length === 0) {
      router.replace("/");
      return;
    }
    if (status === "idle") {
      initSession(workflowName, nodes, edges);
    }
  }, []);
}
