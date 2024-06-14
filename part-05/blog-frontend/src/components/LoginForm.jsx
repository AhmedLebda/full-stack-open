import OptionButton from "./OptionButton";

const LoginForm = ({ loginData, onDataChange, onSubmit }) => {
    return (
        <form className=" mb-6 pb-6 border-b-2 " onSubmit={onSubmit}>
            <h1 className="italic font-serif font-bold text-4xl text-blue-900 p-4">
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

            <div className="p-4">
                <OptionButton text="Login" />
            </div>
        </form>
    );
};

export default LoginForm;
