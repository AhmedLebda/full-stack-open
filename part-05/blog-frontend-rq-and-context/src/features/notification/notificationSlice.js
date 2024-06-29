import { createSlice } from "@reduxjs/toolkit";
import { sleep } from "../../utils";
const initialState = null;

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload;
        },
        removeNotification: () => {
            return null;
        },
    },
});

// Thunks
export const showNotification = (type, msg, duration) => async (dispatch) => {
    dispatch(setNotification({ type, msg }));
    await sleep(duration);
    dispatch(removeNotification());
};

export default notificationSlice.reducer;
export const { setNotification, removeNotification } =
    notificationSlice.actions;
