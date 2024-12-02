import "@/styles/globals.css"
import { Metadata } from "next"

import { cn } from "@/lib/utils"
import { AppWrapper } from "@/components/layout/AppWrapper"

export const metadata: Metadata = {
  title: "كويز شوفلي حل",
  description: "ألعب كويز شوفلي حل",
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background antialiased",)}
        >
            <AppWrapper>{children}</AppWrapper>
        </body>
      </html>
    </>
  )
}
