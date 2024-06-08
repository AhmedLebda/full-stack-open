const express = require("express");
const morgan = require("morgan");
const data = require("./data.cjs");
const utils = require("./utils.cjs");

let PhoneBook = data;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/persons", (req, res) => {
    if (!PhoneBook) {
        return res
            .status(400)
            .json({ error: "There are no contacts in the phonebook" });
    }
    res.json(PhoneBook);
});

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({
            error: "you need to enter a name and number for your contact",
        });
    }
    const contactExists = PhoneBook.find((contact) => contact.name === name);
    if (contactExists) {
        return res.status(400).json({
            error: "This contact already exists",
        });
    }

    const createdContact = { id: utils.generateRandomId(), ...req.body };
    PhoneBook.push(createdContact);
    res.json(createdContact);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const contact = PhoneBook.find((contact) => contact.id === +id);

    if (!contact) {
        return res.status(400).json({
            error: "This contact doesn't exist in the phonebook",
        });
    }
    res.json(contact);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;

    const targetContact = PhoneBook.find((contact) => contact.id === +id);

    const filteredContacts = PhoneBook.filter((contact) => contact.id !== +id);

    PhoneBook = filteredContacts;

    if (!targetContact) {
        return res.status(400).json({
            error: "This contact doesn't exist in the phonebook",
        });
    }
    res.json({ msg: `${targetContact.name} is deleted!`, contacts: PhoneBook });
});

app.get("/api/info", (req, res) => {
    res.json({ entries: PhoneBook.length, timestamp: new Date().toString() });
});

app.listen(PORT, () => console.log("your server is running on port:" + PORT));
