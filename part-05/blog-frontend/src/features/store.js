import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./notification/notificationSlice";
import blogsSlice from "./blogs/blogsSlice";

const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blogs: blogsSlice,
    },
});

export default store;
