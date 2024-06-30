import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Context
import NotificationContextProvider from "./contexts/notification/NotificationContextProvider.jsx";
import UserContextProvider from "./contexts/user/UserContextProvider.jsx";
// React Query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <NotificationContextProvider>
                    <App />
                </NotificationContextProvider>
            </UserContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
