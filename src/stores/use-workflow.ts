"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type WorkflowBlockType = "focus" | "break" | "deep-work" | "end"

export interface WorkflowBlock {
  id: string
  type: WorkflowBlockType
  duration: number
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
  moveBlock: (fromIndex: number, toIndex: number) => void
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
        let defaultDuration = 0
        let defaultIntensity = undefined

        switch (type) {
          case "focus":
            defaultDuration = 25
            defaultIntensity = 50
            break
          case "break":
            defaultDuration = 5
            break
          case "deep-work":
            defaultDuration = 90
            defaultIntensity = 70
            break
          case "end":
            defaultDuration = 0
            break
        }

        // Validate duration based on block type
        if (type === "focus" && (defaultDuration < 5 || defaultDuration > 50)) {
          defaultDuration = 25
        } else if (type === "break" && (defaultDuration < 3 || defaultDuration > 30)) {
          defaultDuration = 5
        } else if (type === "deep-work" && ![60, 90, 120].includes(defaultDuration)) {
          defaultDuration = 90
        }

        const newBlock: WorkflowBlock = {
          id: crypto.randomUUID(),
          type,
          duration: defaultDuration,
          position: blocks.length,
        }

        set({
          blocks: [...blocks, newBlock],
          selectedBlockId: newBlock.id,
        })
      },

      updateBlock: (id, updates) => {
        const { blocks } = get()
        const blockIndex = blocks.findIndex((block) => block.id === id)

        if (blockIndex === -1) return

        const block = blocks[blockIndex]

        // Validate updates based on block type
        const validatedUpdates = { ...updates }

        if (block.type === "focus") {
          if (updates.duration !== undefined) {
            validatedUpdates.duration = Math.min(Math.max(updates.duration, 5), 50)
          }
        } else if (block.type === "break") {
          if (updates.duration !== undefined) {
            validatedUpdates.duration = Math.min(Math.max(updates.duration, 3), 30)
          }
        } else if (block.type === "deep-work") {
          if (updates.duration !== undefined && ![60, 90, 120].includes(updates.duration)) {
            validatedUpdates.duration = 90
          }
        }

        set({
          blocks: blocks.map((block) => (block.id === id ? { ...block, ...validatedUpdates } : block)),
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

      moveBlock: (fromIndex, toIndex) => {
        const { blocks } = get()

        // Don't allow moving end blocks
        if (blocks[fromIndex]?.type === "end") return

        // Don't allow moving blocks after an end block
        const endBlockIndex = blocks.findIndex((block) => block.type === "end")
        if (endBlockIndex !== -1 && toIndex > endBlockIndex) return

        // Create a copy of the blocks array
        const newBlocks = [...blocks]

        // Remove the block from its original position
        const [movedBlock] = newBlocks.splice(fromIndex, 1)

        // Insert the block at the new position
        newBlocks.splice(toIndex, 0, movedBlock)

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
