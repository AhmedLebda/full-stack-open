import { createSlice } from "@reduxjs/toolkit";
import blogApi from "../../api/blog";

let initialState = [];

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        appendBlog: (state, action) => {
            const blog = action.payload;
            state.push(blog);
        },
        setBlogs: (state, action) => {
            const blogs = action.payload;
            return blogs;
        },
        removeBlog: (state, action) => {
            const deletedBlog = action.payload;
            return state.filter((blog) => blog.id !== deletedBlog.id);
        },
        updateBlog: (state, action) => {
            const updatedBlog = action.payload;
            return state.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            );
        },
    },
});

// Thunks

export const initializeBlogs = (accessToken) => async (dispatch) => {
    const blogsData = await blogApi.getAllBlogs(accessToken);
    dispatch(setBlogs(blogsData));
};

export const createBlog = (accessToken, blog) => async (dispatch) => {
    const createdBlog = await blogApi.createBlog(accessToken, blog);
    dispatch(appendBlog(createdBlog));
};

export const likeBlog = (accessToken, blog) => async (dispatch) => {
    const updatedBlog = await blogApi.likeBlog(accessToken, blog);
    dispatch(updateBlog(updatedBlog));
};

export const deleteBlog = (accessToken, blogId) => async (dispatch) => {
    const deletedBlog = await blogApi.deleteBlog(accessToken, blogId);
    dispatch(removeBlog(deletedBlog));
};

export default blogsSlice.reducer;
export const { appendBlog, setBlogs, removeBlog, updateBlog } =
    blogsSlice.actions;
