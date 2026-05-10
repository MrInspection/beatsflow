import type { Edge } from "@xyflow/react";
import type { WorkflowNode } from "@/features/editor/types/workflow.types";

export type WorkflowPreset = {
  value: string;
  label: string;
  description: string;
  nodes: WorkflowNode[];
  edges: Edge[];
};

export const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    value: "pomodoro",
    label: "Pomodoro",
    description: "25m focus + 5m break cycle",
    nodes: [
      {
        id: "intention-1",
        type: "intention",
        position: { x: 300, y: 0 },
        data: {
          prompt: "What do you want to accomplish in this session?",
          answer: "",
        },
      },
      {
        id: "focus-1",
        type: "focus",
        position: { x: 300, y: 320 },
        data: {
          label: "Deep Work",
          durationMinutes: 25,
          intention: "",
        },
      },
      {
        id: "break-1",
        type: "break",
        position: { x: 300, y: 620 },
        data: {
          label: "Short Break",
          durationMinutes: 5,
        },
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
  {
    value: "deep-work",
    label: "Deep Work",
    description: "90m focus sprint with a long recovery",
    nodes: [
      {
        id: "intention-1",
        type: "intention",
        position: { x: 300, y: 0 },
        data: {
          prompt: "What is the one thing you need to finish today?",
          answer: "",
        },
      },
      {
        id: "focus-1",
        type: "focus",
        position: { x: 300, y: 320 },
        data: {
          label: "Deep Work Sprint",
          durationMinutes: 90,
          intention: "",
        },
      },
      {
        id: "break-1",
        type: "break",
        position: { x: 300, y: 620 },
        data: {
          label: "Recovery Break",
          durationMinutes: 20,
        },
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
  {
    value: "review-and-plan",
    label: "Review & Plan",
    description: "Focus block followed by a task review",
    nodes: [
      {
        id: "intention-1",
        type: "intention",
        position: { x: 300, y: 0 },
        data: {
          prompt: "What are you reviewing and planning for?",
          answer: "",
        },
      },
      {
        id: "focus-1",
        type: "focus",
        position: { x: 300, y: 320 },
        data: {
          label: "Focused Review",
          durationMinutes: 30,
          intention: "",
        },
      },
      {
        id: "task-1",
        type: "task",
        position: { x: 300, y: 620 },
        data: {
          label: "Plan Next Steps",
          durationMinutes: 20,
          advanceCondition: "all-tasks",
          tasks: [
            { id: "t1", label: "Review notes", completed: false },
            { id: "t2", label: "Identify blockers", completed: false },
            { id: "t3", label: "Write action items", completed: false },
          ],
        },
      },
      {
        id: "break-1",
        type: "break",
        position: { x: 300, y: 1080 },
        data: {
          label: "Recharge",
          durationMinutes: 10,
        },
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
        id: "e-focus-task",
        source: "focus-1",
        target: "task-1",
        type: "smoothstep",
      },
      {
        id: "e-task-break",
        source: "task-1",
        target: "break-1",
        type: "smoothstep",
      },
    ],
  },
  {
    value: "morning-kickoff",
    label: "Morning Kickoff",
    description: "Set intention, tackle tasks, then focus",
    nodes: [
      {
        id: "intention-1",
        type: "intention",
        position: { x: 300, y: 0 },
        data: {
          prompt: "What would make today a success?",
          answer: "",
        },
      },
      {
        id: "task-1",
        type: "task",
        position: { x: 300, y: 320 },
        data: {
          label: "Morning Tasks",
          durationMinutes: 15,
          advanceCondition: "all-tasks",
          tasks: [
            { id: "t1", label: "Check emails", completed: false },
            { id: "t2", label: "Review calendar", completed: false },
            { id: "t3", label: "Set daily priorities", completed: false },
          ],
        },
      },
      {
        id: "focus-1",
        type: "focus",
        position: { x: 300, y: 780 },
        data: {
          label: "First Focus Block",
          durationMinutes: 45,
          intention: "",
        },
      },
      {
        id: "break-1",
        type: "break",
        position: { x: 300, y: 1080 },
        data: {
          label: "Short Break",
          durationMinutes: 10,
        },
      },
    ] as WorkflowNode[],
    edges: [
      {
        id: "e-intention-task",
        source: "intention-1",
        target: "task-1",
        type: "smoothstep",
      },
      {
        id: "e-task-focus",
        source: "task-1",
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
];
