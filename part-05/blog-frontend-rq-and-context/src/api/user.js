const baseUrl = "./api/users";

const getUsers = async (token) => {
    const response = await fetch(baseUrl, {
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

export default { getUsers };
