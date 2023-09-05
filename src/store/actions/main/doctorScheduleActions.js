import axios from 'axios';
import {doctorScheduleTypes} from '../../../services';

const {GET_SCHEDULE, GET_DAYS_OFF} = doctorScheduleTypes;

export const getAllDoctorsDaysOff = (date) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://udhrest.iconsjo.space/rest/emp_vac?required_date=2021-5-18&type=1`,
      );
      //Use this following request to use actual dates when using the live database and comment the one above
      /* const response = await axios.get(
        `https://udhrest.iconsjo.space/rest/emp_vac?required_date=${date}&type=1`,
      ); */
      const data = response.data.data;
      dispatch({type: GET_DAYS_OFF, payload: data});
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const getAllDoctorsSchedule = (date) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://udhrest.iconsjo.space/REST/clin-tb-d-clin_code?required_date=2021-6-16`,
      );
       //Use this following request to use actual dates when using the live database and comment the one above
      /* const response = await axios.get(
        `https://udhrest.iconsjo.space/REST/clin-tb-d-clin_code?required_date=${date}`,
      ); */
      const data = response.data.data;
      dispatch({type: GET_SCHEDULE, payload: data});
    } catch (e) {
      console.error(e.message);
    }
  };
};
