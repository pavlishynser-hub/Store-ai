import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Каталог косметики Aurora Beauty",
  description:
    "Весь асортимент професійної доглядової косметики Aurora Beauty з доставкою по Україні та оформленням на Prom.ua.",
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <>
      <section className="border-b border-accent-dark/60 bg-white">
        <div className="container flex flex-col gap-4 py-12 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Каталог
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              Знайдіть засіб під потребу вашої шкіри.
            </h1>
            <p className="max-w-xl text-base text-slate-500">
              Обирайте сироватки, креми та концентрати з перевіреним складом і
              оформлюйте замовлення безпосередньо на Prom.ua.
            </p>
          </div>
          <Link
            href="#prom-guide"
            className="inline-flex items-center justify-center rounded-full border border-accent-dark px-5 py-2.5 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-accent"
          >
            Як оформити замовлення
          </Link>
        </div>
      </section>

      <ProductGrid
        products={products}
        title="Уся косметика"
        subtitle="Бестселери та новинки, які можна придбати на Prom.ua в один клік."
      />
    </>
  );
}
