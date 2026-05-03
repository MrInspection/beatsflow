import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function NodeFormHeader({
  className,
  icon: Icon,
  title,
  description,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 p-4", className)} {...props}>
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
}

function NodeFormContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="form-content"
      className={cn(
        "flex-1 space-y-6 overflow-y-auto border-t p-4 py-5",
        className,
      )}
      {...props}
    />
  );
}

function NodeFormFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("border-t p-4", className)} {...props} />;
}

export { NodeFormContent, NodeFormFooter, NodeFormHeader };
