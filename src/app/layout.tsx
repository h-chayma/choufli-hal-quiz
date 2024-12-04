import type { Metadata } from "next";
import "@/styles/globals.css";

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
      <body className="min-h-screen flex flex-col items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
