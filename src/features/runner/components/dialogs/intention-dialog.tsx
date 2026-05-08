"use client";

import { ChevronRight, PencilLine } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSessionStore } from "@/features/runner/store/session.store";

export function IntentionDialog({ open }: { open: boolean }) {
  const { intentionAnswer, setIntentionAnswer, confirmIntention, nodes } =
    useSessionStore();
  const intentionNode = nodes.find((node) => node.type === "intention");
  const prompt = intentionNode
    ? (intentionNode.data as { prompt: string }).prompt
    : "What deserves your focus today?";

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="space-y-4">
            <div className="flex size-10 items-center justify-center rounded-lg border bg-input/50">
              <PencilLine className="size-6" />
            </div>
            <span className="text-lg">{prompt}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-[90%]">
            Set your intention for this session. Come back to it when focus
            drifts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4">
          <Label>Your answer</Label>
          <Textarea
            placeholder="I want to..."
            className="h-28"
            value={intentionAnswer}
            onChange={(e) => setIntentionAnswer(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            render={<Button disabled={!intentionAnswer.trim()} />}
            className="w-full"
            onClick={confirmIntention}
          >
            Lock In <ChevronRight />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
