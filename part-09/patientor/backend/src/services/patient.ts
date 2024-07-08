// Data
import patientsData from "../data/patients";
// Types
import { PatientPrivate, Patient, NewPatientData } from "../utils/types";
// Helpers
import { getRandomId } from "../utils/helpers";

const patients_list = (): PatientPrivate[] => {
    return patientsData.map((patient: Patient) => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
        };
    });
};

const patient_create = (newPatientData: NewPatientData): PatientPrivate => {
    const newPatient: PatientPrivate = {
        id: getRandomId(),
        ...newPatientData,
    };
    return newPatient;
};

export default { patients_list, patient_create };
