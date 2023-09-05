import {combineReducers} from 'redux';
import registerReducer from './auth/registerReducer';
import themeReducers from './theme';
import appointmentReducers from './main/appointmentReducers';
import paymentReducers from './main/paymentReducers';
import homeReducers from './main/homeReducers';
import reportsReducers from './main/reportsReducers';
import cardsReducer from './main/cardsReducer';
import invoicesAndPaymentReducer from './main/invoicesAndPaymentReducer';
import inpatientServicesReducer from './main/inpatientServicesReducer';
import galleryReducer from './Gallry/galleryReducer';
import flowerServiceReducer from './main/flowerServiceReducer';
import restaurantReducer from './main/restaurantReducer';
import vitalSignsReducer from './main/vitalSignsReducer';
import patientReducers from './main/patientReducers';
import doctorScheduleReducer from './main/doctorScheduleReducer';
import invoicesReducer from './main/invoicesReducer';

export default combineReducers({
  theme: themeReducers,
  user: registerReducer,
  appointments: appointmentReducers,
  payment: paymentReducers,
  home: homeReducers,
  reports: reportsReducers,
  cards: cardsReducer,
  invoices: invoicesAndPaymentReducer,
  gallery: galleryReducer,
  inpatient: inpatientServicesReducer,
  flowers: flowerServiceReducer,
  restaurant: restaurantReducer,
  vitalSigns: vitalSignsReducer,
  patients: patientReducers,
  doctorschedule: doctorScheduleReducer,
  doctorPay: invoicesReducer,
});
