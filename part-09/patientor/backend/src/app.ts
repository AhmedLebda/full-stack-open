import express from "express";
import morgan from "morgan";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patient";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan("tiny"));

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

export default app;
