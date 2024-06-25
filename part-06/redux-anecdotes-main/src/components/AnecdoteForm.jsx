import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../reducers/anecdoteReducer";
import {
    setNotification,
    removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    const handleNoteAdd = (e) => {
        e.preventDefault();

        dispatch(addNote(note));
        setNote("");
        dispatch(setNotification("Note created successfully!"));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 2000);
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
