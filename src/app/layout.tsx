import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { HackathonBanner } from "./_components/hackathon-banner";

export const metadata: Metadata = {
  title: "Got Lobang?",
  description: "The latest request matches on PassItOn",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <HackathonBanner />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
