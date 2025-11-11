"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import "./HeaderStyle.css";

export default function CustomHeader() {
  const pathname = usePathname();
  const { items, itemCount, removeFromCart, getCartTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const lightBackgroundPages = ["/about"];
  const isDarkText = lightBackgroundPages.includes(pathname);
  const textColor = isDarkText ? "#05365f" : "#FFF";

  // Close cart dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create checkout session: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned from server");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setCheckoutError("Failed to start checkout. Please try again.");
      setIsCheckoutLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <header className="custom-header" style={{ color: textColor }}>
      <div className="company-name">
        <Link
          href="/"
          style={{
            fontWeight: pathname === "/" ? "bold" : "normal",
            color: textColor,
          }}
        >
          <h1 style={{ color: textColor }}>Tactus</h1>
        </Link>
      </div>
      <div className="navigation-buttons">
        <nav className="navbar">
          <Link
            href="/product"
            style={{
              fontWeight: pathname === "/product" ? "bold" : "normal",
              color: textColor,
            }}
          >
            Product
          </Link>
          <Link
            href="/shop"
            style={{
              fontWeight: pathname === "/shop" ? "bold" : "normal",
              color: textColor,
            }}
          >
            Shop
          </Link>
          <Link
            href="/community"
            style={{
              fontWeight: pathname === "/community" ? "bold" : "normal",
              color: textColor,
            }}
          >
            Community
          </Link>

          {/* Cart Icon with Badge */}
          <div className="cart-container" ref={cartRef}>
            <button
              className="cart-button"
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label="Shopping cart"
              style={{ color: textColor }}
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>

            {/* Cart Dropdown */}
            {isCartOpen && (
              <div className="cart-dropdown">
                <div className="cart-dropdown-header">
                  <h3>Your Cart</h3>
                </div>

                {items.length === 0 ? (
                  <div className="cart-empty">
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {items.map((item) => (
                        <div
                          key={`${item.productId}-${item.size}`}
                          className="cart-item"
                        >
                          <div className="cart-item-image">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={60}
                                height={60}
                              />
                            ) : (
                              <div className="cart-item-placeholder" />
                            )}
                          </div>
                          <div className="cart-item-details">
                            <h4>{item.title}</h4>
                            <p className="cart-item-size">Size: {item.size}</p>
                            <p className="cart-item-price">
                              {formatPrice(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <button
                            className="cart-item-remove"
                            onClick={() =>
                              removeFromCart(item.productId, item.size)
                            }
                            aria-label="Remove item"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="cart-footer">
                      <div className="cart-total">
                        <span>Subtotal:</span>
                        <span className="cart-total-amount">
                          {formatPrice(getCartTotal())}
                        </span>
                      </div>
                      {checkoutError && (
                        <div className="cart-error">{checkoutError}</div>
                      )}
                      <button
                        className="cart-checkout-button"
                        onClick={handleCheckout}
                        disabled={isCheckoutLoading}
                      >
                        {isCheckoutLoading ? "Processing..." : "Checkout"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
