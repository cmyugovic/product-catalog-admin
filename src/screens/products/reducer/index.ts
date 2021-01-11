import { handleActions, Action } from "redux-actions";
import { PRODUCTS } from "./product.actions";
import { ProductState } from "../model/product.state";
import { Product } from "../model/product.model";
export { PRODUCTS } from "./product.actions";

const initialState: ProductState = {
  list: [],
  selected: undefined,
  initialLoading: false,
  actionLoading: false,
  shouldRedirect: false,
};

export default handleActions<ProductState, any>(
  {
    [PRODUCTS.GET_LIST_REQUEST]: (state): ProductState => ({
      ...state,
      list: [],
      initialLoading: true,
      shouldRedirect: false,
    }),
    [PRODUCTS.GET_LIST_SUCCESS]: (
      state,
      { payload }: Action<Product[]>
    ): ProductState => ({
      ...state,
      list: payload,
      initialLoading: false,
    }),
    [PRODUCTS.GET_LIST_FAILURE]: (state): ProductState => ({
      ...state,
      list: [],
      initialLoading: false,
    }),
    [PRODUCTS.GET_REQUEST]: (state): ProductState => ({
      ...state,
      selected: undefined,
      initialLoading: true,
    }),
    [PRODUCTS.GET_SUCCESS]: (
      state,
      { payload }: Action<Product>
    ): ProductState => ({
      ...state,
      selected: payload,
      initialLoading: false,
    }),
    [PRODUCTS.GET_FAILURE]: (state, { error }): ProductState => ({
      ...state,
      selected: undefined,
      initialLoading: false,
    }),
    [PRODUCTS.CREATE_REQUEST]: (state): ProductState => ({
      ...state,
      actionLoading: true,
    }),
    [PRODUCTS.CREATE_SUCCESS]: (state, { payload }): ProductState => ({
      ...state,
      actionLoading: false,
      shouldRedirect: true,
    }),
    [PRODUCTS.CREATE_FAILURE]: (state, { error }): ProductState => ({
      ...state,
      actionLoading: false,
    }),
    [PRODUCTS.UPDATE_REQUEST]: (state): ProductState => ({
      ...state,
      actionLoading: true,
    }),
    [PRODUCTS.UPDATE_SUCCESS]: (
      state,
      { payload }: Action<Product>
    ): ProductState => ({
      ...state,
      actionLoading: false,
      selected: payload,
      shouldRedirect: true,
    }),
    [PRODUCTS.UPDATE_FAILURE]: (state): ProductState => ({
      ...state,
      actionLoading: false,
    }),
    [PRODUCTS.DELETE_REQUEST]: (state): ProductState => ({
      ...state,
      actionLoading: true,
    }),
    [PRODUCTS.DELETE_SUCCESS]: (
      state,
      { payload }: Action<Product>
    ): ProductState => ({
      ...state,
      actionLoading: false,
      list: state.list.filter((e) => e._id !== payload._id),
    }),
    [PRODUCTS.DELETE_FAILURE]: (state): ProductState => ({
      ...state,
      actionLoading: false,
    }),
  },
  initialState
);
