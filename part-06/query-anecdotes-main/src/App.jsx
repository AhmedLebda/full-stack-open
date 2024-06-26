import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { anecdotes_list, anecdote_update } from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
    const queryClient = useQueryClient();

    // Update vote mutation
    const voteMutation = useMutation({
        mutationFn: anecdote_update,
        onSuccess: () => {
            queryClient.invalidateQueries(["anecdotes"]);
        },
    });

    const handleVote = (anecdote) => {
        voteMutation.mutate(anecdote);
    };

    // Request anecdotes
    const anecdotes = useQuery({
        queryKey: ["anecdotes"],
        queryFn: anecdotes_list,
        retry: false,
    });

    // handle loading state
    if (anecdotes.isLoading) {
        return <h1>Loading...</h1>;
    }

    // handle error state
    if (anecdotes.isError) {
        return <pre>{anecdotes.error.message}</pre>;
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.data.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
