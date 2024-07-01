import { useState } from "react";
// Components
import OptionButton from "../../components/OptionButton";
// Contexts
import useNotification from "../../contexts/notification/useNotification";
import useUser from "../../contexts/user/useUser";
// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API
import BlogApi from "../../api/blog";

const CreateBlogForm = ({ toggleIsCreate }) => {
    // Create form state
    const [createBlogData, setCreateBlogData] = useState({
        title: "",
        url: "",
    });

    // context: use show notification function from custom hook
    const { showNotification } = useNotification();
    const userActions = useUser();
    const accessToken = userActions.getAccessToken();

    // React Query: Mutations
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: ({ token, blogData }) =>
            BlogApi.createBlog(token, blogData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            showNotification("success", "Blog Created");
        },
        onError: (e) => {
            console.log(e.message);
            showNotification("error", e.message);
        },
    });

    // Event Handlers
    const handleChange = (e) => {
        setCreateBlogData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleBlogCreate = async (e) => {
        e.preventDefault();
        createMutation.mutate({ token: accessToken, blogData: createBlogData });
        toggleIsCreate();
    };

    return (
        <form
            className=" mb-6 pb-6 border-b-2 text-center"
            onSubmit={handleBlogCreate}
        >
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
