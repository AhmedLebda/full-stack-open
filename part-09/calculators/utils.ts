export const parseArgs = (args: string[]): number[] => {
    if (args.length < 4) throw Error("You need to provide values to calculate");

    const values: string[] = args.slice(2);

    values.forEach((value: string) => {
        if (isNaN(+value)) throw Error("Provided values aren't numbers");
    });

    return values.map((value: string) => Number(value));
};
