import Input from "./Input";
import { NewDiaryEntry } from "../../utils/types";

interface NewEntryFormProps {
    formData: NewDiaryEntry;
    updateField: (fieldName: string, value: string) => void;
    resetForm: () => void;
    onSubmit: (e: React.SyntheticEvent) => void;
}

const NewEntryForm = ({
    formData,
    updateField,
    resetForm,
    onSubmit,
}: NewEntryFormProps) => {
    const { date, visibility, weather, comment }: NewDiaryEntry = formData;

    return (
        <form className="max-w-[400px]" onSubmit={onSubmit}>
            <Input
                label="date"
                inputOptions={{
                    type: "date",
                    id: "date",
                    name: "date",
                    value: date,
                }}
                updateField={updateField}
            />
            <Input
                label="visibility"
                inputOptions={{
                    type: "text",
                    id: "visibility",
                    name: "visibility",
                    value: visibility,
                }}
                updateField={updateField}
            />
            <Input
                label="weather"
                inputOptions={{
                    type: "text",
                    id: "weather",
                    name: "weather",
                    value: weather,
                }}
                updateField={updateField}
            />
            <Input
                label="comment"
                inputOptions={{
                    type: "text",
                    id: "comment",
                    name: "comment",
                    value: comment,
                }}
                updateField={updateField}
            />

            <div className="flex gap-4 items-center mt-6">
                <button
                    type="submit"
                    className="border capitalize py-2 px-6 rounded border-black"
                >
                    Add
                </button>
                <button
                    type="reset"
                    onClick={resetForm}
                    className="border capitalize py-2 px-6 rounded border-black"
                >
                    reset
                </button>
            </div>
        </form>
    );
};

export default NewEntryForm;
