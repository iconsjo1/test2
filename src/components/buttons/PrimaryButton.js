import React from 'react';
import {I18nManager, Platform, StyleSheet, View} from 'react-native';
import Text from '../generic/Text';
import TouchableOpacity from '../generic/TouchableOpacity';
import {colors, shadows, fontFamilies, i18n} from '../../services';
import {smallScreens} from '../../services/utilities/responsive';
import {ActivityIndicator} from 'react-native';

const PrimaryButton = ({
  children,
  onPress,
  buttonStyle,
  testID,
  icon,
  fontSize,
  disabled,
  indicator,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={StyleSheet.flatten([styles().container, buttonStyle])}>
      {indicator ? (
        <View style={{alignItems: 'center', width: '100%'}}>{indicator}</View>
      ) : (
        <Text
          style={StyleSheet.flatten([
            styles().textStyle,
            {
              // paddingHorizontal: icon ? 15 : 0,
              fontSize: fontSize ? fontSize : smallScreens ? 12 : 16,
              textAlign: icon && i18n.locale === 'ar' ? 'left' : 'center',
              paddingRight:
                Platform.OS !== 'ios' && icon && i18n.locale === 'ar'
                  ? 30
                  : undefined,
              paddingLeft: icon && i18n.locale === 'ar' ? 10 : undefined,
            },
          ])}>
          {children}
        </Text>
      )}
      {icon ? (
        <View style={{flex: 1, alignItems: 'flex-start'}}>{icon}</View>
      ) : null}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = () =>
  StyleSheet.create({
    shadowContainer: {
      width: '100%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      maxWidth: 350,
    },
    container: {
      width: '100%',
      padding: I18nManager.isRTL
        ? smallScreens
          ? 7
          : 11
        : smallScreens
        ? 12
        : 14,
      marginVertical: 5,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
    },
    textStyle: {
      fontFamily: fontFamilies('semiboldText'),
      color: colors.whiteAbsolute,
      flex: 1,
    },
  });
