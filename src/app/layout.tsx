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
        <div className="px-4 flex flex-row gap-2">
          <a href="https://docs.google.com/document/d/1xvOPQwm2eYIfG8fftJ3yRPvowR7n4CUP/edit?usp=sharing&ouid=115377118495282373162&rtpof=true&sd=true" target="_blank">Terms of Use</a>
          <a href="https://docs.google.com/document/d/1-0x1wpK5kGsH6qD_x4PX6gwL5Aa6qfay/edit" target="_blank">Privacy Policy</a>
        </div>
      </body>
    </html>
  );
}
