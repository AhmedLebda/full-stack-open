const baseUrl = "./api";

const login = async (username, password) => {
    const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw Error(data.error);
    }

    return data;
};

export default { login };
