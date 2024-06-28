import { createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../api/auth";

let initialState = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        },
    },
});

export const login = (username, password) => async (dispatch) => {
    const userData = await AuthApi.login(username, password);
    dispatch(setUser(userData));
    localStorage.setItem("user", JSON.stringify(userData));
};

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
