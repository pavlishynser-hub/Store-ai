'use client';

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types/product";

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  size: string;
  image: string | null;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const storage =
  typeof window !== "undefined"
    ? createJSONStorage<Pick<CartState, "items">>(() => localStorage)
    : undefined;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            quantity,
            size: product.size,
            image: product.images[0] ?? null,
          };

          return { items: [...state.items, newItem] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "cosmetic-store-cart",
      storage,
      partialize: (state) => ({ items: state.items }),
      version: 1,
    },
  ),
);

export const cartSelectors = {
  items: (state: CartState) => state.items,
  itemCount: (state: CartState) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  total: (state: CartState) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0),
};
