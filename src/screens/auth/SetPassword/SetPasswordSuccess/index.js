import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Button from '../../../../components/buttons/PrimaryButton';

import {
  colors,
  fontFamilies,
  i18n,
  images,
  routesNames,
} from '../../../../services';
import {smallScreens} from '../../../../services/utilities/responsive';

const SetPasswordSuccess = ({navigation}) => {
  return (
    <View style={styles().container}>
      {/* Image */}
      <Image
        source={images.imgSuccess}
        style={[
          styles().headerImg,
          smallScreens ? {width: 150, height: 150, resizeMode: 'contain'} : {},
        ]}
      />
      {/* End  Image */}

      {/* Heading */}
      <Text style={styles().headingTxt}>
        {i18n.t('setPasswordSuccessTranslations.congrats')}
      </Text>
      {/* End Heading */}

      {/* SubHeading */}
      <Text style={styles().paragraph}>
        {i18n.t('setPasswordSuccessTranslations.helpTxt')}
      </Text>
      {/* End SubHeading */}

      {/* Button */}
      <Button
        children={i18n.t('setPasswordSuccessTranslations.loginNow')}
        onPress={() => navigation.navigate(routesNames.login)}
      />
      <Button
        children={i18n.t('setPasswordSuccessTranslations.goToHome')}
        onPress={() => navigation.navigate(routesNames.home)}
      />
      {/* Emd Button */}
    </View>
  );
};

export default SetPasswordSuccess;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    headerImg: {
      resizeMode: 'cover',
      marginBottom: smallScreens ? 30 : 50,
    },
    headingTxt: {
      fontSize: smallScreens ? 14 : 18,
      marginVertical: 20,
      fontFamily: fontFamilies('boldTextHeader'),
      color: colors.black,
    },
    paragraph: {
      fontSize: smallScreens ? 14 : 16,
      width: Dimensions.get('screen').width - 70,
      textAlign: 'center',
      color: colors.mediumGrey,
      marginBottom: 40,
      fontFamily: fontFamilies('normalText'),
      lineHeight: 30,
    },
  });
