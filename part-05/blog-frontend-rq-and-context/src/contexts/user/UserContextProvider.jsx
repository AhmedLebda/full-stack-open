import { useReducer } from "react";
import userContext from "./userContext";

const userReducer = (state, action) => {
    switch (action.type) {
        case "user/setUser":
            return action.payload;
        case "user/removeUser":
            return null;
        default:
            return state;
    }
};

const userContextProvider = ({ children }) => {
    const initialState = JSON.parse(localStorage.getItem("user")) || null;
    const [user, dispatch] = useReducer(userReducer, initialState);
    return (
        <userContext.Provider value={{ user, dispatch }}>
            {children}
        </userContext.Provider>
    );
};

export default userContextProvider;
