import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";

const App = () => {
    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("http://localhost:3001/anecdotes")
            .then((res) => res.json())
            .then((data) => dispatch(setAnecdotes(data)));
    }, [dispatch]);

    return (
        <div>
            {notification && <Notification />}
            <Filter />
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
