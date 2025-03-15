import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeatsFlōw",
  description: "Supercharge your productivity with a workflow editor, productivity timers, music player, and ambient sounds.",
  openGraph: {
    url: "https://moussax.vercel.app",
    title: "BeatsFlōw",
    description: "Supercharge your productivity with a workflow editor, productivity timers, music player, and ambient sounds.",
    images: [
      {
        url: "https://beatsflow.vercel.app/beatsflow.png",
        width: 1200,
        height: 630,
        alt: "BeatsFlōw",
      },
    ],
  }
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={inter.className + "antialiased"}>
    <div className="flex flex-col min-h-screen">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      {children}
      </ThemeProvider>
    </div>
    </body>
    </html>
  );
}
