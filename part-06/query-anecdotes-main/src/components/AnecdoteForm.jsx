import { useMutation, useQueryClient } from "@tanstack/react-query";
import { anecdote_create } from "../api";
import { useNotification } from "../contexts/Notification/notificationContext";

const AnecdoteForm = () => {
    const [notification, dispatch] = useNotification();

    // Access the query client
    const queryClient = useQueryClient();

    // POST req to create a new anecdote
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdote_create,
        onSuccess: () => {
            queryClient.invalidateQueries(["anecdotes"]);
            dispatch({
                type: "SET_NOTIFICATION",
                payload: "Anecdote created successfully!",
            });
        },
        onError: () =>
            dispatch({
                type: "SET_NOTIFICATION",
                payload:
                    "Too short, Anecdotes must be longer than 5 characters",
            }),
        onSettled: () => {
            setTimeout(() => {
                dispatch({ type: "REMOVE_NOTIFICATION" });
            }, 5000);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        newAnecdoteMutation.mutate({ content });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
