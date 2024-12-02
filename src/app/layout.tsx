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
    <html lang="en">
      <body className="bg-gradient-to-r from-primary to-secondary">
        {children}
      </body>
    </html>
  );
}
