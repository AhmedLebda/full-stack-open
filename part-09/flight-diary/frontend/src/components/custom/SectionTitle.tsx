const SectionTitle = ({ text }: { text: string }) => {
    return (
        <h2 className="text-3xl font-bold capitalize text-zinc-900 mb-4 pb-4 border-b-2 border-b-black">
            {text}
        </h2>
    );
};

export default SectionTitle;
