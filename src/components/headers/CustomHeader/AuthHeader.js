import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fontFamilies, i18n} from '../../../services';
import Icon from 'react-native-vector-icons/Ionicons';
import {smallScreens} from '../../../services/utilities/responsive';
const AuthHeader = ({navigation, children, backRoute, replace}) => {
  return (
    <View style={styles().header}>
      {navigation ? (
        <TouchableOpacity
          style={styles().backBtn}
          onPress={() => {
            replace && backRoute
              ? navigation.replace(backRoute)
              : backRoute
              ? navigation.navigate(backRoute)
              : navigation.goBack();
          }}>
          <Icon
            name={i18n.locale === 'ar' ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {/* <View style={{alignItems: 'center', width: '100%'}}> */}
      <Text style={styles().headerTxt}>{children}</Text>
      {/* </View> */}
      <View></View>
    </View>
  );
};

export default AuthHeader;

const styles = () =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    backBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      padding: 5,
      borderColor: colors.grey,
      borderWidth: 1,
      borderRadius: 10,
    },
    headerTxt: {
      textAlign: 'center',
      fontSize: smallScreens ? 14 : 18,
      color: colors.black,
      fontFamily: fontFamilies('normalText'),
    },
  });
