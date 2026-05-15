import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WORKFLOW_PRESETS } from "@/features/editor/data/workflow.presets";
import {
  type CustomPreset,
  loadCustomPresets,
  saveCustomPreset,
} from "@/features/editor/services/workflow-preset.storage";
import { buildShareUrl } from "@/features/editor/services/workflow-share.service";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";

export function useEditorHeader() {
  const { workflowName, loadPreset } = useWorkflowStore();
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);

  useEffect(() => {
    setCustomPresets(loadCustomPresets());
  }, []);

  function handleLoadPreset(value: string | null) {
    if (!value) return;

    const builtIn = WORKFLOW_PRESETS.find((preset) => preset.value === value);
    if (builtIn) {
      loadPreset({
        workflowName: builtIn.label,
        nodes: builtIn.nodes,
        edges: builtIn.edges,
      });
      return;
    }

    const custom = customPresets.find((preset) => preset.id === value);
    if (custom) {
      loadPreset({
        workflowName: custom.name,
        nodes: custom.nodes,
        edges: custom.edges,
      });
    }
  }

  function handleShare() {
    const {
      workflowId,
      workflowName: name,
      nodes,
      edges,
    } = useWorkflowStore.getState();

    if (nodes.length === 0) {
      toast.error("Add at least one block before sharing.");
      return;
    }

    const url = buildShareUrl({
      workflowId,
      workflowName: name || "Untitled Workflow",
      nodes,
      edges,
    });
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard.");
  }

  function handleSaveAsPreset() {
    const { workflowName: name, nodes, edges } = useWorkflowStore.getState();

    if (nodes.length === 0) {
      toast.error("Add at least one block before saving as a preset.");
      return;
    }

    const resolvedName = name.trim() || "Untitled Workflow";
    const newPreset = saveCustomPreset({ name: resolvedName, nodes, edges });
    setCustomPresets((previous) => [...previous, newPreset]);
    toast.success(`"${resolvedName}" saved as a preset.`);
  }

  return {
    workflowName,
    customPresets,
    handleLoadPreset,
    handleShare,
    handleSaveAsPreset,
  };
}
