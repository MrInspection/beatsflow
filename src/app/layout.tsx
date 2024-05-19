import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectUltron BeatsFlōw",
  description: "Motion & Emotion in Music",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SiteHeader/>
            {children}
            <SiteFooter/>
        </ThemeProvider>
        </body>
        </html>
    );
}
