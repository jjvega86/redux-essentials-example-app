import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";

import { worker } from "./api/server";
import { apiSlice } from "./features/api/apiSlice";

// Start our mock API server
worker.start({ onUnhandledRequest: "bypass" });

// Fetch users as soon as the application starts
store.dispatch(apiSlice.endpoints.getUsers.initiate());
console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
