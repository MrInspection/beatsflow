"use client";

import { Save, Share, Slash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  WORKFLOW_PRESETS,
  type WorkflowPreset,
} from "@/features/editor/data/workflow.presets";
import { useWorkflowStore } from "../store/workflow.store";

type SavedCustomPreset = {
  id: string;
  name: string;
  nodes: WorkflowPreset["nodes"];
  edges: WorkflowPreset["edges"];
  savedAt: string;
};

function loadCustomPresets(): SavedCustomPreset[] {
  try {
    return JSON.parse(localStorage.getItem("beatsflow-custom-presets") ?? "[]");
  } catch {
    return [];
  }
}

export function EditorHeader() {
  const { workflowName, setWorkflowName, resetWorkflow } = useWorkflowStore();
  const customPresets = loadCustomPresets();

  const allPresetItems = [
    ...WORKFLOW_PRESETS.map((preset) => ({
      label: preset.label,
      value: preset.value,
    })),
    ...customPresets.map((preset) => ({
      label: preset.name,
      value: preset.id,
    })),
  ];

  function handleLoadPreset(value: string | null) {
    if (!value) return;

    const builtInPreset = WORKFLOW_PRESETS.find(
      (preset) => preset.value === value,
    );
    if (builtInPreset) {
      resetWorkflow();
      useWorkflowStore.setState({
        workflowName: builtInPreset.label,
        nodes: builtInPreset.nodes,
        edges: builtInPreset.edges,
      });
      return;
    }

    const customPreset = customPresets.find((preset) => preset.id === value);
    if (customPreset) {
      resetWorkflow();
      useWorkflowStore.setState({
        workflowName: customPreset.name,
        nodes: customPreset.nodes,
        edges: customPreset.edges,
      });
    }
  }

  function handleShare() {
    const { workflowId, workflowName, nodes, edges } =
      useWorkflowStore.getState();

    if (nodes.length === 0) {
      toast.error("Add at least one block before sharing.");
      return;
    }

    const payload = {
      workflowId,
      workflowName: workflowName || "Untitled Workflow",
      nodes,
      edges,
    };
    const encoded = encodeURIComponent(JSON.stringify(payload));
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard.");
  }

  function handleSaveAsPreset() {
    const { workflowName, nodes, edges } = useWorkflowStore.getState();

    if (nodes.length === 0) {
      toast.error("Add at least one block before saving as a preset.");
      return;
    }

    const name = workflowName.trim() || "Untitled Workflow";
    const existingPresets = loadCustomPresets();

    const newPreset: SavedCustomPreset = {
      id: `custom-${Date.now()}`,
      name,
      nodes,
      edges,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "beatsflow-custom-presets",
      JSON.stringify([...existingPresets, newPreset]),
    );

    toast.success(`"${name}" saved as a preset.`);
  }

  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <div className="inline-flex items-center gap-2">
          <div className="font-medium">BeatsFlōw.</div>
          <Slash className="size-6 -rotate-30 text-muted-foreground/50" />
          <Input
            className="h-8 min-w-52"
            placeholder="Untitled Workflow"
            value={workflowName}
            onChange={(event) => setWorkflowName(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select items={allPresetItems} onValueChange={handleLoadPreset}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Load a preset" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Built-in</SelectLabel>
                {WORKFLOW_PRESETS.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              {customPresets.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Saved</SelectLabel>
                  {customPresets.map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={handleShare}>
            <Share className="size-4" /> Share
          </Button>
          <Button onClick={handleSaveAsPreset}>
            <Save className="size-4" /> Save as Preset
          </Button>
        </div>
      </div>
    </header>
  );
}
