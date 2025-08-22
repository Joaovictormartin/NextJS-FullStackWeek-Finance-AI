import "./globals.css";

import type { Metadata } from "next";
import { dark } from "@clerk/themes";
import { Mulish } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finance Ai",
  icons: "/svg/logo.svg",
  description:
    "A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <div className="flex h-full flex-col">{children}</div>
        </ClerkProvider>
      </body>
    </html>
  );
}
