import {EditorHeader} from "@/features/editor/components/editor-header/editor-header";
import {WorkflowEditor} from "@/features/editor/components/workflow-editor/workflow-editor";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col">
      <EditorHeader />
      <WorkflowEditor />
    </main>
  );
}
