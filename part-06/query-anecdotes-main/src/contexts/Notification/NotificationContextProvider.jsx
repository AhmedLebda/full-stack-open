import { useReducer } from "react";
import notificationContext from "./notificationContext";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload;
        case "REMOVE_NOTIFICATION":
            return null;
        default:
            return state;
    }
};

const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null);
    return (
        <notificationContext.Provider value={[notification, dispatch]}>
            {children}
        </notificationContext.Provider>
    );
};

export default NotificationContextProvider;
