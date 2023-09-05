import axios from 'axios';

import {patientsTypes} from '../../../services/constants/types';
import {apis, mobileNumber} from '../../../services';

const {GET_PATIENTS, GET_PATIENTS_MEMBER} = patientsTypes;

export const getAllPatient = () => {
  return async (dispatch) => {
    try {
      const {data} = await apis.patients();
      //https://stackoverflow.com/questions/49370747/network-error-with-axios-and-react-native
      //replace localhost with 10.0.2.2
      // const response = await axios.get(
      //   // "http://10.0.2.2:8000/REST/patients-bymobile?limit=1",
      //   'https://udhrest.iconsjo.space/REST/patients-bymobile',
      // );
      // const data = response.data.data;

      dispatch({type: GET_PATIENTS, payload: data.data});
    } catch (error) {
      console.log(error);
      // dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
    }
  };
};

export const getPatientMember = (mobileNumber) => {
  console.log({mobileNumber});
  return async (dispatch) => {
    try {
      const response = await axios.get(
        // "http://10.0.2.2:8000/REST/patients-bymobile?limit=1",
        `https://udhrest.iconsjo.space/REST/patients-bymobile?mobile=${mobileNumber}`,
      );
      const data = response.data.data;
      dispatch({type: GET_PATIENTS_MEMBER, payload: data});
    } catch (e) {
      console.error(e.message);
    }
  };
};
