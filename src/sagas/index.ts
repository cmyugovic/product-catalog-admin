import { all } from "redux-saga/effects";
import products from "../screens/products/saga";

export default function* rootSaga() {
  yield all([products()]);
}
