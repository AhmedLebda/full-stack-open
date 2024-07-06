import diagnosesData from "../data/diagnoses";
import { Diagnoses } from "../utils/types";

const diagnoses_list = (): Diagnoses[] => {
    return diagnosesData;
};

export default { diagnoses_list };
