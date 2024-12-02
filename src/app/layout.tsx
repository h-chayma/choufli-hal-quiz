import type { Metadata } from "next";
import "../style/globals.css";
import { AppWrapper } from "@/components/layout/AppWrapper";

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
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
