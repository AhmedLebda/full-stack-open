import crypto from "crypto";
// Types
import { NewPatientData, Gender } from "./types";
// Type Guards
import { isDate, isGender, isObject, isString } from "./type_guards";

// Creating a random Id
export const getRandomId = (): string => crypto.randomBytes(8).toString("hex");

// making sure the parameter is a string
const parseString = (str: unknown, fieldName: string): string => {
    if (!str || !isString(str)) {
        throw Error(`Incorrect or missing ${fieldName}: ${str}`);
    }

    return str;
};

// making sure the parameter is a date
const parseDate = (param: unknown): string => {
    if (!isString(param) || !isDate(param)) {
        throw Error(`Incorrect or missing date of birth: ${param}`);
    }
    return param;
};

const parseGender = (param: unknown): Gender => {
    if (!param || !isString(param) || !isGender(param)) {
        throw Error(`Incorrect or missing gender: ${param}`);
    }
    return param;
};

// Typing the received patient data from the client to a <NewPatientData> type and throw error if data if of a wrong type or missing
export const toNewPatientData = (data: unknown): NewPatientData => {
    if (!data || !isObject(data)) {
        throw Error("Incorrect or missing data");
    }

    if (
        "ssn" in data &&
        "name" in data &&
        "dateOfBirth" in data &&
        "occupation" in data &&
        "gender" in data
    ) {
        const newPatient: NewPatientData = {
            ssn: parseString(data.ssn, "ssn"),
            name: parseString(data.name, "name"),
            dateOfBirth: parseDate(data.dateOfBirth),
            occupation: parseString(data.occupation, "occupation"),
            gender: parseGender(data.gender),
        };
        return newPatient;
    }

    throw new Error("Incorrect data: some fields are missing");
};
