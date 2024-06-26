// Get all anecdotes function
export const anecdotes_list = async () => {
    try {
        const res = await fetch("http://localhost:3001/anecdotes");
        if (!res.ok) {
            throw Error(
                "anecdote service not available due to problems in server"
            );
        }
        return res.json();
    } catch (error) {
        throw Error(error);
    }
};

// Create new anecdote function
export const anecdote_create = async (note) => {
    try {
        const res = await fetch("http://localhost:3001/anecdotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
        if (!res.ok) {
            throw Error(
                "anecdote service not available due to problems in server"
            );
        }
        return res.json();
    } catch (error) {
        throw Error(error);
    }
};

// Create new anecdote function
export const anecdote_update = async (anecdote) => {
    const { id } = anecdote;
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    try {
        const res = await fetch(`http://localhost:3001/anecdotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAnecdote),
        });
        if (!res.ok) {
            throw Error(
                "anecdote service not available due to problems in server"
            );
        }
        return res.json();
    } catch (error) {
        throw Error(error);
    }
};
