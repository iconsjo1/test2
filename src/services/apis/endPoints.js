import {environment} from './environment';
import {
  clinics,
  doctors,
  schedules,
  schedulesReserved,
  bookAppointment,
  myAppointments,
  allDoctors,
} from '../mocks';

function endPoint(address, type, guarded, testData) {
  this.address = address;
  this.type = type;
  this.guarded = guarded;
  this.testData = testData;
}

export default endPoints = {
  labs: new endPoint('/labs', 'GET', true),
  labDetails: new endPoint('/labs/details', 'GET', true),
  clinics: new endPoint('/specs/web', 'GET', true, clinics),
  // doctors: new endPoint('/doctors/web', 'GET', true, doctors),
  doctors: new endPoint('/doctors/web/spec/', 'GET', true, doctors),
  // allDoctors: new endPoint('http://netapi.udh.sa/doctors', 'GET', true, allDoctors),
  allDoctors: new endPoint(
    'https://netapi.udh.sa/udhapi/doctors',
    'GET',
    true,
    allDoctors,
  ),
  allDoctorsSecondaryApi: new endPoint('/doctors/web', 'GET', true),
  // allDoctors: new endPoint('https://udh.sa/wp-json/udh/v1/doctors/', 'GET', true, allDoctors),
  schedulesList: new endPoint(
    'https://netapi.udh.sa/udhapi/reservations/appointments/',
    'GET',
    true,
    schedules,
  ),
  schedulesListReserved: new endPoint(
    '/reservations/reserved/',
    'GET',
    true,
    schedulesReserved,
  ),
  radiologyReports: new endPoint('/xRay', 'GET', true),
  radiologyReportDetails: new endPoint('/xRay/details', 'GET', true),
  makeAppointment: new endPoint(
    '/reservations/nBook',
    'post',
    true,
    bookAppointment,
  ),
  myAppointments: new endPoint(
    '/reservations/appointments',
    'GET',
    true,
    myAppointments,
  ),
  closeAppointment: new endPoint(
    '/reservations/appointments/close',
    'POST',
    true,
  ),
  news: new endPoint('https://udh.sa/wp-json/udh/v1/posts/', 'GET', true),
  patients: new endPoint(
    'https://udhrest.iconsjo.space/REST/patients-bymobile',
    'GET',
  ),
};
