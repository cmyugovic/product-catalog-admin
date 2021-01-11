import { call, put, takeLatest, fork } from "redux-saga/effects";
import api from "../../../helpers/api";
import { PRODUCTS } from "../reducer/product.actions";
import { Action } from "redux-actions";
import { Product } from "../model/product.model";

function* getList() {
  yield takeLatest(PRODUCTS.GET_LIST_REQUEST, function* () {
    try {
      const response = yield call(api.get, `/products`);
      yield put({
        type: PRODUCTS.GET_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({ type: PRODUCTS.GET_LIST_FAILURE, error: e });
    }
  });
}

function* get() {
  yield takeLatest(
    PRODUCTS.GET_REQUEST,
    function* ({ payload }: Action<{ productId: string }>) {
      const { productId } = payload;
      try {
        const response = yield call(api.get, `/products/${productId}`);
        yield put({
          type: PRODUCTS.GET_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        yield put({ type: PRODUCTS.GET_FAILURE, error: e });
      }
    }
  );
}

function* create() {
  yield takeLatest(
    PRODUCTS.CREATE_REQUEST,
    function* ({ payload }: Action<{ body: Product }>) {
      try {
        const { body } = payload;
        const response = yield call(api.post, `/products`, body);
        yield put({
          type: PRODUCTS.CREATE_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        yield put({ type: PRODUCTS.CREATE_FAILURE, error: e });
      }
    }
  );
}

function* edit() {
  yield takeLatest(
    PRODUCTS.UPDATE_REQUEST,
    function* ({ payload }: Action<{ body: Product; productId: string }>) {
      try {
        const { productId, body } = payload;
        const response = yield call(api.put, `/products/${productId}`, body);
        yield put({
          type: PRODUCTS.UPDATE_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        yield put({ type: PRODUCTS.UPDATE_FAILURE, error: e });
      }
    }
  );
}

function* deleteItem() {
  yield takeLatest(
    PRODUCTS.DELETE_REQUEST,
    function* ({ payload }: Action<{ productId: string }>) {
      try {
        const { productId } = payload;
        const response = yield call(api.delete, `/products/${productId}`);
        yield put({
          type: PRODUCTS.DELETE_SUCCESS,
          payload: {
            ...response.data,
            id: payload.productId,
          },
        });
      } catch (e) {
        yield put({
          type: PRODUCTS.DELETE_FAILURE,
          error: e,
        });
      }
    }
  );
}

export default function* saga() {
  yield fork(getList);
  yield fork(get);
  yield fork(create);
  yield fork(edit);
  yield fork(deleteItem);
}
