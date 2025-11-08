import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your order securely with Stripe test mode. Enter your email to receive confirmation.",
};

export default function CheckoutPage() {
  return (
    <section className="border-b border-accent-dark/60 bg-white">
      <div className="container grid gap-12 py-12 md:grid-cols-[minmax(320px,1fr)_minmax(320px,420px)] md:items-start md:py-16">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Secure checkout
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              Glow is a tap away.
            </h1>
            <p className="max-w-xl text-base text-slate-500">
              Stripe test mode is enabled—use a test card like{" "}
              <code className="rounded-md bg-accent px-2 py-1 text-xs text-primary">
                4242 4242 4242 4242
              </code>{" "}
              with any future expiration date and CVC. Orders are not fulfilled.
            </p>
          </div>
          <div className="rounded-3xl border border-accent-dark/60 bg-white px-6 py-5 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Need to adjust your cart?
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Head back to your cart to review quantities or remove items before
              finalising your order.
            </p>
            <Link
              href="/cart"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-dark px-4 py-2 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-accent"
            >
              Return to cart
            </Link>
          </div>
        </div>
        <CheckoutForm />
      </div>
    </section>
  );
}
