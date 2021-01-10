import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import rootSaga from "../sagas/index";
import rootReducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware, createLogger({ collapsed: true })))
);

sagaMiddleware.run(rootSaga);
