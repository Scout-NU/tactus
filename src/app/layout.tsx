import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomHeader from "./components/CustomHeader/CustomHeader";
import { CartProvider } from "@/context/CartContext";
import CustomFooter from "./components/Footer/CustomFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " Tactus",
  description: "Tactus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/wjs8mfv.css"
        ></link>
        {/* Preconnect to external services for faster loading */}
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://js.hsforms.net" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://js.hsforms.net" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <CustomHeader />
          {children}
          <CustomFooter />
        </CartProvider>
      </body>
    </html>
  );
}
