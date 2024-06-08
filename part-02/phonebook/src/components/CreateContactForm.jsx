const CreateContactForm = ({
    name,
    onNameChange,
    number,
    onNumberChange,
    onFormSubmit,
}) => {
    return (
        <form className=" mb-6 pb-6 border-b-2" onSubmit={onFormSubmit}>
            <div className="p-4 capitalize">
                <label htmlFor="name">name:</label>
                <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="border ml-4 px-2"
                    value={name}
                    onChange={onNameChange}
                />
            </div>

            <div className="p-4 capitalize">
                <label htmlFor="number">number:</label>
                <input
                    required
                    type="tel"
                    name="number"
                    id="number"
                    className="border ml-4 px-2"
                    value={number}
                    onChange={onNumberChange}
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="bg-emerald-700 text-white px-12 py-2 mt-6 rounded-md capitalize ml-4 hover:bg-emerald-800"
                >
                    add
                </button>
            </div>
        </form>
    );
};

export default CreateContactForm;
