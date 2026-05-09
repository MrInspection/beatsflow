"use client";

import { Slash, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/features/runner/store/session.store";

export function SessionHeader() {
  const workflowName = useSessionStore((state) => state.workflowName);
  const { resetSession } = useSessionStore();
  const router = useRouter();

  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <div className="inline-flex items-center gap-2">
          <h3 className="font-medium">BeatsFlōw.</h3>
          <Slash className="size-4 -rotate-30 text-muted-foreground/50" />
          <div className="font-medium text-muted-foreground text-sm">
            {workflowName || "Untitled Workflow"}
          </div>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  variant="default"
                  className="bg-destructive hover:bg-destructive/80"
                />
              }
            >
              <XIcon className="size-4" /> End Session
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>End this session?</AlertDialogTitle>
                <AlertDialogDescription>
                  {" "}
                  Your progress won't be saved. You'll be taken back to the
                  editor.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="secondary">
                  Keep Going
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    resetSession();
                    router.push("/");
                  }}
                >
                  End Session
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
