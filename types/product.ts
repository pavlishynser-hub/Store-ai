export type Product = {
  id: string;
  name: string;
  price: number;
  currency?: string;
  image: string;
  promLink: string;
  brand?: string;
  shortDescription?: string;
  description?: string;
  benefits?: string[];
  usage?: string;
  gallery?: string[];
  isFeatured?: boolean;
};
