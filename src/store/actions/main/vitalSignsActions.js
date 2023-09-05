import axios from 'axios';
import {vitalSignsTypes} from '../../../services';
import {PROUDTION_HEADER} from '../../../services/apis/environment';

const {GET_VITAL_SIGNS} = vitalSignsTypes;

export const getAllVitalSignsReport = (admissionNo, cbSuccess, cbFailure) => {
  return async (dispatch) => {
    try {
      const {
        data: {data: glucoseRandom},
      } = await axios.get(
        `/api/v1/report?service=72044&patient=${admissionNo}`,
        PROUDTION_HEADER,
      );
      const {
        data: {data: glucoseFasting},
      } = await axios.get(
        `/api/v1/report?service=72042&patient=${admissionNo}`,
        PROUDTION_HEADER,
      );
      const {
        data: {data: cholesterol},
      } = await axios.get(
        `/api/v1/report?service=72029&patient=${admissionNo}`,
        PROUDTION_HEADER,
      );
      const {
        data: {data: vitaminD},
      } = await axios.get(
        `/api/v1/report?service=93539&patient=${admissionNo}`,
        PROUDTION_HEADER,
      );
      const {
        data: {data: triglycerides},
      } = await axios.get(
        `/api/v1/report?service=72066&patient=${admissionNo}`,
        PROUDTION_HEADER,
      );
      const vitalSignReports = {
        glucoseRandom,
        glucoseFasting,
        cholesterol,
        vitaminD,
        triglycerides,
      };
      console.log(vitalSignReports);
      dispatch({
        type: GET_VITAL_SIGNS,
        payload: vitalSignReports,
      });
      cbSuccess();
    } catch (error) {
      console.log(error, 'more details', {...error});
      cbFailure();
    }
  };
};
