import {invoiceAndPaymentReducer} from '../../../services';

const {GET_INVOICE, SET_LOADING} = invoiceAndPaymentReducer;

const INITIAL_STATE = {
  invoices: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVOICE:
      return {
        ...state,
        invoices: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
