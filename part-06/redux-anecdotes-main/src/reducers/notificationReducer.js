import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        startNotification(state, action) {
            console.log(action);
            return action.payload;
        },

        endNotification() {
            return null;
        },
    },
});

let timeoutId = null;

export const setNotification =
    (message, timeout = 2) =>
    (dispatch) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        dispatch(startNotification(message));

        timeoutId = setTimeout(() => {
            dispatch(endNotification());
        }, timeout * 1000);
    };

export default notificationSlice.reducer;
export const { startNotification, endNotification } = notificationSlice.actions;
