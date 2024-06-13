const LoginForm = ({ loginData, onDataChange, onSubmit }) => {
    return (
        <form className=" mb-6 pb-6 border-b-2 " onSubmit={onSubmit}>
            <h1 className="italic font-serif font-bold text-4xl text-blue-800 p-4">
                Login:
            </h1>
            <div className="p-4 capitalize">
                <label htmlFor="username">username:</label>
                <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    className="border ml-4 px-2"
                    value={loginData.username}
                    onChange={onDataChange}
                />
            </div>

            <div className="p-4 capitalize">
                <label htmlFor="password">password:</label>
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="border ml-4 px-2"
                    value={loginData.password}
                    onChange={onDataChange}
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="bg-emerald-700 text-white px-12 py-2 mt-6 rounded-md capitalize ml-4 hover:bg-emerald-800"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
