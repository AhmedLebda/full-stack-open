import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./notification/notificationSlice";
import blogsSlice from "./blogs/blogsSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blogs: blogsSlice,
        user: userSlice,
    },
});

export default store;
