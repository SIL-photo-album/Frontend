import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ian Kamau",
  description: "Savannah Informatics Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
