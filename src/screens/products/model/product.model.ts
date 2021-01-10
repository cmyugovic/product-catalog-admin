export type Product = {
  id: string;
  name: string;
  description: string;
};

export type ProductState = {
  list: Product[];
  selected: Product;
  loading: boolean;
};
