import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, I18nManager, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import styles from './styles';
import LoadingWrapper from '../../../../components/generic/LoadingWrapper';
import UserHeader from '../../../../components/headers/CustomHeader/UserHeader';
import {useIsFocused} from '@react-navigation/native';
import {
  colors,
  images,
  routesNames,
  i18n,
  shadows,
  fontFamilies,
} from '../../../../services';
import IconCard from './IconCard';
import {getAllVitalSignsReport} from '../../../../store/actions/main/vitalSignsActions';
import {
  checkTokenValidation,
  sendFcmTokenToServer,
} from '../../../../store/actions/auth/registerAction';
import AsyncStorage from '@react-native-community/async-storage';
import {AppButton} from '../../../../components';
import RemoteConfig from '@react-native-firebase/remote-config';

const HomeLoggedinUser = ({navigation, user, mainAccount}) => {
  console.log({mainAccount});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const freshUser = useSelector((state) => state.user.user);
  useEffect(() => {
    // GetDataFromFb()
    dispatch(
      getAllVitalSignsReport(
        user.mrn,
        () => {},
        () => {},
      ),
    );

    //Icons Update
    if (mainAccount == null) {
      dispatch(
        checkTokenValidation(
          user.accessToken,
          (freshUser) => {},
          () => {
            setIsModalVisible(true);
            AsyncStorage.removeItem('user');
          },
        ),
      );
      setToken();
    }
  }, [mainAccount]);

  const setToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCMTOKEN01', fcmToken);
    dispatch(
      sendFcmTokenToServer(
        user.accessToken,
        fcmToken,
        () => {},
        () => {},
      ),
    );
  };

  const GetDataFromFb = async () => {
    await RemoteConfig().fetch(0);
    const activated = await RemoteConfig().fetchAndActivate();
    console.log('activated', activated);
    if (activated) {
      const values = RemoteConfig().getAll();
      console.log(values);
      const restaurant_icon = RemoteConfig().getValue('restaurant_icon');
      const gitfsShop_icon = RemoteConfig().getValue('gitfsShop_icon');
      console.log('restaurant_icon', restaurant_icon);
      console.log('gitfsShop_icon', gitfsShop_icon);
    }
  };

  const handleSupportPress = () => {
    Linking.openURL(
      i18n.locale === 'ar'
        ? 'https://api.whatsapp.com/send?phone=966555911287&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%20%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%20%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87&source=eservices'
        : 'https://api.whatsapp.com/send?phone=966555911287&text=Hello&source=eservices',
    );
  };

  return (
    <LoadingWrapper>
      <UserHeader
        navigation={navigation}
        user={{accessToken: user.accessToken, ...freshUser}}
        defaultStyle
        mainAccount={
          mainAccount ? {accessToken: user.accessToken, ...freshUser} : null
        }
      />
      <ScrollView
        style={styles().container}
        showsVerticalScrollIndicator={false}>
        <View style={styles().mainIcons}>
          <IconCard
            isPrimary
            name={i18n.t('loggedinUser.invoices')}
            icon={images.billHome}
            link={routesNames.invoiceDetails}
            navigation={navigation}
            param={{
              mrnOrTransCoutn: {invoiceNo: '', MRN: user.mrn},
            }}
          />
          <IconCard
            name={i18n.t('loggedinUser.book')}
            icon={images.book}
            navigation={navigation}
            link={routesNames.appointments}
          />
          <IconCard
            name={i18n.t('loggedinUser.inpatient')}
            icon={images.inpatient}
            navigation={navigation}
            link={routesNames.invoiceForm}
          />
          <IconCard
            name={i18n.t('loggedinUser.vital')}
            icon={images.vitalLog}
            navigation={navigation}
            link={routesNames.vitalSigns}
            param={{
              user,
            }}
          />
          <IconCard
            name={i18n.t('loggedinUser.labReports')}
            icon={images.lab}
            navigation={navigation}
            link={routesNames.labReports}
            param={{
              data: {
                fileNo: user.mrn,
                foneNo: user.mobile,
              },
            }}
          />
          <IconCard
            name={i18n.t('loggedinUser.radReports')}
            icon={images.radio}
            navigation={navigation}
            link={routesNames.radiologyReports}
            param={{
              data: {
                fileNo: user.mrn,
                foneNo: user.mobile,
              },
            }}
          />
          <IconCard
            name={i18n.t('giftsShopHome.gitfsShop')}
            icon={images.gift}
            navigation={navigation}
            link={routesNames.flowerService}
          />
          <IconCard
            name={i18n.t('restaurant.restaurant')}
            icon={images.restaurantService}
            navigation={navigation}
            link={routesNames.restaurantService}
          />
          <IconCard
            name={i18n.t('loggedinUser.guide')}
            icon={images.guideLog}
            navigation={navigation}
            link={routesNames.hospitalGuide}
            param={{
              data: {
                fileNo: user.mrn,
                foneNo: user.mobile,
              },
            }}
          />
          <IconCard
            // isPrimary
            icon={images.gallery}
            gallery
            name={i18n.t('inpatientDetailsTranslation.gallery')}
            navigation={navigation}
            link={routesNames.Images}
          />
          <IconCard
            name={i18n.t('loggedinUser.knowYourDoc')}
            icon={images.knowDocLog}
            navigation={navigation}
            link={routesNames.knowYourDoc}
            param={{
              screen: routesNames.selectDoctor,
              params: {showFilter: true},
            }}
          />

          <IconCard
            name={i18n.t('loggedinUser.compAndSugg')}
            icon={images.suggestions}
            cta={handleSupportPress}
          />
          {/* start Icons Code */}
          <IconCard
            name={i18n.t('loggedinUser.familyMember')}
            icon={images.knowDocLog}
            navigation={navigation}
            link={routesNames.FamilyMember}
          />

          {/* aref edit */}
          <IconCard
            name={i18n.t('homeTabTranslations.menuItem1')}
            icon={images.dutyManagerPrimary}
            navigation={navigation}
            link={routesNames.myAppointments}
          />
          {/* <IconCard
            name={i18n.t('loggedinUser.InvoicesForm')}
            // icon={images.dutyManagerPrimary}
            navigation={navigation}
            link={routesNames.InvoicesForm}
          /> */}
          {/* <IconCard
            name={i18n.t('loggedinUser.InvoicesForm')}
            // icon={images.dutyManagerPrimary}
            navigation={navigation}
            link={routesNames.InvoicesForm}
          /> */}
          {/* end Icons Code  */}

          {/* routesNames.myAppointments */}
        </View>
        <View style={{marginVertical: 20}}></View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        backdropColor={colors.white}
        backdropOpacity={1}>
        <View
          style={{
            backgroundColor: colors.greyishWhite,
            padding: 20,
            paddingTop: 50,
            borderRadius: 10,
            ...shadows.lightShadowGreyLowSpread,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontFamilies('boldText'),
              color: colors.black,
            }}>
            {i18n.t('homeTabTranslations.session')}
          </Text>
          <AppButton
            text={i18n.t('loginTranslations.login')}
            onPress={() => navigation.replace(routesNames.main)}
          />
        </View>
      </Modal>
    </LoadingWrapper>
  );
};

export default HomeLoggedinUser;
