import { Product } from "./product.model";

export type ProductState = {
  list: Product[];
  selected?: Product;
  initialLoading: boolean;
  actionLoading: boolean;
  shouldRedirect: boolean;
};
