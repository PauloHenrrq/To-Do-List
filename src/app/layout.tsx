import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter();

export const metadata: Metadata = {
  title: "ToDoList",
  description: "A simple to-do list application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`h-full antialiased`}
    >
      <body className={`${interSans.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
