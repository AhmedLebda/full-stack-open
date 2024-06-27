import { useParams } from "react-router-dom";

const AnecdoteDetails = ({ anecdotes }) => {
    const { id } = useParams();

    const anecdote = anecdotes.find((a) => a.id === +id);

    return (
        <div>
            <h1>{anecdote.author}</h1>
            <a href="#">{anecdote.info}</a>
            <p>{anecdote.content}</p>
            <p>votes: {anecdote.votes}</p>
        </div>
    );
};

export default AnecdoteDetails;
