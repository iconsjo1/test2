import React from 'react';
import {StyleSheet, Text, View, Image, I18nManager} from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';
import Svg from 'react-native-svg';

import {
  colors,
  fontFamilies,
  HP,
  i18n,
  images,
  shadows,
  WP,
} from '../../../../services';
import {BlurView} from '@react-native-community/blur';

const ChartComponent = ({
  reportsArray,
  lineResultsArray,
  reportMonthsArray,
  name,
  user,
}) => {
  console.log(user);
  const flatReportArray = reportsArray.flat(1);
  return (
    <View
      style={{
        marginHorizontal: 50,
      }}>
      {reportMonthsArray.length > 0 &&
      lineResultsArray.length > 0 &&
      flatReportArray.length > 0 ? (
        <View style={styles().chartContainer}>
          <View
            style={{
              position: 'absolute',
              top: HP('2'),
              left: 20,
              right: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: WP('85'),
              //   backgroundColor: colors.orange,
              flexWrap: 'wrap',
            }}>
            <View style={{}}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fontFamilies('boldText'),
                  color: colors.black,
                }}>
                {name === 'Cholesterol'
                  ? i18n.t('vitalReports.cholestrol')
                  : name === 'Triglycerides'
                  ? i18n.t('vitalReports.triglesrides')
                  : name === 'Fasting Blood Sugar'
                  ? i18n.t('vitalReports.festingBloodSugar')
                  : name === 'Random Blood Sugar'
                  ? i18n.t('vitalReports.ranBloodSugar')
                  : name === 'Vitamin D'
                  ? i18n.t('vitalReports.vitaminD')
                  : null}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                width: WP('80'),
              }}>
              <View style={styles().infoRow}>
                <View style={styles().dotStyle}></View>
                <Text numberOfLines={1} style={styles().ifnoFont}>
                  {i18n.t('vitalReports.normalMinimum')}
                </Text>
              </View>
              <View style={styles().infoRow}>
                <View
                  style={{
                    ...styles().dotStyle,
                    backgroundColor: colors.orange,
                  }}></View>
                <Text numberOfLines={1} style={styles().ifnoFont}>
                  {i18n.t('vitalReports.normalMax')}
                </Text>
              </View>
              <View style={styles().infoRow}>
                <View
                  style={{
                    ...styles().dotStyle,
                    backgroundColor: colors.skyBlueDark,
                  }}></View>
                <Text numberOfLines={1} style={styles().ifnoFont}>
                  {i18n.t('vitalReports.result')}
                </Text>
              </View>
            </View>
          </View>

          <View style={{height: 350}}>
            <Svg
              width={WP('90')}
              height={390}
              viewBox="-10 -20 390 390"
              style={{width: '100%', height: 'auto'}}>
              <VictoryChart
                standalone={false}
                padding={{top: 50, bottom: 50, right: 50, left: 50}}
                theme={VictoryTheme.material}
                style={{
                  svg: {
                    overflow: 'visible',
                  },
                }}>
                <VictoryAxis
                  style={{axis: {stroke: 'transparent'}}}
                  dependentAxis
                  domain={{
                    y: [
                      0,
                      user.gender === 'Male'
                        ? flatReportArray[0].MALE_RANGE.end + 50
                        : flatReportArray[0].FEMALE_RANGE.end + 50,
                    ],
                  }}
                />
                <VictoryAxis tickFormat={() => ''} />
                <VictoryLine
                  //   interpolation="natural"
                  data={lineResultsArray}
                  style={{
                    data: {
                      stroke: colors.skyBlue,
                      strokeWidth: 5,
                      borderRadius: 3,
                    },
                  }}
                />
                <VictoryLine
                  data={Array(reportMonthsArray.length + 2).fill(
                    user.gender === 'Male'
                      ? flatReportArray[0].MALE_RANGE.start
                      : flatReportArray[0].FEMALE_RANGE.start,
                  )}
                  style={{
                    data: {
                      stroke: colors.green,
                      strokeWidth: 2,
                      borderRadius: 3,
                    },
                  }}
                />
                <VictoryLine
                  data={Array(flatReportArray.length + 2).fill(
                    user.gender === 'Male'
                      ? flatReportArray[0].MALE_RANGE.end
                      : flatReportArray[0].FEMALE_RANGE.end,
                  )}
                  style={{
                    data: {
                      stroke: colors.orange,
                      strokeWidth: 2,
                      borderRadius: 3,
                    },
                  }}
                />
                <VictoryScatter
                  events={[
                    {
                      target: 'data',
                      eventHandlers: {
                        onTouchEnd: (e) => {
                          console.log('ff');
                        }, // Override default tooltip
                        onPressIn: (evt, pressedProps) => {
                          const selectedDataIndex = pressedProps.index;
                          return [
                            {
                              eventKey: 'all',
                              target: 'labels',
                              mutation: (props) => {
                                let activeState = true;
                                if (props.active === true) {
                                  activeState = null;
                                }
                                return props.index === selectedDataIndex
                                  ? {active: activeState}
                                  : {active: false}; // changed this line from null
                              },
                            },
                          ];
                        },
                        onPressOut: (evt, pressedProps) => {
                          const selectedDataIndex = pressedProps.index;
                          return [
                            {
                              eventKey: 'all',
                              target: 'labels',
                              mutation: (props) =>
                                props.index === selectedDataIndex
                                  ? {active: props.active}
                                  : null,
                            },
                          ];
                        },
                      },
                    },
                  ]}
                  labels={({datum}) =>
                    `${datum.x}  ${datum.y} ${flatReportArray[0].TITLE_END}`
                  }
                  labelComponent={
                    <VictoryTooltip
                      renderInPortal={false}
                      pointerOrientation="top"
                      dx={-40}
                      constrainToVisibleArea
                      flyoutPadding={20}
                      angle={20}
                      style={{
                        fontSize: 12,
                        fill: colors.white,
                        fontFamily: fontFamilies('boldText'),
                      }}
                      flyoutStyle={{
                        fill: colors.black,
                      }}
                    />
                  }
                  data={lineResultsArray}
                  size={12}
                  style={{
                    data: {
                      fill: colors.skyBlueDark,
                      stroke: colors.whiteAbsolute,
                      strokeWidth: 5,
                    },
                  }}
                />
              </VictoryChart>
            </Svg>
          </View>
        </View>
      ) : (
        <View style={styles().chartContainer}>
          <View
            style={{
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <View
              style={{
                ...styles().absolute,
                zIndex: 2,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: fontFamilies('boldText'),
                  fontSize: 20,
                  color: colors.black,
                }}>
                {i18n.t('vitalReports.noAvaliableData')}
              </Text>
            </View>
            <VictoryChart width={WP('95')}></VictoryChart>

            <Image
              source={images.white}
              overlayColor={'transparent'}
              style={styles().absolute}
            />

            <View
              style={{
                position: 'absolute',
                top: HP('2'),
                left: 20,
                right: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fontFamilies('boldText'),
                  maxWidth: 130,
                }}>
                {name === 'Cholesterol'
                  ? i18n.t('vitalReports.cholestrol')
                  : name === 'Triglycerides'
                  ? i18n.t('vitalReports.triglesrides')
                  : name === 'Fasting Blood Sugar'
                  ? i18n.t('vitalReports.festingBloodSugar')
                  : name === 'Random Blood Sugar'
                  ? i18n.t('vitalReports.ranBloodSugar')
                  : name === 'Vitamin D'
                  ? i18n.t('vitalReports.vitaminD')
                  : null}
              </Text>
              <View style={styles().infoRow}>
                <View style={styles().dotStyle}></View>
                <Text numberOfLines={1} style={styles().ifnoFont}>
                  {i18n.t('vitalReports.normalMinimum')}
                </Text>
              </View>
              <View style={styles().infoRow}>
                <View
                  style={{
                    ...styles().dotStyle,
                    backgroundColor: colors.orange,
                  }}></View>
                <Text numberOfLines={1} style={styles().ifnoFont}>
                  {i18n.t('vitalReports.normalMax')}
                </Text>
              </View>
              <View style={styles().infoRow}>
                <View
                  style={{
                    ...styles().dotStyle,
                    backgroundColor: colors.skyBlueDark,
                  }}></View>
                <Text numberOfLines={1} style={styles().ifnoFont}>
                  {i18n.t('vitalReports.result')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChartComponent;

const styles = () =>
  StyleSheet.create({
    chartContainer: {
      backgroundColor: colors.white,
      marginVertical: 10,
      //   marginHorizontal: 20,
      ...shadows.lightShadowGrey,
      borderRadius: 20,
      elevation: 5,
      width: WP('90'),
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'rgba(255,255,255,0.1)',
      opacity: 0.9,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 2,
    },
    dotStyle: {
      backgroundColor: colors.green,
      width: 10,
      height: 10,
      borderRadius: 10,
      marginRight: 5,
    },
    ifnoFont: {
      fontSize: 9,
      color: colors.grey,

      fontFamily: fontFamilies('boldText'),
    },
  });
