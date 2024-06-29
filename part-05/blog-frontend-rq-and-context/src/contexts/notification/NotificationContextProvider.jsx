import notificationContext from "./notificationContext";
import { useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "notification/setNotification":
            return action.payload;
        case "notification/removeNotification":
            return null;
        default:
            return state;
    }
};

const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null);
    return (
        <notificationContext.Provider value={{ notification, dispatch }}>
            {children}
        </notificationContext.Provider>
    );
};

export default NotificationContextProvider;
