export const Contacts = ({ contacts, onContactDelete }) => {
    if (contacts.length < 1) {
        return (
            <p className="text-red-500">
                Can't find contacts in your phone book...
            </p>
        );
    }

    return (
        <div>
            {contacts.map((person) => (
                <div
                    key={person.id}
                    id={person.id}
                    className="flex gap-6 items-center justify-between  p-4 border-b-2 hover:bg-gray-100"
                >
                    <p className="capitalize mr-auto">{person.name}</p>
                    <p className="underline text-center">{person.number}</p>
                    <button
                        className="border bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600"
                        onClick={() => onContactDelete(person.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};
