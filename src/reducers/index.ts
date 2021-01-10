import { combineReducers } from "redux";
import products from "../screens/products/reducer/index";

const appReducer = combineReducers({
  products,
});

export default appReducer;
