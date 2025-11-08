import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  title?: string;
  subtitle?: string;
};

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="container space-y-6 py-12 md:py-16">
      {title && (
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-slate-500 md:text-lg">{subtitle}</p>
          )}
        </div>
      )}
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
