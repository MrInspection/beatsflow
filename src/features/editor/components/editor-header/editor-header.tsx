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
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        <div className="inline-flex min-w-0 items-center gap-2">
          <div className="hidden font-medium sm:block">BeatsFlōw.</div>
          <div className="font-medium sm:hidden">BF.</div>
          <Slash className="size-6 shrink-0 -rotate-30 text-muted-foreground/50" />
          <Input
            className="h-8 w-32 sm:w-44 md:min-w-52"
            placeholder="Untitled Workflow"
            value={workflowName}
            onChange={(event) => setWorkflowName(event.target.value)}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Select items={allPresetItems} onValueChange={handleLoadPreset}>
            <SelectTrigger className="w-36 md:w-52">
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
          <Button
            variant="secondary"
            onClick={handleShare}
            size="sm"
            className="md:h-9"
          >
            <Share className="size-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button onClick={handleSaveAsPreset} size="sm" className="md:h-9">
            <Save className="size-4" />
            <span className="hidden sm:inline">Save as Preset</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
