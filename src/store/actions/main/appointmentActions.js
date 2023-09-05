import {
  apis,
  appointmentReducersTypes,
  sortByKey,
  i18n,
  sortTimes,
  arabicNumbers,
  convertFromArabic,
} from '../../../services';
import moment from 'moment';
import Axios from 'axios';
import { PROUDTION_HEADER } from '../../../services/apis/environment';

const {
  SET_SPECIALITIES_OBJECT,
  SET_DOCTORS_OBJECT,
  SET_ALL_DOCTORS_OBJECT,
  SET_LOADER,
  SET_SCHEDULES,
  SET_MY_APPOINTMENTS,
} = appointmentReducersTypes;

export const getAllSpecialities = (cbSuccess, cbFailure) => async (
  dispatch,
) => {
  try {
    const { data } = await apis.clinics();
    console.log(data);
    dispatch({
      type: SET_SPECIALITIES_OBJECT,
      payload: sortByKey(data.Clinics, 'E_NAME'),
    });
    cbSuccess();
  } catch (e) {
    console.log('[ERROR GETTING ALL SPECIALITIES]', e, e.response);
    cbFailure();
  }
};

export const getDoctorsList = (
  { CODE: category, forceSendRequest },
  cbSuccess,
  cbFailure,
) => async (dispatch) => {
  try {
    if (forceSendRequest) {
      dispatch({
        type: SET_LOADER,
        payload: true,
      });
      const { data } = await apis.doctors(category);
      console.log('[DOCTORS LIST]', data);
      await dispatch({
        type: SET_DOCTORS_OBJECT,
        payload: data.Doctor,
      });
      cbSuccess();
      return;
    }
    await dispatch({
      type: SET_DOCTORS_OBJECT,
      payload: category,
    });
    cbSuccess();
  } catch (e) {
    console.log('[ERROR GETTING DOCTORS]', e, e.response);
    cbFailure();
  }
};

export const getAllDoctors = (cbSuccess, cbFailure) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const cat = await apis.clinics();
    console.log('[ALL CATEGORIES]', cat);
    dispatch({
      type: SET_SPECIALITIES_OBJECT,
      payload: sortByKey(cat.data.Clinics, 'E_NAME'),
    });

    try {
      const doctorsEndPoint =
        'https://app.udh.sa/doctors/web'
      const { data } = await Axios.get(doctorsEndPoint, PROUDTION_HEADER);
      console.log('DOCTORS', data);
      const allDocs = data.Doctors.map((el) => (
        {
          CLINC_CODE: el[0],//el.doctor_code,
          DOC_CODE: el[0],//el.doctor_code,
          CLINC_ANAME: el[1],//el.doctor_name,
          CLINC_ENAME: el[2],//el.doctor_name,
          LEVEL_ANAME: el[15],//el.level_sp,
          LEVEL_ENAME: el[14],//el.level_sp,
          IMAGE_URI: el[5],//el.doc_thumbnail,
          SPECIALITY_ANAME: el[13],//el.specialties,
          SPECIALITY_ENAME: el[12],//el.specialties,
          spec_code: el[0],//el.category.code,
          A_DESC: el[7],//el.short_desc,
          E_DESC: el[6],//el.short_desc,
        }));
      dispatch({
        type: SET_ALL_DOCTORS_OBJECT,
        payload: sortByKey(
          allDocs,
          i18n.locale === 'ar' ? 'CLINC_ANAME' : 'CLINC_ENAME',
        ),
      });
      cbSuccess(
        sortByKey(
          allDocs,
          i18n.locale === 'ar' ? 'CLINC_ANAME' : 'CLINC_ENAME',
        ),
      );
    } catch (e) {
      console.log(e);
    }
    //   dispatch({
    //     type: SET_LOADER,
    //     payload: false,
    //   });
  } catch (e) {
    console.log('[ERROR GETTING ALL DOCTORS]', e, e.response);
    cbFailure();
    dispatch({
      type: SET_LOADER,
      payload: false,
    });
  }
};

export const getSchedules = ({ DOC_CODE, date }, cbSuccess, cbFailure) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: SET_SCHEDULES,
      payload: null,
    });
    // const availableTimes = (
    //   await apis.getSchedulesList(
    //     `${moment(date).format('DD-MMM-yyyy')}/${DOC_CODE}`,
    //   )
    // ).data;
    // const reservType = (
    //   await apis.getSchedulesList(
    //     `${moment(date).format('DD-MMM-yyyy')}/${DOC_CODE}`,
    //   )
    // ).data.ReservType;

    const availableTimes = (
      await apis.getSchedulesListReserved(
        `${DOC_CODE}?reservationsDate=${date}`,
      )
    ).data.reservations;
    console.log('availableTimes', availableTimes);

    let allAppointments = [];

    availableTimes.map((item, index) => {
      allAppointments.push({
        time: item,
        status: 1,
      });
    });

    console.log('allAppointments', allAppointments);
    //  if (availableTimes)
    //      availableTimes.forEach(el => allAppointments.push({ time: el.Times,status: el.ReservType }));
    // if (reservedTimes)
    //     reservedTimes.forEach(el => allAppointments.push({ time: el, status: false }));
    dispatch({
      type: SET_SCHEDULES,
      payload: allAppointments,
    });
    cbSuccess();
  } catch (e) {
    console.log('[ERROR GETTING SCHEDULES]', e, e.response);
    cbFailure();
  }
};

export const makeAppointment = (params, cbSuccess, cbFailure) => async (
  dispatch,
) => {
  try {
    params.MOBILE = convertFromArabic(params.MOBILE);
    console.log('[PARAMS TO BE PASSED]', { resInfo: params });
    const { data } = await apis.makeAppointment({ resInfo: params });
    console.log('[RESPONSE FOR MAKING APPOINTMENT]', data);
    cbSuccess();
  } catch (e) {
    console.log('[ERROR GETTING SCHEDULES]', e, e.response);
    cbFailure();
  }
};

export const getMyAppointments = (params, cbSuccess, cbFailure) => async (
  dispatch,
) => {
  try {
    const { data } = await apis.myAppointments(params);
    console.log('[MY ALL APPOINTMENTS]', data);
    sortAppointments(data.Result);
    dispatch({
      type: SET_MY_APPOINTMENTS,
      payload: data,
    });
    cbSuccess(data);
  } catch (e) {
    console.log('[ERROR GETTING MY APPOINTMENTS]', e, e.response);
    cbFailure();
  }
};

const sortAppointments = (array) =>
  array.sort(function (a, b) {
    if (
      new Date(
        a['RES_DATE'].split('T')[0] + 'T' + a['RES_TIME'].split('T')[1],
      ) <
      new Date(b['RES_DATE'].split('T')[0] + 'T' + b['RES_TIME'].split('T')[1])
    ) {
      return 1;
    }
    if (
      new Date(
        a['RES_DATE'].split('T')[0] + 'T' + a['RES_TIME'].split('T')[1],
      ) >
      new Date(b['RES_DATE'].split('T')[0] + 'T' + b['RES_TIME'].split('T')[1])
    ) {
      return -1;
    }
    return 0;
  });
