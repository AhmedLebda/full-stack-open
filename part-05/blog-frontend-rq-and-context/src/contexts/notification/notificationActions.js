const setNotification = (payload) => {
    return { type: "notification/setNotification", payload };
};

const removeNotification = () => {
    return { type: "notification/removeNotification" };
};

export default { setNotification, removeNotification };
