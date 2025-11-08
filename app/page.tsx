import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Price } from "@/components/Price";
import { getFeaturedProducts, getProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getProducts();
  const heroProduct = featuredProducts[0];
  const supportingProducts = featuredProducts.slice(1);

  return (
    <>
      {heroProduct && (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-accent to-white">
          <div className="container grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-24">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-black text-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
                New Arrival
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                Barrier-strength skincare for luminous, resilient skin.
              </h1>
              <p className="max-w-lg text-lg text-slate-500">
                Indulge in cosmeceutical formulas from Allies of Skin and Medik8.
                Build an effortless ritual curated for glow, balance, and calm.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <AddToCartButton product={heroProduct} className="px-6" />
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-dark px-5 py-2.5 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-accent"
                >
                  Explore the collection
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-accent-dark/50 bg-white/60 p-4 backdrop-blur">
                <div className="shrink-0">
                  <Image
                    src={heroProduct.images[0]}
                    alt={heroProduct.name}
                    width={80}
                    height={80}
                    className="rounded-2xl object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                    Hero Treatment
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    {heroProduct.name}
                  </p>
                  <Price amount={heroProduct.price} currency={heroProduct.currency} />
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-12 hidden rounded-full bg-accent/60 blur-3xl md:block" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-accent-dark/40 bg-white shadow-soft">
                <Image
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {supportingProducts.length > 0 && (
        <ProductGrid
          products={supportingProducts}
          title="Featured Treatments"
          subtitle="Clinically proven actives to elevate your daily ritual."
        />
      )}

      <ProductGrid
        products={allProducts}
        title="Shop the edit"
        subtitle="Meticulously formulated skincare, selected for performance and pleasure."
      />
    </>
  );
}
