import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { exerciseCalculator, exerciseResult } from "./exerciseCalculator";

const app = express();
app.use(express.json());

const PORT: number = 3001;

app.get("/hello", (_req, res) => {
    res.send("Hello world");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).json({ error: "malformed parameters" });
    }

    if (height && weight) {
        res.json({ height, weight, bmi: bmiCalculator(+height, +weight) });
    }
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!target || isNaN(Number(target))) {
        return res.status(400).json({ error: "malformed parameters" });
    }
    if (!(daily_exercises instanceof Array) || daily_exercises.length === 0) {
        return res.status(400).json({ error: "malformed parameters" });
    }
    const exerciseHours: number[] = daily_exercises.map((value: any) =>
        Number(value)
    );

    if (exerciseHours.includes(NaN)) {
        return res.status(400).json({ error: "malformed parameters" });
    }

    const data = [Number(target), ...daily_exercises];
    const result: exerciseResult = exerciseCalculator(data);
    return res.json(result);
});

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
