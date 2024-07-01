import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1 className="font-bold font-serif text-4xl capitalize text-center mt-8">
                welcome to Pharaoh's Papyrus
            </h1>
            <Link
                to="blogs"
                className="italic text-blue-700 underline block text-center mt-8 font-bold capitalize font-mono"
            >
                Browse blogs
            </Link>
        </>
    );
};

export default Home;
