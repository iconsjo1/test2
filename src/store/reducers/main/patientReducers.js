import {patientsTypes} from '../../../services/constants/types';

const INITIAL_STATE = {
  allPatients: null,
  patientsMember: null,
  loading: true,
};

const {GET_PATIENTS, GET_PATIENTS_MEMBER} = patientsTypes;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PATIENTS:
      return {...state, allPatients: action.payload, loading: true};
    case GET_PATIENTS_MEMBER:
      return {...state, patientsMember: action.payload, loading: true};
    default:
      return state;
  }
};
