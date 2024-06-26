import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState,
    reducers: {
        updateVote(state, action) {
            const { id, votes } = action.payload;
            const targetAnecdote = state.find((anecdote) => anecdote.id === id);
            targetAnecdote.votes = votes;
        },
        appendAnecdote(state, action) {
            const anecdote = action.payload;
            state.push(anecdote);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

// ####################
// =====> Thunks <=====
//#####################
export const initializeAnecdotes = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:3001/anecdotes");
        const anecdotes = await response.json();
        dispatch(setAnecdotes(anecdotes));
    } catch (error) {
        console.log(error);
    }
};

export const createAnecdote = (content) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:3001/anecdotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content, votes: 0 }),
        });
        const createdAnecdote = await response.json();
        dispatch(appendAnecdote(createdAnecdote));
    } catch (error) {
        console.log(error);
    }
};

export const vote = (id) => async (dispatch, getState) => {
    try {
        const { anecdotes } = getState();
        const anecdote = anecdotes.find((a) => a.id === id);
        const response = await fetch(`http://localhost:3001/anecdotes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ votes: anecdote.votes + 1 }),
        });
        const updatedAnecdote = await response.json();
        dispatch(updateVote(updatedAnecdote));
    } catch (error) {
        console.log(error);
    }
};

export default anecdoteSlice.reducer;
export const { updateVote, appendAnecdote, setAnecdotes } =
    anecdoteSlice.actions;
