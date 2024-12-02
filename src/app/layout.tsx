import type { Metadata } from "next";
import "../style/globals.css";

export const metadata: Metadata = {
  title: "كويز شوفلي حل",
  description: "ألعب كويز شوفلي حل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className="h-screen bg-gradient-to-r from-primary to-secondary overflow-hidden relative p-4">
        {children}
      </body>
    </html>
  );
}
