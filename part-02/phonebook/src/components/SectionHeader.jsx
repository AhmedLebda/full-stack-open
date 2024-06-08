import React from "react";

const SectionHeader = ({ text }) => {
    return (
        <h2 className="font-bold text-4xl text-slate-800 pb-4 mb-4 border-b-2 border-slate-900 font-serif">
            {text}
        </h2>
    );
};

export default SectionHeader;
