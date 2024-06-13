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

export default { getAllBlogs };
