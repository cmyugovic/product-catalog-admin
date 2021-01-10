import { handleActions, Action } from "redux-actions";
import { PRODUCTS } from "./product.actions";
import { ProductState } from "../model/product.state";
import { Product } from "../model/product.model";
export { PRODUCTS } from "./product.actions";

const initialState: ProductState = {
  list: [],
  selected: {} as Product,
  loading: false,
};

export default handleActions<ProductState, any>(
  {
    [PRODUCTS.GET_LIST_REQUEST]: (state): ProductState => {
      return {
        ...state,
        list: [],
        loading: true,
      };
    },
    [PRODUCTS.GET_LIST_SUCCESS]: (
      state,
      { payload }: Action<Product[]>
    ): ProductState => ({
      ...state,
      list: payload,
      loading: false,
    }),
    [PRODUCTS.GET_LIST_FAILURE]: (state): ProductState => {
      return {
        ...state,
        list: [],
        loading: false,
      };
    },
    [PRODUCTS.GET_REQUEST]: (state): ProductState => ({
      ...state,
      selected: {} as Product,
      loading: true,
    }),
    [PRODUCTS.GET_SUCCESS]: (
      state,
      { payload }: Action<Product>
    ): ProductState => ({
      ...state,
      selected: payload,
      loading: false,
    }),
    [PRODUCTS.GET_FAILURE]: (state, { error }): ProductState => ({
      ...state,
      selected: {} as Product,
      loading: false,
    }),
    [PRODUCTS.CREATE_REQUEST]: (state): ProductState => ({
      ...state,
      loading: true,
    }),
    [PRODUCTS.CREATE_SUCCESS]: (state, { payload }): ProductState => ({
      ...state,
      loading: false,
    }),
    [PRODUCTS.CREATE_FAILURE]: (state, { error }): ProductState => ({
      ...state,
      loading: false,
    }),
    [PRODUCTS.UPDATE_REQUEST]: (state): ProductState => ({
      ...state,
      loading: true,
    }),
    [PRODUCTS.UPDATE_SUCCESS]: (
      state,
      { payload }: Action<Product>
    ): ProductState => ({
      ...state,
      loading: false,
      selected: payload,
    }),
    [PRODUCTS.UPDATE_FAILURE]: (state): ProductState => ({
      ...state,
      loading: false,
    }),
  },
  initialState
);
