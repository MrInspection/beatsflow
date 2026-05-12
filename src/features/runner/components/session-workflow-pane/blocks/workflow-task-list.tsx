import { WorkflowTaskItem } from "@/features/runner/components/session-workflow-pane/blocks/workflow-task-item";

type WorkflowTaskListProps = {
  tasks: {
    id: string;
    label: string;
    completed: boolean;
  }[];
};

export function WorkflowTaskList({ tasks }: WorkflowTaskListProps) {
  return (
    <div className="my-1 space-y-3 rounded-lg border-2 border-b-4 px-3 py-3">
      <div className="mb-4 font-semibold text-sm">To-do list</div>
      {tasks.map((task) => (
        <WorkflowTaskItem
          key={task.id}
          label={task.label}
          completed={task.completed}
        />
      ))}
    </div>
  );
}
