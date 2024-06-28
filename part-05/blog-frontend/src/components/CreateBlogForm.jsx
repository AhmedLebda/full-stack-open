import OptionButton from "./OptionButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Action creators
import { createBlog } from "../features/blogs/blogsSlice";
import { showNotification } from "../features/notification/notificationSlice";

const CreateBlogForm = ({ toggleIsCreate }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user?.access_token);
    const [createBlogData, setCreateBlogData] = useState({
        title: "",
        url: "",
    });

    const handleChange = (e) => {
        setCreateBlogData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleBlogCreate = async (e) => {
        e.preventDefault();

        try {
            await dispatch(createBlog(accessToken, createBlogData));
            dispatch(showNotification("success", "A new blog has been added"));
            toggleIsCreate();
        } catch (error) {
            dispatch(showNotification("error", error.message));
        }
    };

    return (
        <form className=" mb-6 pb-6 border-b-2 " onSubmit={handleBlogCreate}>
            <h1 className="italic font-serif font-bold text-4xl text-blue-900 p-4">
                Create a blog:
            </h1>

            <div className="p-4 capitalize">
                <label htmlFor="title">Title:</label>
                <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    className="border ml-4 px-2"
                    value={createBlogData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="p-4 capitalize">
                <label htmlFor="url">URL:</label>
                <input
                    required
                    type="text"
                    name="url"
                    id="url"
                    className="border ml-4 px-2"
                    value={createBlogData.url}
                    onChange={handleChange}
                />
            </div>

            <div className="p-4">
                <OptionButton text="Create" />
            </div>
        </form>
    );
};

export default CreateBlogForm;
