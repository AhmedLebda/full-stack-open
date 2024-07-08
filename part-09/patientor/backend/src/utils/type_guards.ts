import { Gender } from "./types";

export const isObject = (param: unknown): param is object => {
    return typeof param === "object";
};

export const isString = (param: unknown): param is string => {
    return typeof param === "string" || param instanceof String;
};

export const isDate = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

export const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((v) => v.toString())
        .includes(param);
};
