import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import reducerISS from "./store/reducerISS";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga/saga";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ reducerISS });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Provider>,
  document.getElementById("root")
);
