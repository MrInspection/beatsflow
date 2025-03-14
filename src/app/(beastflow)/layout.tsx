import {ReactNode} from "react";
import SiteHeader from "@/components/site-header";
import SidePanel from "@/components/side-panel/side-panel";

export default function AppLayout({children}: { children: ReactNode }) {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-muted/70 px-4 max-md:py-2">
      <SiteHeader/>
      <div className="flex flex-1 overflow-hidden max-md:flex-col gap-2">
        <section className="flex-1 overflow-auto relative">
          <div className="border-2 shadow-md bg-background rounded-t-3xl max-sm:rounded-b-3xl h-full px-2 py-3">
            <div className="overflow-auto h-full px-2">{children}</div>
          </div>
        </section>
        <SidePanel />
      </div>
    </main>
  )
}