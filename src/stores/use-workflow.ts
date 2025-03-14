"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type WorkflowBlockType = "focus" | "break" | "deep-work" | "end"

export interface WorkflowBlock {
  id: string
  type: WorkflowBlockType
  duration: number // in minutes
  intensity?: number // for focus and deep work sessions
  position: number
}

interface WorkflowState {
  blocks: WorkflowBlock[]
  selectedBlockId: string | null
  isExecuting: boolean
  currentBlockIndex: number
  addBlock: (type: WorkflowBlockType) => void
  updateBlock: (id: string, updates: Partial<Omit<WorkflowBlock, "id">>) => void
  deleteBlock: (id: string) => void
  moveBlockUp: (id: string) => void
  moveBlockDown: (id: string) => void
  selectBlock: (id: string | null) => void
  startExecution: () => void
  stopExecution: () => void
  nextBlock: () => void
  resetExecution: () => void
  canAddMoreBlocks: () => boolean
  hasEndBlock: () => boolean
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      blocks: [],
      selectedBlockId: null,
      isExecuting: false,
      currentBlockIndex: 0,

      addBlock: (type) => {
        const { blocks } = get()

        // Check if we already have an end block
        if (!get().canAddMoreBlocks()) {
          return
        }

        // Default values based on block type
        const defaultDuration = type === "focus" ? 25 : type === "break" ? 5 : type === "deep-work" ? 90 : 0
        const defaultIntensity = type === "focus" ? 30 : type === "deep-work" ? 60 : undefined

        const newBlock: WorkflowBlock = {
          id: crypto.randomUUID(),
          type,
          duration: defaultDuration,
          intensity: defaultIntensity,
          position: blocks.length,
        }

        set({
          blocks: [...blocks, newBlock],
          selectedBlockId: newBlock.id,
        })
      },

      updateBlock: (id, updates) => {
        const { blocks } = get()
        set({
          blocks: blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)),
        })
      },

      deleteBlock: (id) => {
        const { blocks, selectedBlockId } = get()
        const newBlocks = blocks.filter((block) => block.id !== id)

        // Reorder positions after deletion
        const reorderedBlocks = newBlocks.map((block, index) => ({
          ...block,
          position: index,
        }))

        set({
          blocks: reorderedBlocks,
          selectedBlockId: selectedBlockId === id ? null : selectedBlockId,
        })
      },

      moveBlockUp: (id) => {
        const { blocks } = get()
        const index = blocks.findIndex((block) => block.id === id)
        const block = blocks[index]

        // Don't move if it's the first block or if it's an end block
        if (index <= 0 || block.type === "end") return

        const newBlocks = [...blocks]
        const temp = newBlocks[index]
        newBlocks[index] = newBlocks[index - 1]
        newBlocks[index - 1] = temp

        // Update positions
        const reorderedBlocks = newBlocks.map((block, idx) => ({
          ...block,
          position: idx,
        }))

        set({ blocks: reorderedBlocks })
      },

      moveBlockDown: (id) => {
        const { blocks } = get()
        const index = blocks.findIndex((block) => block.id === id)
        const block = blocks[index]

        // Don't move if it's the last block or if it's an end block
        if (index >= blocks.length - 1 || block.type === "end") return

        const newBlocks = [...blocks]
        const temp = newBlocks[index]
        newBlocks[index] = newBlocks[index + 1]
        newBlocks[index + 1] = temp

        // Update positions
        const reorderedBlocks = newBlocks.map((block, idx) => ({
          ...block,
          position: idx,
        }))

        set({ blocks: reorderedBlocks })
      },

      selectBlock: (id) => {
        set({ selectedBlockId: id })
      },

      startExecution: () => {
        set({
          isExecuting: true,
          currentBlockIndex: 0,
        })
      },

      stopExecution: () => {
        set({ isExecuting: false })
      },

      nextBlock: () => {
        const { currentBlockIndex, blocks } = get()
        if (currentBlockIndex < blocks.length - 1) {
          set({ currentBlockIndex: currentBlockIndex + 1 })
        } else {
          set({
            isExecuting: false,
            currentBlockIndex: 0,
          })
        }
      },

      resetExecution: () => {
        set({
          isExecuting: false,
          currentBlockIndex: 0,
        })
      },

      canAddMoreBlocks: () => {
        return !get().hasEndBlock()
      },

      hasEndBlock: () => {
        const { blocks } = get()
        return blocks.some((block) => block.type === "end")
      },
    }),
    {
      name: "workflow-storage",
    },
  ),
)

