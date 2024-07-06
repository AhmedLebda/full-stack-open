import { Router } from "express";
import PatientServices from "../services/patient";

const router = Router();

router.get("/", (_req, res) => {
    res.json(PatientServices.patients_list());
});

export default router;
