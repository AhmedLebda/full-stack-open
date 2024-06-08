import { useState } from "react";
import Filter from "./components/Filter";
import CreateContactForm from "./components/CreateContactForm";
import { Contacts } from "./components/Contacts";
import SectionHeader from "./components/SectionHeader";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [filter, setFilter] = useState("");

    const filteredPersons = filter.length
        ? persons.filter(
              (person) =>
                  person.name.toLowerCase().includes(filter.toLowerCase()) ||
                  person.number.includes(filter)
          )
        : persons;

    const handleFilterChange = (e) => setFilter(e.target.value);

    const handleNameChange = (e) => setName(e.target.value);

    const handleNumberChange = (e) => setNumber(e.target.value);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const contact = persons.find(
            (person) =>
                person.name.toLowerCase() === name.toLowerCase() ||
                person.number === number
        );

        if (contact) {
            alert(`${contact.name} is already in the phone book`);
            setName("");
            setNumber("");
            return;
        }

        setPersons([...persons, { name, number }]);
        setName("");
        setNumber("");
    };

    return (
        <div className="border max-w-screen-md mx-auto my-8 p-4 rounded-md shadow-lg min-h-[80vh]">
            <SectionHeader text="Phone Book" />

            <Filter filter={filter} onChange={handleFilterChange} />

            <CreateContactForm
                name={name}
                onNameChange={handleNameChange}
                number={number}
                onNumberChange={handleNumberChange}
                onFormSubmit={handleFormSubmit}
            />

            <SectionHeader text="Numbers" />

            <Contacts contacts={filteredPersons} />
        </div>
    );
};

export default App;
