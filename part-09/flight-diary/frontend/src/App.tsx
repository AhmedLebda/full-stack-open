import { useEffect, useState } from "react";
// Components
import Entries from "./components/custom/Entries";
// Services
import { getEntries } from "./services/dairy";
// Types
import { DiaryEntry } from "./utils/types";

function App() {
    const [entries, SetEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const initializeEntries = async () => {
            const data = await getEntries();
            console.log(data);
            SetEntries(data);
        };
        initializeEntries();
    }, []);
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold capitalize text-zinc-900 mb-4 pb-4 border-b-2 border-b-black">
                dairy entries
            </h1>
            <Entries entries={entries} />
        </div>
    );
}

export default App;
