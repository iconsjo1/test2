import React from 'react';
import {View, StyleSheet, I18nManager} from 'react-native';
import {colors, fontFamilies, i18n} from '../../services';
import {TextInput} from 'react-native-gesture-handler';
import {Text} from '..';

const LabelOnTopInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  fontSize,
}) => {
  return (
    <View style={styles().container}>
      <TextInput
        onChangeText={onChangeText}
        placeholderTextColor={colors.lightGrey}
        style={[styles().textInput, {fontSize: fontSize ? fontSize : 15}]}
        placeholder={placeholder}
        value={value}
      />
      <Text style={styles().label}>{label}</Text>
    </View>
  );
};

export default LabelOnTopInput;

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: 10,
      borderColor: colors.grey,
      borderWidth: 2,
      flexDirection: 'row',
    },
    textInput: {
      padding: 15,
      width: '100%',
      fontFamily: fontFamilies('normalText'),
      color: colors.black,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    label: {
      position: 'absolute',
      top: i18n.locale === 'ar' ? -13 : -10,
      backgroundColor: colors.whiteBg,
      paddingHorizontal: 5,
      left: 15,
    },
  });
