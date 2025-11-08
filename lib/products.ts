import productsData from "@/data/products.json";
import { Product } from "@/types/product";

const products = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductIds(): string[] {
  return products.map((product) => product.id);
}
