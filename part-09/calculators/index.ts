import express from "express";
import { bmiCalculator } from "./bmiCalculator";

const app = express();

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

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
