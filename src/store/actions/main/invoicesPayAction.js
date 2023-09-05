import axios from 'axios';
import {I18nManager} from 'react-native';
import {InvoiceData, displayToast, routesNames, i18n} from '../../../services';
import {PROUDTION_HEADER} from '../../../services/apis/environment';
const {SET_ALL_INVOICE_DATE} = InvoiceData;

export const fetchDataInvoice = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: SET_ALL_INVOICE_DATE, payload: data});
    } catch (e) {
      console.error(e.message);
    }
  };
};
