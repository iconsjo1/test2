import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  I18nManager,
} from 'react-native';
import {LoadingWrapper} from '../../../../components';
import {
  colors,
  images,
  routesNames,
  i18n,
  fontFamilies,
  WP,
  mobileNumber,
  setUserData,
} from '../../../../services/index';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import {Text} from '../../../../components';
import InputWithLabel from '../../../../components/inputs/InputWithLabel';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import Item from './Item';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

const ReportsForm = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileNo, onFileNoChange] = useState('');
  const [foneNo, onFoneNoChange] = useState('');
  const onHide = useRef();

  const showModal = () => {
    if (fileNo && foneNo) {
      setModalVisible(true);
    } else {
      Toast.show(i18n.t('reportsTabTranslations.fillForm'), Toast.LONG);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);
  const getLabReports = () => {
    setModalVisible(false);
    onHide.current = () =>
      navigation.navigate(routesNames.labReports, {
        data: {
          fileNo,
          foneNo,
        },
      });
  };

  const getRadiologyReports = () => {
    setModalVisible(false);
    onHide.current = () =>
      navigation.navigate(routesNames.radiologyReports, {
        data: {
          fileNo,
          foneNo,
        },
      });
  };

  const reportCards = [
    {
      title: i18n.t('reportsTabTranslations.data1'),
      image: images.labreports,
      getReports: getLabReports,
    },
    {
      title: i18n.t('reportsTabTranslations.data2'),
      image: images.radiology,
      getReports: getRadiologyReports,
    },
    // { title: i18n.t('reportsTabTranslations.data3'), image: images.promoPic4, getReports: () => null },
    // { title: i18n.t('reportsTabTranslations.data4'), image: images.promoPic4, getReports: () => null },
  ];

  useEffect(() => {
    setUserData(onFoneNoChange, onFileNoChange, 'report');
  }, []);

  return (
    <LoadingWrapper
      navigation={navigation}
      loading={loading}
      header
      lightGreyBG={true}>
      <View style={styles().ReportFormWrapper}>
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          <View style={styles().scrollViewContainer}>
            <View>
              <Image
                source={images.medicalResult1}
                style={styles().imageStyle}
              />
            </View>
            <View>
              <Text style={styles().titleStyle}>
                {i18n.t('reportsTabTranslations.insert')}
              </Text>
            </View>
            <InputWithLabel
              keyboardType="number-pad"
              disabled={user ? true : false}
              value={fileNo}
              onChange={onFileNoChange}
              containerStyle={styles().fileNoStyle}>
              {i18n.t('reportsTabTranslations.fileNo')}
            </InputWithLabel>
            <InputWithLabel
              disabled={user ? true : false}
              maxLength={13}
              keyboardType="phone-pad"
              value={foneNo}
              onChange={onFoneNoChange}
              containerStyle={styles().phoneNoStyle}>
              {i18n.t('reportsTabTranslations.mobileNo')}
            </InputWithLabel>
            <PrimaryButton onPress={showModal}>
              {i18n.t('reportsTabTranslations.submit')}
              {submitIcon()}
            </PrimaryButton>
            <View style={{height: 50}} />
          </View>
        </KeyboardAvoidingScrollView>
      </View>

      <Modal
        propagateSwipe={true}
        onSwipeComplete={hideModal}
        swipeThreshold={200}
        backdropColor={colors.modalBackDrop}
        swipeDirection="down"
        onModalHide={() => {
          if (onHide.current) {
            onHide.current();
            onHide.current = undefined;
          }
        }}
        isVisible={modalVisible}
        style={styles().bottomModal}
        onBackdropPress={hideModal}>
        <View style={styles().modalContent}>
          <View style={styles().modalContenHeaderStyle}></View>
          <Text style={styles().selectTextStyle}>
            {i18n.t('reportsTabTranslations.selectReport')}
          </Text>
          <FlatList
            keyExtractor={(el, i) => String(i)}
            data={reportCards}
            renderItem={({item}) => (
              <View style={{width: WP('100')}}>
                <Item
                  title={item.title}
                  imageSrc={item.image}
                  getReports={item.getReports}
                />
              </View>
            )}
          />
        </View>
      </Modal>
    </LoadingWrapper>
  );
};

const submitIcon = () => {
  return I18nManager.isRTL ? (
    <Feather name="arrow-left" size={15} color={colors.whiteAbsolute} />
  ) : (
    <Feather name="arrow-right" size={15} color={colors.whiteAbsolute} />
  );
};

export default ReportsForm;

const styles = () =>
  StyleSheet.create({
    ReportFormWrapper: {
      flex: 1,
    },
    imageStyle: {
      alignSelf: 'center',
    },
    modalContenHeaderStyle: {
      height: 6,
      width: 48,
      backgroundColor: '#E0E0E0',
      alignSelf: 'center',
      borderRadius: 15,
    },
    titleStyle: {
      color: colors.black,
      fontSize: 17,
      textAlign: 'left',
      fontFamily: fontFamilies('boldText'),
      marginTop: 30,
    },
    fileNoStyle: {
      marginTop: 30,
    },
    phoneNoStyle: {
      marginTop: 30,
      marginBottom: 30,
    },
    forgetText: {
      color: colors.link,
      marginVertical: 5,
      fontSize: 13,
      textAlign: 'left',
    },
    selectTextStyle: {
      color: '#EB8C43',
      fontSize: 16,
      marginBottom: 25,
      marginTop: 25,
    },
    modalContent: {
      backgroundColor: colors.white,
      paddingVertical: 25,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal: 30,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      width: '100%',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    scrollViewContainer: {
      width: WP('92'),
      alignSelf: 'center',
    },
  });
