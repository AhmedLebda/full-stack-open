import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
    setNotification,
    removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const anecdotesToRender = anecdotes
        .filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes);

    const handleVote = async (id) => {
        console.log("vote", id);

        const anecdote = anecdotes.find((a) => a.id === id);

        const response = await fetch(`http://localhost:3001/anecdotes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ votes: anecdote.votes + 1 }),
        });
        const updatedAnecdote = await response.json();

        dispatch(vote(updatedAnecdote.id));
        dispatch(setNotification("You voted!"));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 2000);
    };

    return (
        <div>
            {anecdotesToRender.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
