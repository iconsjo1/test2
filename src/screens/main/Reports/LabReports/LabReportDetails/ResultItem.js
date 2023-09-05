import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  I18nManager,
  Dimensions,
} from 'react-native';
import reshaper from 'arabic-persian-reshaper';
// console.log('reshaper',reshaper);
import {
  i18n,
  WP,
  shadows,
  colors,
  fontFamilies,
} from '../../../../../services/index';
import Text from '../../../../../components/generic/Text';
import InputWithLabel from '../../../../../components/inputs/InputWithLabel';
import ShadowView from 'react-native-simple-shadow-view';
import Feather from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
} from 'victory-native';
import {converENDigitsToAr} from '../../../../../services/utilities/helpers';

const ResultItem = ({data, labInfo}) => {
  const [collapse, setCollapse] = useState(true);
  const minValue = parseFloat(data.RANGEFF);
  const maxValue = parseFloat(data.RANGETF);
  const domainMax = parseFloat((maxValue * 1.13).toFixed(0));
  const smallValuesMaxDomin = parseFloat((domainMax * 1.3).toFixed(1));

  console.log('data',data);

  return (
    <ShadowView style={[styles().shadowStyle]}>
      <InputWithLabel
        color={colors.mediumGrey}
        transparent
        value={data.TITLE || data.SUB_TITLE || i18n.t('labReportDetails.na')}
        disabled={true}>
        {i18n.t('labReportDetails.test')}
      </InputWithLabel>
      <InputWithLabel
        color={colors.mediumGrey}
        transparent
        value={data.RESULT1 || i18n.t('labReportDetails.na')}
        disabled={true}>
        {' '}
        {i18n.t('labReportDetails.result')}
      </InputWithLabel>
      <Collapsible collapsed={collapse}>
        <View>
          <View style={[styles().container]}>
            <Text style={styles().textStyle}>
              {i18n.t('labReportDetails.range') + ' (' + labInfo.gender + ')'}
            </Text>
            <View style={styles().lineInputWrapper}>
              <View style={styles().lineInputWrapper}>
                <Text style={styles().rangesText}>
                  {i18n.t('labReportDetails.from')}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={[
                    styles().inputStyle,
                    I18nManager.isRTL ? styles().rltInput : {},
                  ]}
                  value={
                    (labInfo.SEX.toString().toUpperCase() == 'F'
                      ? data.RANGEFF
                      : data.RANGEFM) || i18n.t('labReportDetails.na')
                  }
                  editable={false}
                />
              </View>
              <View style={styles().lineInputWrapper}>
                <Text style={styles().rangesText}>
                  {i18n.t('labReportDetails.to')}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={[
                    styles().inputStyle,
                    I18nManager.isRTL ? styles().rltInput : {},
                  ]}
                  value={
                    (labInfo.SEX.toString().toUpperCase() == 'F'
                      ? data.RANGETF
                      : data.RANGETM) || i18n.t('labReportDetails.na')
                  }
                  editable={false}
                />
              </View>
            </View>
          </View>
          <InputWithLabel
            color={colors.mediumGrey}
            value={data.TITLE_END || i18n.t('labReportDetails.na')}
            disabled={true}>
            {i18n.t('labReportDetails.unit')}
          </InputWithLabel>
        </View>
        <View style={styles().graph}>
          {data.RANGEFF && data.RANGETF ? (
            <VictoryChart
              width={Dimensions.get('screen').width / 1.2}
              theme={VictoryTheme.grayscale}>
              <VictoryAxis
                tickFormat={(tick) =>
                  `${I18nManager.isRTL ? converENDigitsToAr(tick) : tick}`
                }
                tickValues={[
                  0,
                  minValue,
                  maxValue,
                  maxValue <= 1
                    ? parseFloat((maxValue * 1.4).toFixed(2))
                    : domainMax,
                  data.RESULT1 > maxValue
                    ? parseFloat((domainMax * 1.4).toFixed(2))
                    : domainMax,
                ]}
                tickCount={2}
                dependentAxis
                style={{
                  axis: {
                    stroke: colors.skyBlue,
                  },
                  tickLabels: {
                    padding: 10,
                    fontFamily: fontFamilies('boldText'),
                  },
                }}
              />
              <VictoryLine
                labels={[
                  '',
                  '',
                  '',
                  `${reshaper.ArabicShaper.convertArabic(
                    `${i18n.t('labReportDetails.maxValue')} ${
                      I18nManager.isRTL
                        ? converENDigitsToAr(maxValue)
                        : maxValue
                    }`,
                  )}`,
                ]}
                style={{
                  data: {stroke: colors.darkGrey, padding: 20},
                  labels: {
                    fontSize: 12,
                    left: 20,
                    padding: 10,
                    fontFamily: fontFamilies('normalText'),
                  },
                }}
                data={[
                  {x: 1, y: maxValue},
                  {x: 2, y: maxValue},
                  {x: 3, y: maxValue},
                  {x: 4, y: maxValue},
                  {x: 5, y: maxValue},
                ]}
              />
              <VictoryLine
                labels={[
                  '',
                  '',
                  '',
                  `${reshaper.ArabicShaper.convertArabic(
                    `${i18n.t('labReportDetails.minValue')} ${
                      I18nManager.isRTL
                        ? converENDigitsToAr(minValue)
                        : minValue
                    }`,
                  )}`,
                ]}
                style={{
                  data: {stroke: colors.darkGrey},
                  labels: {
                    fontSize: 12,
                    left: 20,
                    padding: 2,
                    fontFamily: fontFamilies('normalText'),
                  },
                }}
                data={[
                  {
                    x: 1,
                    y:
                      maxValue - minValue > 1 && minValue >= 10
                        ? minValue - parseInt((minValue / 2).toFixed())
                        : minValue,
                  },
                  {
                    x: 2,
                    y:
                      maxValue - minValue > 1 && minValue >= 10
                        ? minValue - parseInt((minValue / 2).toFixed())
                        : minValue,
                  },
                  {
                    x: 3,
                    y:
                      maxValue - minValue > 1 && minValue >= 10
                        ? minValue - parseInt((minValue / 2).toFixed())
                        : minValue,
                  },
                  {
                    x: 4,
                    y:
                      maxValue - minValue > 1 && minValue >= 10
                        ? minValue - parseInt((minValue / 2).toFixed())
                        : minValue,
                  },
                  {
                    x: 5,
                    y:
                      maxValue - minValue > 1 && minValue >= 10
                        ? minValue - parseInt((minValue / 2).toFixed())
                        : minValue,
                  },
                ]}
              />
              <VictoryAxis
                crossAxis
                label={data.TITLE || data.SUB_TITLE}
                style={{
                  tickLabels: {display: 'none'},
                  axis: {
                    stroke: colors.skyBlue,
                  },
                }}
              />
              <VictoryBar
                labelComponent={
                  <VictoryLabel
                    dy={-10}
                    backgroundPadding={3}
                    backgroundStyle={[{fill: colors.orange, opacity: 0.8}]}
                  />
                }
                domain={{
                  x: [1, 2],
                }}
                labels={[
                  `${reshaper.ArabicShaper.convertArabic(
                    `${i18n.t('labReportDetails.yourResult')} ${
                      I18nManager.isRTL
                        ? converENDigitsToAr(data.RESULT1)
                        : data.RESULT1
                    }`,
                  )}`,
                ]}
                style={{
                  labels: {
                    fontSize: 12,
                    fill: colors.white,
                    padding: 2,
                    fontFamily: fontFamilies('normalText'),
                  },
                  data: {
                    fill: colors.skyBlue,
                    width: 40,
                  },
                }}
                alignment="start"
                data={[{x: 2.3, y: parseFloat(data.RESULT1)}]}
              />
            </VictoryChart>
          ) : null}
        </View>
      </Collapsible>
      <View
        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={styles().button}
          onPress={() => setCollapse(!collapse)}>
          <Feather
            name={!collapse ? 'chevrons-up' : 'chevrons-down'}
            size={17}
            color={colors.darkGrey}
          />
        </TouchableOpacity>
      </View>
    </ShadowView>
  );
};

export default ResultItem;

const styles = () =>
  StyleSheet.create({
    shadowContainer: {
      width: '100%',
      borderRadius: 10,
    },
    rltInput: {
      textAlign: 'right',
    },
    lineInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    container: {
      width: '100%',
      marginTop: 10,
      borderRadius: 10,
    },
    inputStyle: {
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: colors.grey,
      padding: 10,
      marginVertical: 10,
      textAlign: 'auto',
      color: colors.grey,
      fontSize: 15,
      borderRadius: 5,
      // maxWidth: '80%'
    },
    textStyle: {
      fontSize: 13,
      color: '#1E1F20',
      color: colors.darkGrey,
      width: '100%',
      textAlign: 'left',
      paddingVertical: 5,
    },
    shadowStyle: {
      marginVertical: 10,
      paddingVertical: 10,
      borderRadius: 10,
      paddingHorizontal: 5,
      borderWidth: 1,
      borderColor: colors.extraLightGrey,
    },
    button: {
      padding: 10,
      width: '100%',
      alignItems: 'flex-end',
    },
    rangesText: {
      color: colors.darkGrey,
      padding: 10,
    },
    graph: {
      alignSelf: 'center',
      justifyContent: 'center',
    },
  });
