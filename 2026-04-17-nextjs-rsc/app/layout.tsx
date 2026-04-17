import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js RSC",
  description: "Minimal Next.js starter with TypeScript and TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
