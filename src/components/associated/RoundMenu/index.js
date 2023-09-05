/*
THIS COMPONENT CREATES A ROUND MENU
IT IS BEING CONSUMED AT THE HOME TAB OF THE TAB NAVIGATOR
*/

import React, {useRef, useCallback, useState} from 'react';
import {View, StyleSheet, Image, I18nManager, Linking} from 'react-native';
import {
  WP,
  colors,
  images,
  i18n,
  fontFamilies,
  routesNames,
  pointOnCircle,
  calculateRadius,
  calculateAngleBetweenTwoPoints,
} from '../../../services';
import {Text, TouchableOpacity} from '../../../components';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {smallScreens} from '../../../services/utilities/responsive';

const RoundMenu = ({navigation}) => {
  const handleSupportPress = () => {
    Linking.openURL(
      i18n.locale === 'ar'
        ? 'https://api.whatsapp.com/send?phone=966555911287&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%20%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%20%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87&source=eservices'
        : 'https://api.whatsapp.com/send?phone=966555911287&text=Hello&source=eservices',
    );
  };

  const menuContent = [
    //aref edit
    // {
    //   LOGO: images.menuRect1,
    //   text: i18n.t('homeTabTranslations.menuItem1'),
    //   route: routesNames.myAppointments,
    // },
    {
      LOGO: images.menuRect2,
      text: i18n.t('homeTabTranslations.menuItem2'),
      route: routesNames.reports,
    },
    {
      LOGO: images.menuRect3,
      text: i18n.t('homeTabTranslations.menuItem3'),
      route: '',
      linking: handleSupportPress,
    },
    {
      LOGO: images.menuRect4,
      text: i18n.t('homeTabTranslations.menuItem4'),
      route: routesNames.knowYourDoc,
      initialParams: {
        screen: routesNames.selectDoctor,
        params: {showFilter: true},
      },
    },
    {
      LOGO: images.menuRect5,
      text: i18n.t('homeTabTranslations.menuItem5'),
      route: routesNames.appointments,
    },
    {
      LOGO: images.flowerService,
      text: i18n.t('homeTabTranslations.menuItem8'),
      route: routesNames.flowerService,
    },
    {
      LOGO: images.inpatientRound,
      text: i18n.t('homeTabTranslations.menuItem7'),
      route: routesNames.invoiceForm,
    },
    {
      LOGO: images.inpatientRound,
      text: i18n.t('homeTabTranslations.menuItem9'),
      route: routesNames.createPatientFile,
    },
  ];
  const touchEvent = useRef({x: undefined, y: undefined});
  const touchEventPrev = useRef({x: undefined, y: undefined});
  const touchStart = useRef(undefined);
  const center = {x: WP('50'), y: WP('50')};
  const radius = smallScreens ? WP('32') : WP('35');
  const udhLogoSize = WP('23');
  const divisionAngle = 360 / menuContent.length;
  const [offsetAngle, setOffsetAngle] = useState(0);

  const handleGesture = (e) => {
    touchEvent.current = e.nativeEvent;
    if (!touchStart.current) {
      touchStart.current = {
        touchEvent: e.nativeEvent,
        angle: offsetAngle,
      };
      touchEventPrev.current = e.nativeEvent;
      return;
    }
    const touchDistanceFromCenter = calculateRadius(center, touchEvent.current);
    if (
      touchDistanceFromCenter > radius * 0.3 &&
      touchDistanceFromCenter < radius * 1.4
    ) {
      const angleMoved = calculateAngleBetweenTwoPoints(
        center,
        touchEventPrev.current,
        touchEvent.current,
      );
      touchEventPrev.current = e.nativeEvent;
      setOffsetAngle(
        offsetAngle + (I18nManager.isRTL ? -angleMoved : angleMoved),
      );
    }
  };

  const onTouchRelease = (e) => {
    if (e.nativeEvent.oldState === 4) {
      touchEventPrev.current = undefined;
      touchStart.current = undefined;
    }
  };

  return (
    <View>
      <PanGestureHandler
        onHandlerStateChange={onTouchRelease}
        onGestureEvent={handleGesture}>
        <View style={styles().container}>
          {menuContent.map(({LOGO, text, route, linking, initialParams}, i) => {
            const [x, y] = pointOnCircle({
              radius,
              angle: divisionAngle * (i + 1) + offsetAngle + 90,
              cx: center.x,
              cy: center.y,
            });
            const size = smallScreens ? WP('20') : WP('24');
            return (
              <TouchableOpacity
                key={i}
                onPress={
                  route
                    ? () =>
                        navigation.navigate(
                          route,
                          initialParams ? initialParams : null,
                        )
                    : linking
                    ? linking
                    : undefined
                }
                style={{
                  position: 'absolute',
                  left: x - size / 2,
                  top: smallScreens ? y - size / 1.4 : y - size / 2,
                  width: size,
                  height: size,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'visible',
                }}>
                <View
                  style={{
                    width: '80%',
                    height: '90%',
                    overflow: 'visible',
                  }}>
                  <Image
                    style={styles().imageStyle}
                    resizeMode="contain"
                    source={LOGO}
                  />
                </View>
                <Text style={styles().textStyle}>{text}</Text>
              </TouchableOpacity>
            );
          })}
          <Image
            source={images.udhLogo}
            resizeMode="contain"
            style={{
              // transform: [{ rotate: I18nManager.isRTL ? (-offsetAngle + 'deg') : (offsetAngle + 'deg') }],
              left: center.x - udhLogoSize / 2,
              top: center.x - udhLogoSize / 2,
              width: udhLogoSize,
              height: udhLogoSize,
              position: 'absolute',
            }}
          />
        </View>
      </PanGestureHandler>
    </View>
  );
};

export default RoundMenu;

const styles = () =>
  StyleSheet.create({
    container: {
      width: WP('100'),
      height: WP('100'),
      backgroundColor: colors.whiteBg,
      overflow: 'visible',
      marginTop: 5,
      marginBottom: 15,
      padding: 20,
    },
    textStyle: {
      fontSize: smallScreens ? 10 : 13,
      fontFamily: fontFamilies('semiboldText'),
      marginTop: smallScreens ? 2 : 5,
      textAlign: 'center',
      color: colors.darkGrey,
      overflow: 'visible',
      lineHeight: 16,
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
  });
