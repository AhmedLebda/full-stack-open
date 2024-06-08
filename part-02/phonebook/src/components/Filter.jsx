const Filter = ({ filter, onChange }) => {
    return (
        <div className="p-4 capitalize border-2 border-slate-700 rounded-md my-4">
            <label htmlFor="filter font-bold">Filter:</label>
            <input
                type="text"
                name="filter"
                id="filter"
                className="border ml-4 px-2 "
                value={filter}
                onChange={onChange}
            />
        </div>
    );
};

export default Filter;
