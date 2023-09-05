import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RippleLoader} from 'react-native-indicator';

import {colors, fontFamilies} from '../../services';
import {HP, smallScreens} from '../../services/utilities/responsive';

const AppButton = ({
  text,
  btnStyle,
  loading,
  onPress,
  children,
  textStyle,
  color,
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      activeOpacity={0.78}
      onPress={onPress}
      style={[
        btnStyle
          ? btnStyle
          : {...styles().btn, backgroundColor: color ? color : colors.skyBlue},
      ]}>
      {loading ? (
        <RippleLoader color={colors.whiteAbsolute} size={15} />
      ) : children ? (
        children
      ) : (
        <Text style={[styles().btnText, textStyle ? textStyle : {}]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = () =>
  StyleSheet.create({
    btn: {
      backgroundColor: colors.skyBlue,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: smallScreens ? HP('6') : HP('5.3'),
      borderRadius: smallScreens ? 8 : 8,
      marginVertical: 20,
      flexDirection: 'row',
    },
    btnText: {
      fontFamily: fontFamilies('boldText'),
      color: colors.whiteAbsolute,
      fontSize: smallScreens ? 12 : 14,
    },
  });
