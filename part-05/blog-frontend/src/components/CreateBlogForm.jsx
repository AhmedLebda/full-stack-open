import OptionButton from "./OptionButton";

const CreateBlogForm = ({ onDataChange, onSubmit, data }) => {
    return (
        <form className=" mb-6 pb-6 border-b-2 " onSubmit={onSubmit}>
            <h1 className="italic font-serif font-bold text-4xl text-blue-900 p-4">
                Create a blog:
            </h1>

            <div className="p-4 capitalize">
                <label htmlFor="title">Title:</label>
                <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    className="border ml-4 px-2"
                    value={data.title}
                    onChange={onDataChange}
                />
            </div>

            <div className="p-4 capitalize">
                <label htmlFor="url">URL:</label>
                <input
                    required
                    type="text"
                    name="url"
                    id="url"
                    className="border ml-4 px-2"
                    value={data.url}
                    onChange={onDataChange}
                />
            </div>

            <div className="p-4">
                <OptionButton text="Create" />
            </div>
        </form>
    );
};

export default CreateBlogForm;
