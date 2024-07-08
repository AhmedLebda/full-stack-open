import { Router } from "express";
// Services
import PatientServices from "../services/patient";
// Types
import { NewPatientData, PatientPrivate } from "../utils/types";
import { toNewPatientData } from "../utils/helpers";

const router = Router();

router.get("/", (_req, res) => {
    res.json(PatientServices.patients_list());
});

router.post("/", (req, res) => {
    try {
        const newPatient: NewPatientData = toNewPatientData(req.body);

        const createdPatient: PatientPrivate =
            PatientServices.patient_create(newPatient);
        res.json(createdPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(400).send(error.message);
        }
    }
});

export default router;
