"use client"

import {ModeToggle} from "@/components/theme-toggle";
import {AudioLines, FlaskConical} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import {cn} from "@/lib/utils";
import Link from "next/link";

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-border/80 bg-background/95
             backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16  max-w-screen-2xl items-center">

                <div className={"flex items-center mr-4"}>
                    <Link href={"/"} className={"flex"}>
                        <AudioLines className={"h-7 w-7 mr-2"}/>
                        <h1 className={"font-bold text-lg"}>
                            <span className={"max-sm:hidden"}>ProjectUltron</span>  BeatsFlōw
                        </h1>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none" />
                    <nav className="flex items-center">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <div
                                    className={cn(
                                        buttonVariants({
                                            variant: "ghost",
                                        }),
                                        "w-9 px-0"
                                    )}
                                >
                                    <FlaskConical className="h-5 w-5"/>
                                    <span className="sr-only">LinkedIn</span>
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className={"flex items-center"}>
                                        <FlaskConical className={"h-4 w-4 mr-2"}/> ProjectUltron Labs
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className={"text-left text-balance"}>
                                        BeatsFlōw (X-LABS-005W) is a small project under the ProjectUltron Labs experimental
                                        initiatives. It utilizes the foundational web development stack of
                                        ProjectUltron. If you have song suggestions or ideas to share, please email us
                                        at projectultronmedia@gmail.com.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction className={"mt-2 w-full"}>Understood</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                       <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}