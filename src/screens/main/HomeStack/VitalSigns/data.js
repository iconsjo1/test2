import moment from 'moment';

export const reportsType = {
  month: 'Glucose-Fasting',
  cholesterol: 'Cholesterol',
  triglycerides: 'Triglycerides',
};

const MONTH = 'a month ago';
const MONTH_3 = '3 months ago';
const MONTH_6 = '6 months ago';
const MONTH_9 = '9 months ago';
const MONTH_12 = 'a year ago';

export {MONTH, MONTH_3, MONTH_6, MONTH_12, MONTH_9};

export const tabs = [
  {
    nameEn: 'Month',
    nameAr: 'شهر',
    value: MONTH,
  },
  {
    nameEn: '3 Months',
    nameAr: '٣ أشهر',
    value: MONTH_3,
  },
  {
    nameEn: '6 Month',
    nameAr: '٦ أشهر',
    value: MONTH_6,
  },
  {
    nameEn: '9 Month',
    nameAr: '٩ أشهر',
    value: MONTH_9,
  },
  {
    nameEn: 'Year',
    nameAr: 'سنة',
    value: MONTH_12,
  },
];

export const formatReportData = (reportType, rtl) => {
  let months = [];
  let reports = [];
  let lineResults = [];
  for (const [date, report] of Object.entries(reportType)) {
    const lineResult = {
      x: date,
      y: report[0].RESULT,
    };
    lineResults.push(lineResult);
    months.push(date);
    reports.push(report);
  }
  lineResults.sort((a, b) =>
    rtl
      ? moment(a.x).toDate() - moment(b.x).toDate()
      : moment(b.x).toDate() - moment(a.x).toDate(),
  );
  return {months, reports, lineResults};
};

export const getMostRecentReport = (reportType, title) => {
  if (Object.entries(reportType).length === 0) {
    return {
      TITLE: title,
    };
  } else {
    const array = Object.entries(reportType)
      .map((e) => {
        const [date, report] = e;
        return {
          date,
          ...report[0],
        };
      })
      .flat(1)
      .reduce((a, b) =>
        moment(a.date).toDate() > moment(b.date).toDate()
          ? {...a, TITLE: title}
          : {...b, TITLE: title},
      );
    return array;
  }
};

export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};
