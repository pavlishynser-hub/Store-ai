import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Price } from "./Price";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const previewImage = product.image;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-accent-dark/60 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/products/${product.id}`}
        className="group relative block aspect-[4/5] overflow-hidden bg-accent"
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 80vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {product.brand && (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-soft backdrop-blur">
            {product.brand}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-primary">
            <Link href={`/products/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
            <p className="mt-1 text-sm text-slate-500">
              {product.shortDescription ?? product.description}
            </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <Price amount={product.price} currency={product.currency} />
          </div>
          <a
            href={product.promLink}
            target="_blank"
            rel="noopener noreferrer"
            className="buy-button"
          >
            Купити на Prom.ua
          </a>
        </div>
      </div>
    </article>
  );
}
