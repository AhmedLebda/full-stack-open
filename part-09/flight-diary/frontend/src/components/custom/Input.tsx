interface InputOptions {
    type: string;
    id: string;
    name: string;
    value: string;
}

interface InputProps {
    label: string;
    inputOptions: InputOptions;
    updateField: (name: string, value: string) => void;
}

const Input = ({ label, inputOptions, updateField }: InputProps) => {
    return (
        <div className="flex gap-4 items-center justify-between mb-2">
            <label htmlFor="date" className="capitalize min-w-20">
                {label}
            </label>
            <input
                {...inputOptions}
                className="border p-2 flex-1"
                onChange={(e) => updateField(inputOptions.name, e.target.value)}
            />
        </div>
    );
};

export default Input;
