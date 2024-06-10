import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CreateContactForm from "./components/CreateContactForm";
import { Contacts } from "./components/Contacts";
import SectionHeader from "./components/SectionHeader";

import api from "./api";
import { sleep } from "./utils";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        api.getAllContacts().then((contacts) => setPersons(contacts));
    }, []);

    const filteredPersons = filter.length
        ? persons.filter(
              (person) =>
                  person.name.toLowerCase().includes(filter.toLowerCase()) ||
                  person.number.includes(filter)
          )
        : persons;

    const showNotification = async (type, msg) => {
        if (!notification) {
            setNotification({ type, msg });
            await sleep();
            setNotification(null);
        }
    };

    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleNumberChange = (e) => setNumber(e.target.value);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const contactExists = persons.find(
                (contact) => contact.name.toLowerCase() === name.toLowerCase()
            );

            if (contactExists) {
                if (
                    confirm(
                        `${contactExists.name} is already in your phone book, do you want to replace the old number with the new one?`
                    )
                ) {
                    const updatedContact = await api.updateContact(
                        contactExists
                    );

                    setPersons(
                        persons.map((contact) =>
                            contact.id === updatedContact.id
                                ? updatedContact
                                : contact
                        )
                    );
                }
            } else {
                const contact = await api.addContact({ name, number });
                setPersons([...persons, contact]);

                showNotification(
                    "success",
                    `${name} added successfully to your phone book`
                );
            }
            setName("");
            setNumber("");
        } catch (error) {
            console.log(error.message);

            showNotification("fail", error.message);
        }
    };

    const handleContactDelete = async (id) => {
        try {
            const deletedContact = await api.deleteContact(id);
            setPersons(
                persons.filter((contact) => contact.id !== deletedContact.id)
            );
            setName("");
            setNumber("");

            showNotification("success", `contact deleted successfully`);
        } catch (error) {
            console.log(error);

            showNotification("fail", error.message);
        }
    };

    return (
        <div className="border max-w-screen-md mx-auto my-8 p-4 rounded-md shadow-lg min-h-[80vh]">
            <SectionHeader text="Phone Book" />
            {notification && (
                <p
                    className={`${
                        notification?.type === "success"
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                    } capitalize font-bold p-2 rounded-lg text-center`}
                >
                    {notification.msg}
                </p>
            )}
            <Filter filter={filter} onChange={handleFilterChange} />

            <CreateContactForm
                name={name}
                onNameChange={handleNameChange}
                number={number}
                onNumberChange={handleNumberChange}
                onFormSubmit={handleFormSubmit}
            />

            <SectionHeader text="Numbers" />

            <Contacts
                contacts={filteredPersons}
                onContactDelete={handleContactDelete}
            />
        </div>
    );
};

export default App;
