export const setUser = (payload) => {
    return { type: "user/setUser", payload };
};

export const removeUser = () => {
    return { type: "user/removeUser" };
};
