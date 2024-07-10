import { useEffect, useState, useReducer } from "react";
// Components
import Entries from "./components/custom/Entries";
import NewEntryForm from "./components/custom/NewEntryForm";
import SectionTitle from "./components/custom/SectionTitle";
// Services
import { getEntries, addEntry } from "./services/dairy";
// Types
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./utils/types";

const initialState: NewDiaryEntry = {
    date: "",
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: "",
};

interface FormActions {
    type: string;
    payload?: { fieldName: string; value: string };
}

const reducer = (state: NewDiaryEntry, action: FormActions): NewDiaryEntry => {
    switch (action.type) {
        case "update_field":
            if (action.payload) {
                return {
                    ...state,
                    [action.payload.fieldName]: action.payload.value,
                };
            }
            return state;
        case "reset_form":
            return initialState;
        default:
            return state;
    }
};

function App() {
    const [entries, SetEntries] = useState<DiaryEntry[]>([]);
    const [formData, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initializeEntries = async () => {
            const data = await getEntries();
            console.log(data);
            SetEntries(data);
        };
        initializeEntries();
    }, []);

    const updateField = (fieldName: string, value: string) => {
        dispatch({ type: "update_field", payload: { fieldName, value } });
    };
    const resetForm = () => {
        dispatch({ type: "reset_form" });
    };

    const HandleEntryCreation = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const createdEntry = await addEntry(formData);
            console.log(createdEntry);
            const data = await getEntries();
            SetEntries([...data]);
            dispatch({ type: "reset_form" });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="p-4">
            <div className="mb-8">
                <SectionTitle text="add new entry" />
                <NewEntryForm
                    formData={formData}
                    updateField={updateField}
                    resetForm={resetForm}
                    onSubmit={HandleEntryCreation}
                />
            </div>

            <SectionTitle text="dairy entries" />
            <Entries entries={entries} />
        </div>
    );
}

export default App;
