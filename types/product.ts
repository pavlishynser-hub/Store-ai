export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  currency: string;
  size: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  usage: string;
  images: string[];
  isFeatured: boolean;
};

export type ProductWithQuantity = Product & {
  quantity: number;
};
