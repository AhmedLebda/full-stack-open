import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./notification/notificationSlice";
const store = configureStore({
    reducer: {
        notification: notificationSlice,
    },
});

export default store;
