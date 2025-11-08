import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Price } from "@/components/Price";
import { getProductById, getProductIds } from "@/lib/products";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return getProductIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: "Товар не знайдено",
    };
  }

  const description = product.shortDescription ?? product.description;
  const gallery = product.gallery ?? (product.image ? [product.image] : []);

  return {
    title: product.name,
    description: description,
    openGraph: {
      title: product.name,
      description: description,
      images: gallery.map((url) => ({
        url,
        width: 1200,
        height: 630,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: description,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const gallery = product.gallery ?? (product.image ? [product.image] : []);
  const [primaryImage, ...secondaryImages] = gallery;

  return (
    <div className="border-b border-accent-dark/60 bg-white">
      <div className="container grid gap-12 py-12 md:grid-cols-2 md:items-start md:py-16">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[2.5rem] border border-accent-dark/40 bg-accent">
            {primaryImage && (
              <Image
                src={primaryImage}
                alt={product.name}
                width={720}
                height={880}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
          {secondaryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {secondaryImages.map((image) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-3xl border border-accent-dark/40 bg-accent"
                >
                  <Image
                    src={image}
                    alt={`${product.name} detail`}
                    width={340}
                    height={340}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              {product.brand}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <Price amount={product.price} currency={product.currency} />
            </div>
          </div>

            {product.description && (
              <p className="text-base text-slate-600">{product.description}</p>
            )}

            {product.benefits && product.benefits.length > 0 && (
              <div className="space-y-4 rounded-3xl border border-accent-dark/50 bg-accent px-6 py-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Переваги
                </h2>
                <ul className="space-y-2 text-sm text-slate-600">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.usage && (
              <div className="space-y-3 rounded-3xl border border-accent-dark/40 bg-white px-6 py-5 shadow-soft">
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Як використовувати
                </h2>
                <p className="text-sm text-slate-600">{product.usage}</p>
              </div>
            )}

            <a
              href={product.promLink}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-button w-full md:w-auto"
            >
              Купити на Prom.ua
            </a>
        </div>
      </div>
    </div>
  );
}
