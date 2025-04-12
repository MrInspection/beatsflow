import {Button} from "@/components/ui/button";
import {useWorkflowStore} from "@/stores/use-workflow";
import {Pause, Play} from "lucide-react";
import {useState} from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

export function WorkflowButton() {
  const {
    blocks,
    startExecution,
    isExecuting,
    stopExecution,
    hasEndBlock,
  } = useWorkflowStore();
  const canExecuteWorkflow = blocks.length >= 2 && hasEndBlock();
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);

  const handleStopExecution = () => {
    setIsStopDialogOpen(true);
  };

  const confirmStopExecution = () => {
    stopExecution();
    setIsStopDialogOpen(false);
  };

  const handleStartExecution = () => {
    if (canExecuteWorkflow) {
      startExecution();
    }
  };

  return (
    <>
      <Button
        className="rounded-lg max-xl:w-full"
        variant="outline"
        onClick={isExecuting ? handleStopExecution : handleStartExecution}
        disabled={!canExecuteWorkflow || blocks.length === 0}
      >
        {isExecuting ? (
          <>
            <Pause className="size-4"/>
            <span>Stop Workflow</span>
          </>
        ) : (
          <>
            <Play className="size-4"/>
            <span>Start Workflow</span>
          </>
        )}
      </Button>

      <AlertDialog open={isStopDialogOpen} onOpenChange={setIsStopDialogOpen}>
        <AlertDialogContent className="p-0 rounded-3xl gap-0">
          <AlertDialogHeader className="p-6 border-b text-left">
            <AlertDialogTitle>Stop Workflow</AlertDialogTitle>
            <AlertDialogDescription>
              Hold on! You’re on a roll and making solid progress. Are you sure you want to stop your productivity
              workflow now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end items-center gap-2 px-6 py-4">
            <Button
              variant="outline"
              onClick={() => setIsStopDialogOpen(false)}
            >
              Keep Going
            </Button>
            <Button onClick={confirmStopExecution}>Stop Workflow</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
