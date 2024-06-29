import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./features/store.js";
import NotificationContextProvider from "./contexts/notification/NotificationContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <NotificationContextProvider>
                <App />
            </NotificationContextProvider>
        </Provider>
    </React.StrictMode>
);
