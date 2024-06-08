export const Contacts = ({ contacts }) => {
    return (
        <div>
            {contacts.map((person, index) => (
                <div
                    key={person.name + index}
                    className="flex gap-4 items-center justify-between  p-4 border-b-2 hover:bg-gray-100"
                >
                    <p className="capitalize">{person.name}</p>
                    <p className="underline">{person.number}</p>
                </div>
            ))}
        </div>
    );
};
