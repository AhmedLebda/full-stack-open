// Data
import patientsData from "../data/patients";
// Types
import { PatientPrivate, Patient } from "../utils/types";

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

export default { patients_list };
