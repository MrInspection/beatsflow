"use client";

import type { Edge } from "@xyflow/react";
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
import type { WorkflowNode } from "@/features/editor/types/workflow.types";
import { useWorkflowStore } from "../store/use-workflow.store";

const PRESETS = [
  { value: "pomodoro", label: "Pomodoro" },
  { value: "sprint", label: "Sprint" },
] as const;

type PresetValue = (typeof PRESETS)[number]["value"];

const PRESET_WORKFLOWS: Record<
  PresetValue,
  { nodes: WorkflowNode[]; edges: Edge[] }
> = {
  pomodoro: {
    nodes: [
      {
        id: "intention-1",
        type: "intention",
        position: { x: 0, y: 0 },
        data: { prompt: "What do you want to accomplish today?", answer: "" },
      },
      {
        id: "focus-1",
        type: "focus",
        position: { x: 0, y: 220 },
        data: { label: "Deep Work", durationMinutes: 25, intention: "" },
      },
      {
        id: "break-1",
        type: "break",
        position: { x: 0, y: 440 },
        data: { label: "Short Break", durationMinutes: 5 },
      },
    ] as WorkflowNode[],
    edges: [
      {
        id: "e-intention-focus",
        source: "intention-1",
        target: "focus-1",
        type: "smoothstep",
      },
      {
        id: "e-focus-break",
        source: "focus-1",
        target: "break-1",
        type: "smoothstep",
      },
    ],
  },
  sprint: {
    nodes: [
      {
        id: "intention-1",
        type: "intention",
        position: { x: 0, y: 0 },
        data: { prompt: "What is your sprint goal?", answer: "" },
      },
      {
        id: "focus-1",
        type: "focus",
        position: { x: 0, y: 220 },
        data: { label: "Sprint", durationMinutes: 50, intention: "" },
      },
      {
        id: "break-1",
        type: "break",
        position: { x: 0, y: 440 },
        data: { label: "Long Break", durationMinutes: 10 },
      },
    ] as WorkflowNode[],
    edges: [
      {
        id: "e-intention-focus",
        source: "intention-1",
        target: "focus-1",
        type: "smoothstep",
      },
      {
        id: "e-focus-break",
        source: "focus-1",
        target: "break-1",
        type: "smoothstep",
      },
    ],
  },
};

export function EditorHeader() {
  const { workflowName, setWorkflowName, resetWorkflow } = useWorkflowStore();

  function handleLoadPreset(value: string | null) {
    if (!value) return;
    const preset = PRESET_WORKFLOWS[value as PresetValue];
    if (!preset) return;
    resetWorkflow();
    useWorkflowStore.setState({
      nodes: preset.nodes,
      edges: preset.edges,
    });
  }

  function handleShare() {
    const { workflowId, workflowName, nodes, edges } =
      useWorkflowStore.getState();
    const payload = { workflowId, workflowName, nodes, edges };
    const encoded = btoa(JSON.stringify(payload));
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
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
            onChange={(e) => setWorkflowName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select items={PRESETS} onValueChange={handleLoadPreset}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Load a preset" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Preset</SelectLabel>
                {PRESETS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={handleShare}>
            <Share className="size-4" /> Share
          </Button>
          <Button>
            <Save className="size-4" /> Save as Preset
          </Button>
        </div>
      </div>
    </header>
  );
}
