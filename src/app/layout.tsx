import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { GovtBanner } from "./_components/govt-banner";

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
        <GovtBanner />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
