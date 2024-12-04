import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { QuizProvider } from "@/context/QuizContext";

export const metadata: Metadata = {
  title: "كويز شوفلي حل",
  description: "ألعب كويز شوفلي حل",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary via-primary to-accent p-4">
        <QuizProvider>
          <AppWrapper>{children}</AppWrapper>
        </QuizProvider>
      </body>
    </html>
  );
}
