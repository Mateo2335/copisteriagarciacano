"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface PrintConfig {
  paperSize: "A4" | "A3";
  colorMode: "Color" | "Blanco y Negro";
  sides: "Una cara" | "Doble cara";
  binding: "Sin encuadernar" | "Espiral" | "Grapado";
  pages: number;
}

export interface ApparelConfig {
  size: "S" | "M" | "L" | "XL";
  color: string;
  customText?: string;
  imageFile?: string;
}

export interface MugConfig {
  innerColor: string;
  customText?: string;
  imageFile?: string;
}

export interface PhotoConfig {
  photoSize: "10x15 cm" | "13x18 cm" | "A4 (21x30 cm)";
  finish: "Brillo" | "Mate";
}

export interface ArticleConfig {
  category: string;
  variant?: string;
}

export interface CartItem {
  id: string;
  type: "documento" | "camiseta" | "taza" | "foto" | "articulo";
  name: string; // e.g. "Impresión de Documentos", "Camiseta Personalizada"
  quantity: number;
  unitPrice: number;
  config: {
    print?: PrintConfig;
    apparel?: ApparelConfig;
    mug?: MugConfig;
    photo?: PhotoConfig;
    article?: ArticleConfig;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("copisteria_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("copisteria_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    setCart((prevCart) => {
      // For simplicity, generate unique IDs for each added item configuration
      // Instead of grouping by config, unique IDs allow easier identification of distinct custom designs
      const itemWithId: CartItem = {
        ...newItem,
        id: `${newItem.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      return [...prevCart, itemWithId];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
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
