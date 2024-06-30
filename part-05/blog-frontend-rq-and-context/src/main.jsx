import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Redux
import { Provider } from "react-redux";
import store from "./features/store.js";
// Context
import NotificationContextProvider from "./contexts/notification/NotificationContextProvider.jsx";
// React Query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <NotificationContextProvider>
                    <App />
                </NotificationContextProvider>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
