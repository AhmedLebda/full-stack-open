import { useMutation, useQueryClient } from "@tanstack/react-query";
import { anecdote_create } from "../api";

const AnecdoteForm = () => {
    // Access the query client
    const queryClient = useQueryClient();

    // POST req to create a new anecdote
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdote_create,
        onSuccess: () => queryClient.invalidateQueries(["anecdotes"]),
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
