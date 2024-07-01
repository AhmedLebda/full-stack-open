export const setNotification = (payload) => {
    return { type: "notification/setNotification", payload };
};

export const removeNotification = () => {
    return { type: "notification/removeNotification" };
};
