import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan("tiny"));

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

export default app;
