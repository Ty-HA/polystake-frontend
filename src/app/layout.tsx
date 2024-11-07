import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PolyStake - Secure Crypto Staking Platform",
  description: "Stake your ETH and BTC securely with PolyStake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">{children}</body>
    </html>
  );
}