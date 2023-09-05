import {doctorScheduleTypes} from '../../../services/constants/types';

const INITIAL_STATE = {
  Schedules: null,
  daysOff: null,
};

const { GET_SCHEDULE,GET_DAYS_OFF} = doctorScheduleTypes;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return {...state, Schedules: action.payload};
    case GET_DAYS_OFF:
      return {...state, daysOff: action.payload};
    default:
      return state;
  }
};
