import React from "react";
import toastr from "toastr";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppWrapper from "./AppWrapper"; // Import the AppWrapper instead of App
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'toastr/build/toastr.min.css';

toastr.options = {
  positionClass: "toast-top-right",
  preventDuplicates: true,
  closeButton: true,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>
);
