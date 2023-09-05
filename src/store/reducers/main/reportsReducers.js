import { reportsReducersTypes } from "../../../services";

const INITIAL_STATE = {
    labReports: null,
    radiologyReports: null,
    labReportsDetails: null,
    radiologyReportsDetails: null
}

const {
    SET_LAB_REPORTS,
    SET_RADIOLOGY_REPORTS,
    SET_LAB_REPORTS_DETAILS,
    SET_RADIOLOGY_REPORTS_DETAILS
} = reportsReducersTypes;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LAB_REPORTS:
            return { ...state, labReports: action.payload };
        case SET_LAB_REPORTS_DETAILS:
            return { ...state, labReportsDetails: action.payload };
        case SET_RADIOLOGY_REPORTS:
            return { ...state, radiologyReports: action.payload };
        case SET_RADIOLOGY_REPORTS_DETAILS:
            return { ...state, radiologyReportsDetails: action.payload };
        default:
            return state;
    }
};
