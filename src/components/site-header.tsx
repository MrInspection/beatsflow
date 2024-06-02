"use client"

import {ModeToggle} from "@/components/theme-toggle";
import {Disc3} from "lucide-react";
import Link from "next/link";

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-border/80 bg-background/95
             backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className={"flex items-center mr-4"}>
                    <Link href={"/"} className={"flex items-center"}>
                        <Disc3 className={"size-5 mr-2"}/>
                        <h1 className={"font-bold text-sm"}>
                            <span className={"max-sm:hidden"}>Spectron</span>  BeatsFlōw
                        </h1>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none" />
                    <nav className="flex items-center">
                        <ModeToggle/>
                    </nav>
                </div>
            </div>
        </header>
    )
}
