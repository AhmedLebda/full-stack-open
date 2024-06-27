import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialAnecdotes } from "./utils/initialAnecdotes";

// Components
import Menu from "./components/Menu";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Anecdote_create from "./pages/Anecdote_create";
import AnecdoteDetails from "./pages/AnecdoteDetails";

const App = () => {
    const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
    const [notification, setNotification] = useState(null);

    // Create new anecdote
    const addNew = (anecdote) => {
        anecdote.id = crypto.randomUUID();
        setAnecdotes(anecdotes.concat(anecdote));
    };

    // Get anecdote by id
    const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    // Vote for a specific anecdote
    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };

    // Show notification
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    return (
        <BrowserRouter>
            <h1>Software anecdotes</h1>

            <Menu />
            {notification && <pre>{notification}</pre>}
            <Routes>
                <Route path="/" element={<Home anecdotes={anecdotes} />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/create"
                    element={
                        <Anecdote_create
                            addNew={addNew}
                            showNotification={showNotification}
                        />
                    }
                />
                <Route
                    path="/anecdote/:id"
                    element={<AnecdoteDetails anecdotes={anecdotes} />}
                />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
};

export default App;
