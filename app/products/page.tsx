import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse curated Allies of Skin and Medik8 essentials. Discover hydrating serums, retinal treatments, and barrier balms for luminous skin.",
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <>
      <section className="border-b border-accent-dark/60 bg-white">
        <div className="container flex flex-col gap-4 py-12 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Cosmetic Edit
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              High-performance skincare for modern routines.
            </h1>
            <p className="max-w-xl text-base text-slate-500">
              Elevated actives that deliver transformative results without
              compromising on sensorial pleasure. Filter-free glow starts here.
            </p>
          </div>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-full border border-accent-dark px-5 py-2.5 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-accent"
          >
            Secure checkout
          </Link>
        </div>
      </section>

      <ProductGrid
        products={products}
        title="Allies of Skin × Medik8"
        subtitle="Thoughtfully balanced regimens to restore radiance, protection, and calm."
      />
    </>
  );
}
