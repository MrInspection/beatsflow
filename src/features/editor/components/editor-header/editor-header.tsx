"use client";

import { Save, Share, Slash } from "lucide-react";
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
import { useEditorHeader } from "@/features/editor/components/editor-header/editor-header.hook";
import { WORKFLOW_PRESETS } from "@/features/editor/data/workflow.presets";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";

export function EditorHeader() {
  const setWorkflowName = useWorkflowStore((state) => state.setWorkflowName);
  const {
    workflowName,
    customPresets,
    handleLoadPreset,
    handleShare,
    handleSaveAsPreset,
  } = useEditorHeader();

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
