import {InvoiceData} from '../../../services/constants/types';

const INITIAL_STATE = {
  data: null,
};

const {SET_ALL_INVOICE_DATE} = InvoiceData;

export default (state = INITIAL_STATE, action) => {
  console.log('action>>>>>>>>>>>>>>>>>>>>', action.type);
  console.log('action>>>>>>>>>>>>>>>>>>>>', action);
  switch (action.type) {
    case SET_ALL_INVOICE_DATE:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
