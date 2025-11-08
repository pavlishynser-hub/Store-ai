'use client';

import Image from "next/image";
import Link from "next/link";
import { cartSelectors, useCartStore } from "@/store/cart-store";
import { Price } from "./Price";

export function CartContent() {
  const items = useCartStore(cartSelectors.items);
  const total = useCartStore(cartSelectors.total);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-accent-dark/60 bg-white px-10 py-16 text-center shadow-soft">
        <p className="text-lg font-semibold text-primary">
          Your cart is currently empty.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Explore our curated collection and add your new ritual to cart.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center rounded-full border border-accent-dark px-5 py-2.5 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-accent"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-3xl border border-accent-dark/60 bg-white p-8 shadow-soft">
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-4 border-b border-accent-dark/40 pb-6 last:border-none last:pb-0">
            <div className="flex items-start gap-4">
              <div className="relative h-28 w-28 overflow-hidden rounded-3xl bg-accent">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {item.brand}
                    </p>
                    <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                  </div>
                  <Price amount={item.price * item.quantity} />
                </div>
                <p className="text-xs text-slate-400">Size: {item.size}</p>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1 rounded-full border border-accent-dark/60 bg-accent px-3 py-1 text-sm font-medium text-primary">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-full text-center text-base leading-none transition hover:bg-white"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      –
                    </button>
                    <span className="min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-full text-center text-base leading-none transition hover:bg-white"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-slate-500 transition hover:text-primary"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 rounded-2xl border border-accent-dark/40 bg-accent px-6 py-5">
        <div className="flex items-center justify-between text-sm font-medium text-primary">
          <span>Subtotal</span>
          <Price amount={total} />
        </div>
        <p className="text-xs text-slate-500">
          Taxes and shipping will be calculated at checkout. Stripe sandbox enabled
          — use test cards only.
        </p>
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-soft"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
