import {ClockIcon, Coffee, ListTodo, MoreVerticalIcon, PencilLine, SquareFunction, Zap} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Label} from "@/components/ui/label";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function RoutePage() {
  return (
    <div className="flex-4 p-8 flex gap-10 flex-wrap">
      <BreakBlock/>
      <IntentionBlock/>
      <FocusBlock/>
      <TaskBlock/>
    </div>
  );
}

function BreakBlock() {
  return (
    <div className="h-fit w-84 rounded-4xl border">
      <div className="flex items-center gap-2 p-4 py-3">
        <Coffee className="size-5 text-muted-foreground"/>
        <div className="font-medium">Short Break</div>
        <div className="ml-auto flex items-center gap-2">
          <Badge className="bg-emerald-100/80" variant="secondary">
            Break
          </Badge>
          <Button size="icon-xs" variant="ghost">
            <MoreVerticalIcon className="size-4"/>
          </Button>
        </div>

      </div>
      <div className="space-y-2 border-t p-4">
        <Label>Duration</Label>
        <InputGroup>
          <InputGroupInput placeholder="5"/>
          <InputGroupAddon align="inline-start">
            <ClockIcon className="size-4 text-muted-foreground"/>
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">minutes</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}

function IntentionBlock() {
  return (
    <div className="h-fit w-84 rounded-4xl border">
      <div className="flex items-center gap-2 p-4 py-3">
        <PencilLine className="size-5 text-muted-foreground"/>
        <div className="font-medium">Set Intention</div>
        <Badge className="ml-auto bg-indigo-100/80" variant="secondary">
          Prompt
        </Badge>
      </div>
      <div className="space-y-6 border-t p-4">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea
            value="What do you want to accomplish today?"
            tabIndex={-1}
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label>Your answer</Label>
          <Textarea
            placeholder="Tell us what are you going to tackle"
            tabIndex={-1}
            readOnly
          />
          <p className="mt-4 text-pretty text-muted-foreground text-sm">
            You will prompted to answer to this question at the beginning of
            your workflow.
          </p>
        </div>
      </div>
    </div>
  );
}

function FocusBlock() {
  return (
    <div className="h-fit w-84 rounded-4xl border">
      <div className="flex items-center gap-2 p-4 py-3">
        <Zap className="size-5 text-muted-foreground"/>
        <div className="font-medium">Deep Work</div>
        <Badge className="ml-auto bg-pink-100/80" variant="secondary">
          Focus
        </Badge>
      </div>
      <div className="space-y-6 border-t p-4">
        <div className="space-y-2">
          <Label>Duration</Label>
          <InputGroup>
            <InputGroupInput placeholder="50"/>
            <InputGroupAddon align="inline-start">
              <ClockIcon className="size-4 text-muted-foreground"/>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">minutes</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="space-y-2">
          <Label>Intention</Label>
          <Textarea
            value="Design the onboarding flow for the dashboard"
            tabIndex={-1}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

function TaskBlock() {
  const items = [
    {label: "Timer ends", value: "timer"},
    {label: "All tasks completed", value: "all-tasks"},
    {label: "Any task completed", value: "any-task"},
  ];

  return (
    <div className="h-fit w-84 rounded-4xl border">
      <div className="flex items-center gap-2 p-4 py-3">
        <ListTodo className="size-5 text-muted-foreground"/>
        <div className="font-medium">Review PRs</div>
        <Badge className="ml-auto bg-orange-100/80" variant="secondary">
          Task
        </Badge>
      </div>
      <div className="space-y-6 border-t p-4">
        <div className="space-y-2">
          <Label>Duration</Label>
          <InputGroup>
            <InputGroupInput placeholder="50"/>
            <InputGroupAddon align="inline-start">
              <ClockIcon className="size-4 text-muted-foreground"/>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">minutes</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="space-y-2">
          <Label>Advances when</Label>
          <Select items={items} readOnly>
            <SelectTrigger className="w-full">
              <SquareFunction className="size-4"/> <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Condition</SelectLabel>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2.5">
          <Label>Tasks</Label>
          {[
            "Merge PR#25 from @MrInspection",
            "Fix issue #15 on payment gateway",
            "Generate specs.md with Claude",
          ].map((task, index) => (
            <div className="flex items-start gap-2" key={index}>
              <Checkbox id="task-1" disabled/>
              <Label htmlFor="task-1" className="">
                {task}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
