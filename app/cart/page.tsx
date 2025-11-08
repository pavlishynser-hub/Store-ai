import type { Metadata } from "next";
import { CartContent } from "@/components/CartContent";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your curated Allies of Skin and Medik8 selections before completing checkout.",
};

export default function CartPage() {
  return (
    <section className="border-b border-accent-dark/60 bg-white">
      <div className="container flex flex-col gap-8 py-12 md:grid md:grid-cols-[1fr_minmax(320px,420px)] md:items-start md:gap-12 md:py-16">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Curated Ritual
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Your cart, your glow.
          </h1>
          <p className="max-w-xl text-base text-slate-500">
            Double-check quantities and product pairings. You can adjust or remove
            items before heading to our secure Stripe-powered checkout.
          </p>
        </div>
        <CartContent />
      </div>
    </section>
  );
}
