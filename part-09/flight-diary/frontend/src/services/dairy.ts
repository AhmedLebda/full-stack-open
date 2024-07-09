import { DiaryEntry } from "../utils/types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getEntries = async () => {
    const response = await fetch(baseUrl);
    const data = <DiaryEntry[]>await response.json();

    if (!response.ok) {
        throw Error("Error fetching data");
    }

    return data;
};
