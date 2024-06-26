import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotificationContextProvider from "./contexts/Notification/NotificationContextProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
        <ReactQueryDevtools />
    </QueryClientProvider>
);
