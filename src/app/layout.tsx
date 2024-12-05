import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { QuizProvider } from "@/context/QuizContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "شوفلي كويز",
  description: "كويز للفان متع شوفلي حل",
  openGraph: {
    title: "شوفلي كويز",
    description: "كويز للفان متع شوفلي حل",
    url: "https://choufli-quiz.vercel.app",
    type: "website",
    images: [
      {
        url: "https://choufli-quiz.vercel.app/images/og-image.jpg",
        width: 800,
        height: 600,
        alt: "شوفلي كويز",
      },
    ],
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="كويز للفان متع شوفلي حل" />
        <meta property="og:title" content="شوفلي كويز" />
        <meta property="og:description" content="كويز للفان متع شوفلي حل" />
        <meta property="og:url" content="https://choufli-quiz.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://choufli-quiz.vercel.app/images/og-image.jpg" />
        <title>شوفلي كويز</title>
      </head>
      <body className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary via-primary to-accent p-4">
        <Analytics />
        <QuizProvider>
          <AppWrapper>{children}</AppWrapper>
        </QuizProvider>
      </body>
    </html>
  );
}
