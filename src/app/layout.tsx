import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDoList - Organize suas tarefas",
  description: "Uma aplicação de gerenciamento de tarefas moderna e eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased bg-zinc-950 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
