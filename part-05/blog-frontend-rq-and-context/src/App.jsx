// Context
import NotificationContextProvider from "./contexts/notification/NotificationContextProvider.jsx";
import UserContextProvider from "./contexts/user/UserContextProvider.jsx";
// React Query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// React Router
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <NotificationContextProvider>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools />
                </NotificationContextProvider>
            </UserContextProvider>
        </QueryClientProvider>
    );
};

export default App;
