import notificationContext from "./notificationContext";
import { useContext } from "react";
import { setNotification, removeNotification } from "./notificationActions";
import { sleep } from "../../utils";

const useNotification = () => {
    const context = useContext(notificationContext);

    if (!context) {
        throw Error(
            "useNotification must be used inside a notificationContextProvider"
        );
    }

    const { notification, dispatch } = context;

    const showNotification = async (type, msg, duration) => {
        dispatch(setNotification({ type, msg }));
        await sleep(duration);
        dispatch(removeNotification());
    };

    return { notification, showNotification };
};

export default useNotification;
