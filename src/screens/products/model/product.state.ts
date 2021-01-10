import { Product } from "./product.model";

export type ProductState = {
  list: Product[];
  selected: Product;
  loading: boolean;
};
