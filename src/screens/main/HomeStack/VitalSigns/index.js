import React, {useEffect, useState} from 'react';
import {
  FlatList,
  I18nManager,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {RippleLoader} from 'react-native-indicator';

import styles from './styles';
import {LoadingWrapper, NoResults} from '../../../../components';
import moment from 'moment';
import {
  colors,
  displayToast,
  fontFamilies,
  HP,
  i18n,
  images,
  WP,
} from '../../../../services';
import {
  formatReportData,
  getMostRecentReport,
  hexToRGB,
  MONTH,
  MONTH_12,
  MONTH_6,
  tabs,
} from './data';
import {getAllVitalSignsReport} from '../../../../store/actions/main/vitalSignsActions';
import ChartComponent from './ChartComponent';
import {useIsFocused} from '@react-navigation/native';
import {converENDigitsToAr} from '../../../../services/utilities/helpers';

const VitalSigns = ({route, navigation}) => {
  const {user} = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const glucoseRandom = useSelector((state) => state.vitalSigns.glucoseRandom);
  const glucoseFasting = useSelector(
    (state) => state.vitalSigns.glucoseFasting,
  );
  const cholesterol = useSelector((state) => state.vitalSigns.cholesterol);
  const vitaminD = useSelector((state) => state.vitalSigns.vitaminD);
  const triglycerides = useSelector((state) => state.vitalSigns.triglycerides);
  const vitalSigns = useSelector((state) => state.vitalSigns.vitalSigns);

  useEffect(() => {
    if (vitalSigns === null) {
      setLoading(true);
      dispatch(
        getAllVitalSignsReport( 
          user.mrn,
          () => {
            setLoading(false);
          },
          () => {
            setLoading(false);
          },
        ),
      );
    }
  }, [isFocused]);

  // Cholesterol Report chart data
  const {
    lineResults: cholesterolLineResult,
    months: cholesterolMonths,
    reports: cholesterolReports,
  } = formatReportData(cholesterol, I18nManager.isRTL);

  // glucoseRandom Report Chart Data
  const {
    lineResults: glucoseRandomLineResult,
    months: glucoseRandomMonths,
    reports: glucoseRandomReports,
  } = formatReportData(glucoseRandom, I18nManager.isRTL);

  // glucoseFasting Report Chart Data
  const {
    lineResults: glucoseFastingLineResult,
    months: glucoseFastingMonths,
    reports: glucoseFastingReports,
  } = formatReportData(glucoseFasting, I18nManager.isRTL);

  // vitaminD Report Chart Data
  const {
    lineResults: vitaminDLineResult,
    months: vitaminDMonths,
    reports: vitaminDReports,
  } = formatReportData(vitaminD, I18nManager.isRTL);

  // triglycerides Report Chart Data
  const {
    lineResults: triglyceridesLineResult,
    months: triglyceridesMonths,
    reports: triglyceridesReports,
  } = formatReportData(triglycerides, I18nManager.isRTL);

  const latestTriReport = getMostRecentReport(
    triglycerides,
    i18n.t('vitalReports.triglesrides'),
  );
  const lestestGluRandReport = getMostRecentReport(
    glucoseRandom,
    i18n.t('vitalReports.ranBloodSugar'),
  );
  const lestestGluFestReport = getMostRecentReport(
    glucoseFasting,
    i18n.t('vitalReports.festingBloodSugar'),
  );
  const lestestCholeReport = getMostRecentReport(
    cholesterol,
    i18n.t('vitalReports.cholestrol'),
  );
  const lestestVitDReport = getMostRecentReport(
    vitaminD,
    i18n.t('vitalReports.vitaminD'),
  );
  const latestReports = [
    latestTriReport,
    lestestGluRandReport,
    lestestGluFestReport,
    lestestCholeReport,
    lestestVitDReport,
  ];

  return (
    <LoadingWrapper navigation={navigation} header loading={loading}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 10, paddingBottom: 50}}>
          {latestReports.map((report, index) => (
            <View
              key={index}
              style={{
                height: HP('16'),
                width: WP('50'),
                padding: 20,
                backgroundColor:
                  index === 0
                    ? colors.lightBlue
                    : index === 1
                    ? colors.extraLightBlue
                    : index === 2
                    ? colors.lightGold
                    : index === 3
                    ? colors.lightGreen
                    : index === 4
                    ? colors.lightGrey
                    : hexToRGB(colors.green, '0.4'),
                marginHorizontal: 5,
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  {report.RESULT ? (
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: fontFamilies('boldText'),
                        marginRight: 3,
                        color:
                          index === 0
                            ? colors.darkBlue
                            : index === 1
                            ? colors.vibrantBlue
                            : index === 2
                            ? colors.crimson
                            : index === 3
                            ? colors.mintGreen
                            : index === 4
                            ? colors.mediumGrey
                            : hexToRGB(colors.green, '0.4'),
                      }}>
                      {I18nManager.isRTL
                        ? converENDigitsToAr(report.RESULT)
                        : report.RESULT}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: fontFamilies('boldText'),
                        color:
                          index === 0
                            ? colors.darkBlue
                            : index === 1
                            ? colors.vibrantBlue
                            : index === 2
                            ? colors.crimson
                            : index === 3
                            ? colors.mintGreen
                            : index === 4
                            ? colors.mediumGrey
                            : hexToRGB(colors.green, '0.4'),
                      }}>
                      {i18n.t('vitalReports.noAvaliableData')}
                    </Text>
                  )}

                  <Text
                    style={{
                      fontFamily: fontFamilies('boldText'),
                      fontSize: 12,
                    }}>
                    {report?.TITLE_END}
                  </Text>
                </View>
                <Image
                  source={
                    index === 0
                      ? images.triglesride
                      : index === 1
                      ? images.bloodSugar
                      : index === 2
                      ? images.festingSugar
                      : index === 3
                      ? images.cholestrol
                      : index === 4
                      ? images.vitaminD
                      : images.vital
                  }
                  style={{
                    width: 20,
                    height: 30,
                    resizeMode: 'contain',
                    alignSelf: 'flex-start',
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: fontFamilies('boldText'),
                    fontSize: 12,
                  }}>
                  {report.TITLE}
                </Text>
              </View>
              <View style={{}}>
                {report.date ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: colors.darkBlue,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {i18n.t('vitalReports.lastUpdate')} {report.date}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 10,
                      color: colors.darkBlue,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {i18n.t('vitalReports.noAvaliableData')}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 300,
          }}>
          <ChartComponent
            reportMonthsArray={cholesterolMonths}
            lineResultsArray={cholesterolLineResult}
            reportsArray={cholesterolReports}
            name="Cholesterol"
            user={user}
          />
          <ChartComponent
            reportMonthsArray={triglyceridesMonths}
            lineResultsArray={triglyceridesLineResult}
            reportsArray={triglyceridesReports}
            name="Triglycerides"
            user={user}
          />
          <ChartComponent
            reportMonthsArray={glucoseFastingMonths}
            lineResultsArray={glucoseFastingLineResult}
            reportsArray={glucoseFastingReports}
            name="Fasting Blood Sugar"
            user={user}
          />
          <ChartComponent
            reportMonthsArray={glucoseRandomMonths}
            lineResultsArray={glucoseRandomLineResult}
            reportsArray={glucoseRandomReports}
            name="Random Blood Sugar"
            user={user}
          />
          <ChartComponent
            reportMonthsArray={vitaminDMonths}
            lineResultsArray={vitaminDLineResult}
            reportsArray={vitaminDReports}
            name="Vitamin D"
            user={user}
          />
        </ScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default VitalSigns;

// Fliter Rabs

{
  /* <View style={styles().tabsContainer}>
        <FlatList
          horizontal
          data={tabs}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelected(index)}
                style={[
                  {...styles().activeTab, borderLeftWidth: index === 0 ? 0 : 1},
                  selected == index
                    ? {
                        backgroundColor: colors.skyBlue,
                      }
                    : {},
                ]}>
                <Text
                  style={{
                    fontFamily: fontFamilies('boldText'),
                    color:
                      selected === index ? colors.whiteAbsolute : colors.black,
                  }}>
                  {I18nManager.isRTL ? item.nameAr : item.nameEn}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View> */
}
