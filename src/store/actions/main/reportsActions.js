import {
  apis,
  sortArrayByDate,
  reportsReducersTypes,
  i18n,
  uniqueElements,
  convertFromArabic,
} from '../../../services';

const {
  SET_LAB_REPORTS,
  SET_LAB_REPORTS_DETAILS,
  SET_RADIOLOGY_REPORTS,
  SET_RADIOLOGY_REPORTS_DETAILS,
} = reportsReducersTypes;

export const getLabReports = (fileNo, phoneNo, cbSuccess, cbFailure) => async (
  dispatch,
) => {
  try {
    console.log(
      '[ORIGINALS]',
      fileNo,
      phoneNo,
      '[MODIFIED]',
      convertFromArabic(fileNo),
      convertFromArabic(phoneNo),
    );
    const {data} = await apis.labReports(
      `?patCode=${convertFromArabic(fileNo)}&mobileNumber=${convertFromArabic(
        phoneNo,
      )}`,
    );
    const labReports = sortArrayByDate(data.Result, 'DENOTED_DATE');
    const doctors = uniqueElements(
      labReports.map((el) =>
        i18n.locale === 'ar' ? el.DOC_ANAME : el.DOC_ENAME,
      ),
    );
    const services = uniqueElements(labReports.map((el) => el.SERV_ENAME));
    dispatch({
      type: SET_LAB_REPORTS,
      payload: labReports,
    });
    cbSuccess({doctors, services});
  } catch (e) {
    console.log('[ERROR GETTING LAB REPORTS]', {...e}, e.response);
    cbFailure();
  }
};

export const getLabReportDetails = (params, cbSuccess, cbFailure) => async (
  dispatch,
) => {
  try {
    const {data} = await apis.labReportDetails(params);
    dispatch({
      type: SET_LAB_REPORTS_DETAILS,
      payload: data.Result,
    });
    cbSuccess(data);
  } catch (e) {
    console.log('[ERROR GETTING LAB REPORTS DETAILS]', e, e.response);
    cbFailure();
  }
};

export const getRadiologyReports = (
  fileNo,
  phoneNo,
  cbSuccess,
  cbFailure,
) => async (dispatch) => {
  try {
    const {data} = await apis.radiologyReports(
      `?patCode=${convertFromArabic(fileNo)}&mobileNumber=${convertFromArabic(
        phoneNo,
      )}`,
    );
    const radiologyReports = sortArrayByDate(data.Result, 'TRS_DATE');
    const doctors = uniqueElements(
      radiologyReports.map((el) =>
        i18n.locale === 'ar' ? el.DOC_ANAME : el.DOC_ENAME,
      ),
    );
    const services = uniqueElements(
      radiologyReports.map((el) => el.SERV_ENAME),
    );
    dispatch({
      type: SET_RADIOLOGY_REPORTS,
      payload: radiologyReports,
    });
    cbSuccess({doctors, services});
  } catch (e) {
    console.log('[ERROR GETTING LAB REPORTS]', e, e.response);
    cbFailure();
  }
};

export const getRadiologyReportDetails = (
  params,
  cbSuccess,
  cbFailure,
) => async (dispatch) => {
  try {
    console.log(params);
    const {data} = await apis.radiologyReportDetails(params);
    dispatch({
      type: SET_RADIOLOGY_REPORTS_DETAILS,
      payload: data.Result,
    });
    cbSuccess(data);
  } catch (e) {
    console.log('[ERROR GETTING LAB REPORTS DETAILS]', e, e.response);
    cbFailure();
  }
};
