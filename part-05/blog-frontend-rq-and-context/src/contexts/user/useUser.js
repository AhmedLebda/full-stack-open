import { useContext } from "react";
import userContext from "./userContext";
import { setUser, removeUser } from "./userActions";
// API
import AuthApi from "../../api/auth";

const useUser = () => {
    const context = useContext(userContext);

    if (!context)
        throw Error("useUser hook must be used inside a userContextProvider");

    const { user, dispatch } = context;

    const userActions = {
        login: async (username, password) => {
            const userData = await AuthApi.login(username, password);
            dispatch(setUser(userData));
            localStorage.setItem("user", JSON.stringify(userData));
        },
        logout: () => {
            dispatch(removeUser());
            localStorage.removeItem("user");
        },
        getAccessToken: () => user?.access_token,
        getName: () => user?.name,
        getUsername: () => user?.username,
        getUserId: () => user?.id,
    };

    return userActions;
};

export default useUser;
