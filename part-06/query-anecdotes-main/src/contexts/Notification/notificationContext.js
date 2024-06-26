import { createContext, useContext } from "react";

const notificationContext = createContext();

export const useNotification = () => {
    const context = useContext(notificationContext);

    if (!context) {
        throw Error(
            "useNotification hook must be used inside a NotificationContextProvider"
        );
    }

    return context;
};

export default notificationContext;
