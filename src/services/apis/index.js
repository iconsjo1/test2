import endPoints from "./endPoints";
import api from "./api";

export const apis = {
    labReports: (data) => api(endPoints.labs, data),
    labReportDetails: (data) => api(endPoints.labDetails, data),
    clinics: () => api(endPoints.clinics),
    doctors: (data) => api(endPoints.doctors, data),
    allDoctors: () => api(endPoints.allDoctors),
    allDoctorsSecondaryApi: () => api(endPoints.allDoctorsSecondaryApi),
    getSchedulesList: (data) => api(endPoints.schedulesList, data),
    getSchedulesListReserved: (data) => api(endPoints.schedulesListReserved, data),
    radiologyReports: (data) => api(endPoints.radiologyReports, data),
    radiologyReportDetails: (data) => api(endPoints.radiologyReportDetails, data),
    makeAppointment: (data) => api(endPoints.makeAppointment, data),
    myAppointments: (data) => api(endPoints.myAppointments, data),
    cancelAppointment: (data) => api(endPoints.closeAppointment, data),
    getAllNews: data => api(endPoints.news, data),
    patients: (data) => api(endPoints.patients, data)
}