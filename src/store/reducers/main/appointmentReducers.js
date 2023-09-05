import { appointmentReducersTypes } from "../../../services/constants/types";

const INITIAL_STATE = {
    specialities: null,
    doctors: null,
    allDoctors: null,
    schedules: null,
    loading: true,
    myAppointments: null
}

const {
    SET_SPECIALITIES_OBJECT,
    SET_DOCTORS_OBJECT,
    SET_ALL_DOCTORS_OBJECT,
    SET_SCHEDULES,
    SET_LOADER,
    SET_MY_APPOINTMENTS
} = appointmentReducersTypes;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SPECIALITIES_OBJECT:
            return { ...state, specialities: action.payload, loading: state.allDoctors ? false : true }
        case SET_ALL_DOCTORS_OBJECT:
            return { ...state, allDoctors: action.payload, loading: state.specialities ? false : true }
        case SET_DOCTORS_OBJECT:
            if (typeof (action.payload) === 'object') {
                const doctors = action.payload.map(el => {
                    const thisDoc = state.allDoctors.find(e => e.CLINC_CODE.trim() === el.CLINC_CODE.trim());
                    if (thisDoc)
                        return { ...el, ...thisDoc }
                    else return el;
                })
                return { ...state, doctors, loading: false }
            }
            const spec_code = String(action.payload).trim();
            return {
                ...state, doctors: state.allDoctors.filter(el => el.CLINC_CODE.includes(spec_code))
            }
        case SET_SCHEDULES:
            return { ...state, schedules: action.payload }
        case SET_LOADER:
            return { ...state, loading: action.payload }
        case SET_MY_APPOINTMENTS:
            return { ...state, myAppointments: action.payload }
        default:
            return state;
    }
};