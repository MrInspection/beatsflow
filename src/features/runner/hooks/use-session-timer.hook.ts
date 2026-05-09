import { useEffect, useRef } from "react";
import {
  getRunnableNodes,
  useSessionStore,
} from "@/features/runner/store/session.store";
import { formatSeconds } from "@/features/runner/utils/session.utils";
import { playSound } from "@/lib/sounds";

export function useSessionTimer() {
  const status = useSessionStore((state) => state.status);
  const tick = useSessionStore((state) => state.tick);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const secondsRemaining = useSessionStore((state) => state.secondsRemaining);
  const nodes = useSessionStore((state) => state.nodes);

  const prevBlockIndexRef = useRef(currentBlockIndex);
  const prevStatusRef = useRef(status);
  const pendingSoundTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  function cancelPendingSounds() {
    if (pendingSoundTimeoutRef.current) {
      clearTimeout(pendingSoundTimeoutRef.current);
      pendingSoundTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [status, tick]);

  useEffect(() => {
    if (prevBlockIndexRef.current === currentBlockIndex) return;
    prevBlockIndexRef.current = currentBlockIndex;

    if (status === "completed" || status === "idle") return;

    cancelPendingSounds();
    playSound("session-end");
    pendingSoundTimeoutRef.current = setTimeout(() => {
      playSound("session-start");
    }, 600);

    return cancelPendingSounds;
  }, [currentBlockIndex, status]);

  useEffect(() => {
    const previousStatus = prevStatusRef.current;
    if (previousStatus === status) return;
    prevStatusRef.current = status;

    if (
      status === "running" &&
      (previousStatus === "intention" || previousStatus === "idle")
    ) {
      playSound("workflow-start");
      return;
    }

    if (status === "paused" && previousStatus === "running") {
      playSound("timer-paused");
      return;
    }

    if (status === "running" && previousStatus === "paused") {
      playSound("timer-resume");
      return;
    }

    if (status === "completed") {
      cancelPendingSounds();
      playSound("workflow-end");
      return;
    }

    if (status === "idle") {
      cancelPendingSounds();
    }
  }, [status]);

  // Document title
  useEffect(() => {
    const runnableNodes = getRunnableNodes(nodes);
    const currentNode = runnableNodes[currentBlockIndex];
    const typeLabel = currentNode?.type ?? "session";
    const formatted = formatSeconds(secondsRemaining);

    if (status === "running" || status === "paused") {
      document.title = `${formatted} · ${typeLabel} — BeatsFlōw`;
      return;
    }

    if (status === "completed") {
      document.title = "Session complete — BeatsFlōw";
      return;
    }

    document.title = "BeatsFlōw";
  }, [secondsRemaining, status, currentBlockIndex, nodes]);

  useEffect(() => {
    return () => {
      document.title = "BeatsFlōw";
    };
  }, []);
}
