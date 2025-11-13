"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { clearCart, itemCount } = useCart();
  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    // Only clear once when component mounts
    if (!hasCleared) {
      clearCart();
      setHasCleared(true);
    }
  }, [hasCleared, clearCart]);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 1145px 1606.4px at 605.5px 720.26px, rgba(5,54,95,1) 19.712%, rgba(4,28,57,1) 59.856%, rgba(4,15,38,1) 79.928%, rgba(3,2,19,1) 100%)",
      }}
    >
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <div className="space-y-8">
          {/* Success Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              Order Successful!
            </h1>
            <p className="font-body text-lg text-white/80">
              Thank you for your purchase. Your order has been confirmed and
              will be shipped soon.
            </p>
            <p className="font-body text-base text-white/60">
              You will receive an email confirmation with your order details and
              tracking information.
            </p>
            {/* Debug: Show if cart cleared (only in development) */}
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs text-white/40">Cart items: {itemCount}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="font-body inline-flex items-center justify-center rounded-lg bg-[#FF6B4A] px-8 py-3 text-base font-medium text-white transition hover:bg-[#FF5A39] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#FF6B4A]/60"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="font-body inline-flex items-center justify-center rounded-lg border border-white bg-white px-8 py-3 text-base font-medium text-[#05365f] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring focus-visible:ring-white/30"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
