import { parseArgs } from "./utils";

const bmiCalculator = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;
    switch (true) {
        case bmi < 18.5:
            return "Underweight";
        case bmi >= 18.5 && bmi < 25:
            return "Normal weight";
        case bmi >= 25 && bmi < 30:
            return "Overweight";
        case bmi >= 30:
            return "Obese";
        default:
            return "BMI value not recognized";
    }
};

try {
    const [height, weight] = parseArgs(process.argv);
    console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
