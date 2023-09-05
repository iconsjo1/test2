import axios from 'axios';
import { displayToast, i18n, inpatientServicesTypes } from '../../../services';
import Toast from 'react-native-simple-toast';
import { I18nManager } from 'react-native';
import { storeDataInAsyncStorage } from '../auth/registerAction';
import { PROUDTION_HEADER } from '../../../services/apis/environment';

const {
  GET_INPATIENT,
  SET_INPATIENT_LOADING,
  GET_INPATIENT_REQUESTS,
} = inpatientServicesTypes;

export const setLoading = (bool) => {
  return (dispatch) => {
    dispatch({
      type: SET_INPATIENT_LOADING,
      payload: bool,
    });
  };
};

export const getInpatient = (admissionNumber, cbSucc, cbFail) => {
  return (dispatch) => {
    axios
      .post('/api/v1/in-patient/login', admissionNumber, PROUDTION_HEADER)
      .then((res) => {
        cbSucc(res.data.data);
        dispatch({
          type: GET_INPATIENT,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log({ ...err });
        cbFail();
        if (err?.response?.data?.statusCode == 400)
          displayToast('error', i18n.t('inpatientTranslation.err'));
        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
      });
  };
};

export const getAllInpatientRequests = (
  admissionNumber,
  cbSucc,
  cbFail,
  isOpen,
) => {
  return (dispatch) => {
    axios
      .get(`/api/v1/in-patient?isOpen=${isOpen}`, {
        headers: {
          'admission-number': admissionNumber,
          Authorization: PROUDTION_HEADER.headers.Authorization,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_INPATIENT_REQUESTS,
          payload: res.data.data,
        });
        cbSucc(res.data.data);
      })
      .catch((err) => {
        cbFail();
        console.log({ ...err });
        // displayToast('error', i18n.t('signUpTranslations.unknownError'));
      });
  };
};

export const rateService = (
  admissionNumber,
  orderNo,
  rateAndMsg,
  cbSucc,
  cbFailure,
) => {
  console.log(admissionNumber);
  return (dispatch) => {
    axios({
      method: 'PATCH',
      headers: {
        'admission-number': admissionNumber,
        Authorization: PROUDTION_HEADER.headers.Authorization,
      },
      data: rateAndMsg,
      url: `/api/v1/in-patient/evaluate/${orderNo}`,
    })
      .then((res) => {
        cbSucc(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        cbFailure();
        console.log(err.response);
        displayToast('error', i18n.t('signUpTranslations.unknownError'));
      });
  };
};

export const orderService = (data, serviceId, cbSucc, cbFailure) => {
  return (dispatch) => {
    console.log('[Calling ORDER_SERVICE Action]');
    axios({
      method: 'POST',
      headers: {
        'admission-number': `${data.admissionNumber}`,
        Authorization: PROUDTION_HEADER.headers.Authorization,
      },

      url: `/api/v1/in-patient/service/${serviceId}`,
      data: {
        message: data.message,
        token: data.token,
      },
    })
      .then((res) => {
        console.log('url', `/api/v1/in-patient/service/${serviceId}`);
        console.log('res.data', res.data);
        cbSucc(res.data);
      })
      .catch((err) => {
        cbFailure();
        console.log({ ...err });

        displayToast('error', i18n.t('signUpTranslations.unknownError'));

        // console.log(err.response);
      });
  };
};
