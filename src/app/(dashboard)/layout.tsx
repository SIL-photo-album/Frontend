"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      router.push("/");
    }
  });
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
