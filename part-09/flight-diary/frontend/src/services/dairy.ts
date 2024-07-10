import { DiaryEntry, NewDiaryEntry } from "../utils/types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getEntries = async () => {
    const response = await fetch(baseUrl);
    const data = <DiaryEntry[]>await response.json();

    if (!response.ok) {
        throw Error("Error fetching data");
    }

    return data;
};

export const addEntry = async (entry: NewDiaryEntry) => {
    const response = await fetch(baseUrl, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
    });

    const data = <DiaryEntry>await response.json();
    console.log(data);
    if (!response.ok) throw Error("Something went wrong");

    return data;
};
