"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type CartItem = {
  productId: string;
  title: string;
  price: number; // Price in cents
  size: string;
  quantity: number;
  image?: string;
  stripePriceId?: string;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "tactus-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === newItem.productId && item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // New item, add to cart
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = useCallback(() => {
    setItems([]);
    // Immediately clear localStorage to prevent re-hydration
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

