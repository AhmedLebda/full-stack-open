import useNotification from "../contexts/notification/useNotification";

const Notification = () => {
    const { notification } = useNotification();
    return (
        <p
            className={`${
                notification?.type === "success"
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
            } capitalize font-bold p-2 rounded-lg text-center`}
        >
            {notification.msg}
        </p>
    );
};

export default Notification;
