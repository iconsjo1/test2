import React from 'react';
import {I18nManager, StyleSheet, View} from 'react-native';
import Text from '../generic/Text';
import TouchableOpacity from '../generic/TouchableOpacity';
import {colors, shadows, fontFamilies} from '../../services';
import {smallScreens} from '../../services/utilities/responsive';

const HollowButton = ({children, onPress, buttonStyle, testID, fontSize}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={[styles().container, buttonStyle]}>
      <Text
        style={StyleSheet.flatten([
          styles().textStyle,
          fontSize ? {fontSize} : null,
        ])}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default HollowButton;

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: I18nManager.isRTL
        ? smallScreens
          ? 5
          : 13
        : smallScreens
        ? 10
        : 13,
      marginVertical: smallScreens ? 0 : 5,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.lightGrey,
    },
    textStyle: {
      fontSize: smallScreens ? 12 : 16,
      fontFamily: fontFamilies('semiboldText'),
      color: colors.grey,
      width: '100%',
      textAlign: 'center',
    },
  });
