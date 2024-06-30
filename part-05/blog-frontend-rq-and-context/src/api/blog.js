const baseUrl = "./api";

const getAllBlogs = async (token) => {
    const response = await fetch(`${baseUrl}/blogs`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(data.error);
    }

    return data;
};

const createBlog = async (token, blogData) => {
    const response = await fetch(`${baseUrl}/blogs`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(data.error);
    }

    return data;
};

const likeBlog = async (token, blog) => {
    const { id } = blog;
    const response = await fetch(`${baseUrl}/blogs/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(data.error);
    }

    return data;
};

const deleteBlog = async (token, blogId) => {
    const response = await fetch(`${baseUrl}/blogs/${blogId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(data.error);
    }

    return data;
};

export default { getAllBlogs, createBlog, likeBlog, deleteBlog };
