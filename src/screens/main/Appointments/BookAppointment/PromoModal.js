import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, TextInput} from 'react-native';
import {WP, colors, fontFamilies, i18n} from '../../../../services';
import {Text, HollowButton, PrimaryButton} from '../../../../components';

const PromoModal = ({show, hide}) => {
  return (
    <Modal
      onBackdropPress={hide}
      onBackButtonPress={hide}
      avoidKeyboard
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
      backdropColor={colors.modalBackDrop}
      animationInTiming={500}
      animationOutTiming={500}
      isVisible={show}>
      <View style={styles().container}>
        <Text style={styles().enterPromoText}>
          {i18n.t('bookAppointmentTranslations.enterCode')}
        </Text>
        <TextInput style={styles().textInput} />
        <View style={styles().buttonsRow}>
          <View style={styles().buttonCOntainerRow}>
            <HollowButton onPress={hide}>
              {i18n.t('bookAppointmentTranslations.cancel')}
            </HollowButton>
          </View>
          <View style={styles().buttonCOntainerRow}>
            <PrimaryButton onPress={hide}>
              {i18n.t('bookAppointmentTranslations.apply')}
            </PrimaryButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PromoModal;

const styles = () =>
  StyleSheet.create({
    container: {
      padding: WP('5'),
      width: WP('85'),
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.whiteBg,
    },
    enterPromoText: {
      fontFamily: fontFamilies('normalTextHeader'),
      marginBottom: 20,
      color: colors.black,
    },
    textInput: {
      color: colors.black,
      width: '100%',
      backgroundColor: colors.whiteBg,
      borderColor: colors.skyBlue,
      borderRadius: 10,
      borderWidth: 1,
      fontFamily: fontFamilies('normalText'),
      textAlign: 'center',
      padding: 10,
      marginVertical: 10,
      fontSize: 16,
    },
    buttonsRow: {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
    },
    buttonCOntainerRow: {
      flex: 1,
      margin: 10,
    },
  });
