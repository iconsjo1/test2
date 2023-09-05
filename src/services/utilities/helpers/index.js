import {i18n} from '../..';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {mobileNumber} from '../../constants/asyncMemoryStrings';
import Toast from 'react-native-toast-message';
import {I18nManager} from 'react-native';
import {colors} from '../styling/colors';

export const getMonthName = (_date) => {
  const date = moment(_date);
  return i18n.locale === 'ar'
    ? monthArabic[date.month()]
    : monthShort[date.month()];
};
export const getDayName = (_date) => {
  const date = moment(_date);
  return i18n.locale === 'ar' ? daysArabic[date.day()] : days[date.day()];
};
export const getFullDayName = (_date) => {
  const date = moment(_date);
  return i18n.locale === 'ar'
    ? daysArabic[date.day()]
    : daysFullNames[date.day()];
};
export const getDatesArray = (date) => {
  const toReturn = [];
  for (let i = 1; i <= date.daysInMonth(); i++) {
    toReturn.push(moment(date).set('D', i));
  }
  return toReturn;
};
export const getNextDay = (date) => {
  return moment(date).set('D', moment(date).get('D') + 1);
};
export const getPreviousDay = (date) => {
  return moment(date).set('D', moment(date).get('D') - 1);
};

export const getNextMonth = (date) => {
  return moment(date).set('M', moment(date).get('M') + 1);
};
export const getPreviousMonth = (date) => {
  return moment(date).set('M', moment(date).get('M') - 1);
};
export const getDateMonth = (date) => {
  const _date = moment(date);
  return _date.get('D') + ' ' + getMonthName(_date);
};
export const getDateMonthYear = (date) => {
  const _date = moment(date);
  return (
    _date.get('D') + ' ' + getMonthName(_date) + ' ' + _date.format('YYYY')
  );
};
export const formatMilitaryTime = (time) => {
  const timeArray = time.split(':');
  if (timeArray[2].split(' ')[1] === 'pm') {
    if (timeArray[0] != '12') timeArray[0] = String(Number(timeArray[0]) + 12);
  }
  return timeArray[0].replace('24', '00') + ':' + timeArray[1];
};
export const getAMPMtime = (time, timeZoneOffset = true) => {
  const date = moment(time);
  if (timeZoneOffset) {
    return date.format('hh:mm a').toUpperCase();
  } else {
    const date = moment({
      hours: time.split('T')[1].split(':')[0],
      minutes: time.split('T')[1].split(':')[1],
    });
    return date.format('hh:mm a').toUpperCase();
  }
};
export const removeSeconds = (time) => {
  const timeArray = time.split(':');
  const ampm = timeArray[2].split(' ')[1];
  return `${timeArray[0]}:${timeArray[1]} ${ampm}`.toUpperCase();
};
export const renderCardNumber = (number) => {
  let toreturn = '';

  for (let i = 0; i < number.length; i++) {
    if (i < 12) toreturn += 'x';
    else toreturn += number.charAt(i);
    if ((i + 1) % 4 === 0 && i + 1 < number.length) toreturn += '-';
  }

  return toreturn;
};
export const monthShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const monthArabic = [
  'يناير',
  'فبراير',
  'مارس',
  'إبريل',
  'مايو',
  'يونيه',
  'يوليه',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const daysFullNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const daysArabic = [
  'الأحَد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];
export const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
export const persianNumbers = [
  '٠',
  '١',
  '٢',
  '٣',
  '۴',
  '۵',
  '۶',
  '٧',
  '٨',
  '٩',
];
export const urduNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const convertFromArabic = (original) => {
  return String(original)
    .split('')
    .map((el) => {
      let num = arabicNumbers.findIndex((e) => e === el);
      if (num === -1) num = persianNumbers.findIndex((e) => e === el);
      if (num === -1) num = urduNumbers.findIndex((e) => e === el);
      if (num !== -1) return String(num);
      else return el;
    })
    .join('');
};
export function pointOnCircle({radius, angle, cx, cy}) {
  angle = angle * (Math.PI / 180); // Convert from Degrees to Radians
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);
  return [x, y];
}

export const calculateRadius = (center, point) => {
  const sqrX = Math.pow(center.x - point.x, 2);
  const sqrY = Math.pow(center.y - point.y, 2);

  const sqrRadius = sqrX + sqrY;

  return Math.sqrt(sqrRadius);
};

export const calculateAngleBetweenTwoPoints = (center, p1, p2) => {
  const p1Angle = Math.atan2(p1.y - center.y, p1.x - center.x);
  const p2Angle = Math.atan2(p2.y - center.y, p2.x - center.x);

  return ((p2Angle - p1Angle) * 180) / Math.PI;
};

export const sortArrayByDate = (array, dateKey) =>
  array.sort(function (a, b) {
    return new Date(b[dateKey]) - new Date(a[dateKey]);
  });

export const sortByKey = (array, key) =>
  array.sort(function (a, b) {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });

export const uniqueElements = (a) => {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
};

export const sortTimes = (array) => {
  // let secondsArray = array.map(el => {
  //     const time = formatMilitaryTime(el.time);
  //     const seconds = (time.split(":")[0] * 60 * 60) + (time.split(":")[1] * 60);
  //     return { time: seconds, status: el.status };
  // });
  // secondsArray = sortByKey(secondsArray, "time");
  // const sortedArray = secondsArray.map(el => {
  //     const minutes = parseInt(el.time / 60);
  //     const hour = parseInt(minutes / 60);
  //     const ampm = hour > 12 ? "pm" : "am";
  //     const minsToShow = String(minutes % 60).length === 1 ? ("0" + String(minutes % 60)) : String(minutes % 60);
  //     return { time: `${hour > 12 ? hour - 12 : hour}:${minsToShow}:00 ${ampm}`, status: el.status }
  // });
  const sortedArray = array.sort(function (a, b) {
    return new Date(a.time) - new Date(b.time);
  });
  return sortedArray;
};

export const setUserData = async (callback1, callback2, route) => {
  try {
    const user = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    if (user) {
      callback1(parsedUser.mobile);
      if (callback2) {
        callback2(parsedUser.name);
      }
    }
    if (route === 'report') {
      callback1(parsedUser.mobile);
      if (callback2) {
        callback2(parsedUser.mrn);
      }
    }
  } catch (e) {
    console.log('[ERROR GETTING PHONE NUMBER]', e);
  }
};

export const displayToast = (type, msg, duration, offset, color) => {
  toast.show(msg, {
    successColor: color ? color : colors.skyBlue,
    type: type == 'error' ? 'danger' : 'success',
    duration: duration ? duration : 2000,
    style: {
      marginTop: offset,
      margin: 0,
    },
  });
};

export const renderIdNumber = (idNumber) => {
  let hasedIdNumber = '';
  let star = '';
  for (let i = 0; idNumber.length >= i; i++) {
    hasedIdNumber = idNumber[0];
    if (i >= 1 && i < idNumber.length - 3) {
      star += '*';
    }
    if (i >= idNumber.length - 3 && i < idNumber.length) {
      star += idNumber[i];
    }
    hasedIdNumber = hasedIdNumber + star;
  }
  return hasedIdNumber;
};

export const converENDigitsToAr = function (num) {
  const englishString = num.toString();
  return englishString.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
};
