import { Router } from "express";
import DiagnosesServices from "../services/diagnoses";
const router = Router();

router.get("/", (_req, res) => {
    res.json(DiagnosesServices.diagnoses_list());
});

export default router;
