import { parseArgs } from "./utils";

interface exerciseResult {
    sessionDuration: number;
    trainedDays: number;
    target: number;
    averageTrainedHours: number;
    success: boolean;
    rating: number;
    rating_description: string;
}

const exerciseCalculator = (data: Array<number>): exerciseResult => {
    const target: number = data[0];
    const exerciseHours: number[] = data.slice(1);
    const sessionDuration = exerciseHours.length;

    const trainedDays: number = exerciseHours.filter(
        (hour: number): boolean => hour > 0
    ).length;

    const totalTrainedHours: number = exerciseHours.reduce(
        (acc: number, curr: number) => acc + curr
    );

    const averageTrainedHours: number = totalTrainedHours / sessionDuration;
    const success = averageTrainedHours >= target;
    let rating = null;
    if (success) {
        rating = 3;
    } else if (averageTrainedHours > 1) {
        rating = 2;
    } else {
        rating = 1;
    }

    let rating_description = null;

    switch (rating) {
        case 3:
            rating_description = "very good";
            break;
        case 2:
            rating_description = "not too bad but could be better";
            break;
        case 1:
            rating_description = "you need to put in more effort";
            break;
        default:
            rating_description = "Unknown rating";
    }

    return {
        sessionDuration,
        trainedDays,
        target,
        averageTrainedHours,
        success,
        rating,
        rating_description,
    };
};

try {
    const values = parseArgs(process.argv);
    console.log(exerciseCalculator(values));
} catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
}
