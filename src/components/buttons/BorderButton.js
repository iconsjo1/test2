import React from 'react';
import {StyleSheet, TouchableOpacity, Text, I18nManager} from 'react-native';
import {colors, fontFamilies} from '../../services';
import {smallScreens} from '../../services/utilities/responsive';

const BorderButton = ({children, onPress}) => {
  return (
    <TouchableOpacity style={styles().container} onPress={onPress}>
      <Text style={styles().btnText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default BorderButton;

const styles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: I18nManager.isRTL
        ? smallScreens
          ? 10
          : 13
        : smallScreens
        ? 10
        : 13,
      borderColor: colors.skyBlue,
      borderWidth: 1,
      alignItems: 'center',
      borderRadius: 10,
      marginVertical: 2,
      justifyContent: 'center',
    },
    btnText: {
      fontFamily: fontFamilies('semiboldText'),
      color: colors.skyBlue,
      fontSize: smallScreens ? 12 : 16,
    },
  });
