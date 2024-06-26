import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    const handleNoteAdd = async (e) => {
        e.preventDefault();

        dispatch(createAnecdote(note));

        setNote("");

        dispatch(setNotification("Note created successfully!"));
    };
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleNoteAdd}>
                <div>
                    <input
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        name="note"
                    />
                </div>
                <button>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
