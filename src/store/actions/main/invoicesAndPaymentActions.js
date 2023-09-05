import axios from 'axios';
import {I18nManager} from 'react-native';
import {
  invoiceAndPaymentReducer,
  displayToast,
  routesNames,
  i18n,
} from '../../../services';
import {PROUDTION_HEADER} from '../../../services/apis/environment';
const {GET_INVOICE, SET_LOADING} = invoiceAndPaymentReducer;

const setLoading = (bool) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: bool,
    });
  };
};

export const getInvoices = (invoiceData, cbSuccess, cbFailure) => {
  return (dispatch) => {
    axios
      .get(
        `/api/v1/payments/invoice?transCount=${invoiceData.invoiceNo}&profileNumber=${invoiceData?.MRN}`,
        PROUDTION_HEADER,
      )
      .then((res) => {
        cbSuccess(res.data);
        console.log('res',res);
        dispatch({
          type: GET_INVOICE,
          payload: res.data,
        });
      })
      .catch((err) => {
        cbFailure();
        if (err.response.status == 404 && invoiceData.invoiceNo) {
          displayToast('error', i18n.t('invoicesTranslations.notFoundInvoice'));
        } else if (err.response.status == 404 && invoiceData?.MRN) {
          cbFailure([]);
        } else if (err.response.status == 400 && invoiceData.invoiceNo) {
          displayToast('error', i18n.t('invoicesTranslations.expiredInvioce'));
        } else if (err.response.status == 400 && invoiceData?.MRN) {
          // displayToast('error', i18n.t('invoicesTranslations.expiredInvioce'));
          cbSuccess([]);
          dispatch({
            type: GET_INVOICE,
            payload: [],
          });
        }
      });
  };
};

export const payInvoice = (invoiceData, navigation, cbSuccess, cbFailure) => {
  const {customerMobileNumber, transCount, invoice} = invoiceData;
  return (dispatch) => {
    axios
      .post(
        '/api/v1/telr/orders',
        {
          customerMobileNumber,
          transCount,
        },
        PROUDTION_HEADER,
      )
      .then((res) => {
        cbSuccess({
          order: res.data.order,
          invoice: invoice,
        });
      })
      .catch((err) => {
        console.log({...err});
        if (err?.response?.data?.statusCode == 400) {
          displayToast('error', i18n.t('invoicesTranslations.paiedInvoiceErr'));
        } else {
          displayToast('error', i18n.t('invoicesTranslations.unknownError'));
        }
        cbFailure();
      });
  };
};
