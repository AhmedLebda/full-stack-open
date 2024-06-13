const OptionButton = ({ text }) => {
    return (
        <button className="bg-slate-900 hover:bg-slate-950 rounded-md px-6 py-2 font-bold capitalize text-white">
            {text}
        </button>
    );
};

export default OptionButton;
