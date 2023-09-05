import {inpatientServicesTypes} from '../../../services';

const {
  GET_INPATIENT,
  SET_LOADING,
  GET_INPATIENT_REQUESTS,
} = inpatientServicesTypes;

const INITIAL_STATE = {
  inpatient: null,
  loading: false,
  inpatientRequests: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INPATIENT:
      return {...state, inpatient: action.payload};
    case SET_LOADING:
      return {...state, loading: action.payload};
    case GET_INPATIENT_REQUESTS:
      return {...state, inpatientRequests: action.payload};
    default:
      return state;
  }
};
