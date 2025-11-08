'use client';

import { useState, useTransition } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
  variant?: "primary" | "ghost";
};

export function AddToCartButton({
  product,
  className = "",
  variant = "primary",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (isPending) return;

    startTransition(() => {
      addItem(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1400);
    });
  };

  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/80";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-soft shadow-soft hover:-translate-y-0.5",
    ghost:
      "bg-white text-primary hover:bg-accent hover:text-primary-soft border border-accent-dark",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      aria-label={`Add ${product.name} to cart`}
      disabled={isPending}
    >
      {isPending ? "Adding..." : isAdded ? "Added!" : "Add to cart"}
    </button>
  );
}
