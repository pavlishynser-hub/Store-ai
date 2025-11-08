'use client';

import Link from "next/link";
import { cartSelectors, useCartStore } from "@/store/cart-store";

export function CartLink({ className = "" }: { className?: string }) {
  const itemCount = useCartStore(cartSelectors.itemCount);

  return (
    <Link
      href="/cart"
      className={`group inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-primary shadow-soft transition hover:-translate-y-0.5 hover:border-accent-dark ${className}`}
    >
      <span>Cart</span>
      <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-primary text-xs font-semibold text-white transition group-hover:bg-primary-soft">
        {itemCount}
      </span>
    </Link>
  );
}
