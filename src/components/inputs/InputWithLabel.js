import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  I18nManager,
  Dimensions,
  Platform,
} from 'react-native';
import {Text} from '..';
import {colors, fontFamilies} from '../../services';
import {smallScreens} from '../../services/utilities/responsive';

const InputWithLabel = ({
  children,
  testID,
  maxLength,
  onChange,
  value,
  containerStyle,
  disabled,
  transparent,
  keyboardType,
  color,
  placeholder,
  secureTextEntry,
  handleSumbit,
  inputStyle,
  multiLine,
}) => {
  return (
    <View style={[styles().container, containerStyle]}>
      <Text style={styles().textStyle}>{children}</Text>
      <TextInput
        onSubmitEditing={handleSumbit}
        secureTextEntry={secureTextEntry}
        testID={testID}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : 'default'}
        maxLength={maxLength}
        multiline={multiLine ? true : false}
        style={[
          styles().inputStyle,
          color
            ? {
                color: color,
              }
            : {},
          transparent
            ? {
                backgroundColor: 'transparent',
                borderColor: colors.extraLightGrey,
              }
            : {},
          I18nManager.isRTL ? styles().rltInput : {},
          {...inputStyle},
        ]}
        value={value}
        editable={disabled ? false : true}
        onChangeText={(value) => onChange(value)}
      />
    </View>
  );
};

export default InputWithLabel;

const styles = () =>
  StyleSheet.create({
    shadowContainer: {
      width: '100%',
      borderRadius: 10,
    },
    rltInput: {
      textAlign: 'right',
    },
    container: {
      width: '100%',
      marginTop: 5,
      borderRadius: 10,
    },
    inputStyle: {
      borderWidth: 1,
      backgroundColor: colors.white,
      color: colors.black,
      borderColor: colors.lightGrey,
      paddingVertical: Platform.OS === 'ios' ? 15 : smallScreens ? 9 : 13,
      paddingHorizontal: 15,
      margin: 0,
      fontSize: smallScreens ? 12 : 15,
      borderRadius: 10,
      fontFamily: fontFamilies('normalText'),
    },
    textStyle: {
      fontSize: smallScreens ? 12 : 15,
      color: colors.black,
      width: '100%',
      textAlign: 'left',
      marginVertical: 7,
      // fontWeight: 'bold',
    },
  });
