import React from 'react';
import {View, Image, Keyboard, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Text from '../Text';
import {InputWithLabel, HollowButton} from '../..';
import PrimaryButton from '../../buttons/PrimaryButton';
import {
  i18n,
  colors,
  WP,
  images,
  homeReducersTypes,
  mobileNumber,
  convertFromArabic,
} from '../../../services';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const {SET_MODAL_DISMISSED} = homeReducersTypes;

const EnterPhoneNumModal = ({
  show,
  setShow,
  phoneNum,
  setPhoneNum,
  onSaveCallback,
  closeText,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      backdropColor={colors.modalBackDrop}
      avoidKeyboard
      animationIn="tada"
      useNativeDriver
      animationInTiming={500}
      animationOutTiming={500}
      animationOut="tada"
      onBackdropPress={() => Keyboard.dismiss()}
      isVisible={show}>
      <View style={styles().modalContent}>
        <Image
          resizeMode="contain"
          source={images.udhLogo}
          style={styles().hospitalIcon}
        />
        <Text style={styles().mobileModalHeader}>
          {i18n.t('homeTabTranslations.enterNum')}
        </Text>
        <InputWithLabel
          placeholder={i18n.t('homeTabTranslations.num')}
          maxLength={13}
          value={phoneNum}
          onChange={setPhoneNum}
          keyboardType="phone-pad"
        />
        <View style={{marginTop: 20, width: '80%'}}>
          <PrimaryButton
            onPress={async () => {
              console.log(phoneNum.length);
              if (phoneNum.length >= 10) {
                await AsyncStorage.setItem(
                  mobileNumber,
                  convertFromArabic(phoneNum),
                );
                dispatch({
                  type: SET_MODAL_DISMISSED,
                  payload: true,
                });
                setShow(false);
                if (onSaveCallback) onSaveCallback();
              } else {
              }
            }}>
            {i18n.t('homeTabTranslations.save')}
          </PrimaryButton>
          <HollowButton
            onPress={() => {
              dispatch({
                type: SET_MODAL_DISMISSED,
                payload: true,
              });
              setShow(false);
            }}
            buttonStyle={{marginTop: 20}}>
            {closeText ? closeText : i18n.t('homeTabTranslations.doLater')}
          </HollowButton>
        </View>
      </View>
    </Modal>
  );
};

export default EnterPhoneNumModal;

const styles = () =>
  StyleSheet.create({
    hospitalIcon: {
      width: WP('20'),
      height: WP('20'),
      marginVertical: 20,
      alignSelf: 'center',
    },
    mobileModalHeader: {
      color: colors.golden,
      fontSize: 17,
      width: '100%',
      textAlign: 'center',
    },
    mobileModalInput: {
      color: colors.darkGrey,
      width: '100%',
      textAlign: 'left',
    },
    modalContent: {
      width: WP('85'),
      alignSelf: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.white,
      borderRadius: 10,
    },
  });
