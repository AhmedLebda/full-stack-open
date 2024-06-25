import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    );
    const dispatch = useDispatch();

    const anecdotesToRender = [...anecdotes].sort((a, b) => b.votes - a.votes);

    const handleVote = (id) => {
        console.log("vote", id);
        dispatch(vote(id));
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
