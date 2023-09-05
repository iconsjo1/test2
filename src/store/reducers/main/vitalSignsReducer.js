import {act} from 'react-test-renderer';
import {vitalSignsTypes} from '../../../services';

const {GET_VITAL_SIGNS} = vitalSignsTypes;

const INITIAL_STATE = {
  glucoseFasting: [],
  glucoseRandom: [],
  cholesterol: [],
  triglycerides: [],
  vitaminD: [],
  vitalSigns: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VITAL_SIGNS:
      return {
        ...state,
        glucoseFasting: action.payload.glucoseFasting,
        glucoseRandom: action.payload.glucoseRandom,
        cholesterol: action.payload.cholesterol,
        triglycerides: action.payload.triglycerides,
        vitaminD: action.payload.vitaminD,
        vitalSigns: [
          action.payload.glucoseFasting,
          action.payload.glucoseRandom,
          action.payload.cholesterol,
          action.payload.triglycerides,
          action.payload.vitaminD,
        ],
      };
    default:
      return state;
  }
};
