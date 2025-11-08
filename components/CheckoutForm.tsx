'use client';

import { FormEvent, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { cartSelectors, useCartStore } from "@/store/cart-store";
import { Price } from "./Price";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const isStripeConfigured = Boolean(publishableKey);

export function CheckoutForm() {
  const items = useCartStore(cartSelectors.items);
  const total = useCartStore(cartSelectors.total);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) {
      setErrorMessage("Your cart is empty. Add products before checking out.");
      return;
    }

    if (!isStripeConfigured) {
      setErrorMessage(
        "Stripe publishable key is missing. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment.",
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email || undefined,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error ?? "Unable to initialise checkout.");
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(publishableKey);
      if (!stripe) {
        throw new Error("Unable to load Stripe. Check your publishable key.");
      }

      const checkout = stripe as unknown as {
        redirectToCheckout: (options: {
          sessionId: string;
        }) => Promise<{ error?: { message?: string } }>;
      };

      const redirectResult = await checkout.redirectToCheckout({
        sessionId,
      });

      if (redirectResult.error) {
        throw redirectResult.error;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while redirecting to Stripe.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-accent-dark/60 bg-white p-8 shadow-soft">
      <div>
        <h2 className="text-lg font-semibold text-primary">Order summary</h2>
        <p className="text-sm text-slate-500">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your bag.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-accent-dark/40 bg-accent px-5 py-4">
        <div className="flex items-center justify-between text-sm text-primary">
          <span>Subtotal</span>
          <Price amount={total} />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Tax</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-primary"
          >
            Contact email (optional)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-accent-dark/60 bg-white px-4 py-3 text-sm text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
          <p className="text-xs text-slate-400">
            We will send the order confirmation to this email address.
          </p>
        </div>

        {errorMessage && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={!items.length || isLoading}
          className="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-soft disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "Redirecting..." : "Proceed with Stripe"}
        </button>

        {!isStripeConfigured && (
          <p className="text-xs text-red-500">
            Add your Stripe publishable key to NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            to enable live redirect.
          </p>
        )}
      </form>
    </div>
  );
}
