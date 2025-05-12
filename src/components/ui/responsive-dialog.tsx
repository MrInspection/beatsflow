"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface BaseProps {
  children: React.ReactNode
}

interface RootResponsiveDialogProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface ResponsiveDialogProps extends BaseProps {
  className?: string
  asChild?: true
}

const ResponsiveDialogContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
});

const useResponsiveDialogContext = () => {
  const context = React.useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context",
    );
  }
  return context;
};

const ResponsiveDialog = ({ children, ...props }: RootResponsiveDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const ResponsiveDialog = isDesktop ? Dialog : Drawer;

  return (
    <ResponsiveDialogContext.Provider value={{ isDesktop }}>
      <ResponsiveDialog {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </ResponsiveDialog>
    </ResponsiveDialogContext.Provider>
  );
};


const ResponsiveDialogTrigger = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const { isDesktop } = useResponsiveDialogContext();
  const ResponsiveDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <ResponsiveDialogTrigger className={className} {...props}>
      {children}
    </ResponsiveDialogTrigger>
  );
};

const ResponsiveDialogClose = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const { isDesktop } = useResponsiveDialogContext();
  const ResponsiveDialogClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <ResponsiveDialogClose className={className} {...props}>
      {children}
    </ResponsiveDialogClose>
  );
};

const ResponsiveDialogContent = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const { isDesktop } = useResponsiveDialogContext();
  const ResponsiveDialogContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <ResponsiveDialogContent className={className} {...props}>
      {children}
    </ResponsiveDialogContent>
  );
};

const ResponsiveDialogDescription = ({className, children, ...props}: ResponsiveDialogProps) => {
  const { isDesktop } = useResponsiveDialogContext();
  const ResponsiveDialogDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <ResponsiveDialogDescription className={className} {...props}>
      {children}
    </ResponsiveDialogDescription>
  );
};

const ResponsiveDialogHeader = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const { isDesktop } = useResponsiveDialogContext();
  const ResponsiveDialogHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <ResponsiveDialogHeader className={className} {...props}>
      {children}
    </ResponsiveDialogHeader>
  );
};

const ResponsiveDialogTitle = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const { isDesktop } = useResponsiveDialogContext();
  const ResponsiveDialogTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <ResponsiveDialogTitle className={className} {...props}>
      {children}
    </ResponsiveDialogTitle>
  );
};

const ResponsiveDialogBody = ({ className, children, ...props }: ResponsiveDialogProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const ResponsiveDialogFooter = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const { isDesktop } = useResponsiveDialogContext();
  const ResponsiveDialogFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <ResponsiveDialogFooter className={className} {...props}>
      {children}
    </ResponsiveDialogFooter>
  );
};

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
  ResponsiveDialogFooter,
}
