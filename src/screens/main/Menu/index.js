import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {
  LoadingWrapper,
  SocailMediaLinks,
  EnterPhoneNumModal,
  TouchableOpacity,
  Text,
} from '../../../components';
import {
  ScrollView,
  Linking,
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  I18nManager,
} from 'react-native';
import {setTheme} from '../../../store/actions';
import {connect, useSelector, useDispatch} from 'react-redux';
import {
  i18n,
  routesNames,
  colors,
  hospitalLocation,
  hospitalPhone,
  shadows,
  flagAssets,
  fontFamilies,
} from '../../../services';
import IconButton from './IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {subMenuMedicalServices} from './medicalServices';
import {subMenuHospitalProcedures} from './hospitalProcedures';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {subMenuPatientsAndVistors} from './patientsAndVisitors';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import ShadowView from 'react-native-simple-shadow-view';
import styles from './styles';
import {logoutUser} from '../../../store/actions/auth/registerAction';
import UserHeader from '../../../components/headers/CustomHeader/UserHeader';

const iconSize = 20;

const Menu = ({navigation, setTheme}) => {
  const theme = useSelector((state) => state.theme.themeColor);
  const [phoneNumModal, setPhoneNumModal] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [userWithToken, setUserWithToken] = useState();
  const [showLangSelector, setShowLangSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const handleSupportPress = () => {
    Linking.openURL(
      i18n.locale === 'ar'
        ? 'https://api.whatsapp.com/send?phone=966555911287&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%20%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%20%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87&source=eservices'
        : 'https://api.whatsapp.com/send?phone=966555911287&text=Hello&source=eservices',
    );
  };

  const handleLogout = () => {
    Alert.alert(
      `${I18nManager.isRTL ? 'تسجيل خروج' : 'Log out'}`,
      `${
        I18nManager.isRTL
          ? 'هل تريد تسجيل خروج؟'
          : 'Are You Sure You Want To Log Out?'
      }`,
      [
        {
          text: `${I18nManager.isRTL ? 'نعم' : 'Yes'}`,
          style: 'destructive',
          onPress: () =>
            dispatch(logoutUser(userWithToken.accessToken, navigation)),
        },
        {
          text: `${I18nManager.isRTL ? 'لا' : 'No'}`,
          onPress: () => {},
          style: 'default',
        },
      ],
    );
  };

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => {
        setUserWithToken(JSON.parse(user));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [isFocused]);

  return (
    <LoadingWrapper
      loading={loading}
      headerBar
      header={user ? null : true}
      navigation={navigation}
      endIcon={
        user ? null : <LanguageChangeButtons forceHide={showLangSelector} />
      }>
      {user && userWithToken ? (
        <UserHeader
          user={{accessToken: userWithToken.accessToken, ...user}}
          navigation={navigation}
          handlePress={handleLogout}
        />
      ) : null}
      <ScrollView
        onTouchMove={() => setShowLangSelector(true)}
        onMomentumScrollEnd={() => setShowLangSelector(false)}>
        <IconButton
          onPress={() => navigation.navigate(routesNames.gmMessage)}
          icon={
            <Ionicons
              name="logo-electron"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.gmMessage')}
        </IconButton>
        {/* <IconButton
          onPress={() => navigation.navigate(routesNames.Images)}
          icon={
            <Ionicons
              name="ios-receipt-outline"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {'Gallery'}
        </IconButton> */}
        <IconButton
          onPress={() => navigation.navigate(routesNames.aboutUs)}
          icon={
            <Ionicons
              name="ios-receipt-outline"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.aboutH')}
        </IconButton>
        {/* <IconButton
                    icon={<AntDesign name="message1" size={iconSize} color={colors.darkGrey} />}>
                    {i18n.t('menuTabTranslations.myMessages')}
                </IconButton> */}
        <IconButton
          onPress={() => navigation.navigate(routesNames.ourRooms)}
          icon={
            <AntDesign
              name="videocamera"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.ourRooms')}
        </IconButton>
        <IconButton
          subMenu={subMenuMedicalServices()}
          onPress={(data) =>
            navigation.navigate(routesNames.medicalServices, {data})
          }
          icon={
            <MaterialCommunityIcons
              name="hospital-box-outline"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.medSer')}
        </IconButton>
        <IconButton
          subMenu={subMenuHospitalProcedures()}
          onPress={(data) =>
            navigation.navigate(routesNames.hospitalProcedures, {data})
          }
          icon={
            <MaterialCommunityIcons
              name="note-plus-outline"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.hosProced')}
        </IconButton>
        <IconButton
          subMenu={subMenuPatientsAndVistors()}
          onPress={(data) =>
            navigation.navigate(routesNames.patAndVisitor, {data})
          }
          icon={
            <Fontisto
              name="bed-patient"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.patiennvisitor')}
        </IconButton>
        {/* <IconButton
                    icon={<Foundation name="clipboard-pencil" size={iconSize} color={colors.darkGrey} />}>
                    {i18n.t('menuTabTranslations.myInvoices')}
                </IconButton> */}
        <IconButton
          onPress={() =>
            navigation.navigate(routesNames.knowYourDoc, {
              screen: routesNames.selectDoctor,
              params: {showFilter: true},
            })
          }
          icon={
            <AntDesign name="hearto" size={iconSize} color={colors.darkGrey} />
          }>
          {i18n.t('menuTabTranslations.knowYourDoc')}
        </IconButton>
        <IconButton
          onPress={() => navigation.navigate(routesNames.myAppointments)}
          icon={
            <AntDesign
              name="calendar"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.myApps')}
        </IconButton>
        <IconButton
          onPress={() => navigation.navigate(routesNames.reports)}
          icon={
            <Foundation
              name="clipboard-notes"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.myReports')}
        </IconButton>
        {/* <IconButton
                    icon={<MaterialCommunityIcons name="account-cash-outline" size={iconSize} color={colors.darkGrey} />}>
                    {i18n.t('menuTabTranslations.reviewOrders')}
                </IconButton> */}
        <IconButton
          onPress={() => i18n.setLanguage(i18n.locale === 'en' ? 'ar' : 'en')}
          icon={
            <Entypo name="language" size={iconSize} color={colors.darkGrey} />
          }>
          {i18n.t('menuTabTranslations.changeLang')}
        </IconButton>
        <IconButton
          onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          icon={
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.changeTheme')}
        </IconButton>
        <IconButton
          onPress={() => setPhoneNumModal(true)}
          icon={
            <MaterialCommunityIcons
              name="phone-settings-outline"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.changeNum')}
        </IconButton>
        <IconButton
          onPress={handleSupportPress}
          icon={
            <MaterialCommunityIcons
              name="headset"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.supportTickets')}
        </IconButton>
        <IconButton
          onPress={() => Linking.openURL(hospitalPhone)}
          icon={
            <Ionicons
              name="call-outline"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.callus')}
        </IconButton>
        <IconButton
          onPress={() => Linking.openURL(hospitalLocation)}
          icon={
            <MaterialCommunityIcons
              name="hospital-marker"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.location')}
        </IconButton>
        <IconButton
          onPress={() => InAppBrowser.open('http://www.udh.sa')}
          icon={
            <MaterialCommunityIcons
              name="web"
              size={iconSize}
              color={colors.darkGrey}
            />
          }>
          {i18n.t('menuTabTranslations.website')}
        </IconButton>
        {user ? (
          <IconButton
            onPress={() => {
              handleLogout();
            }}
            icon={
              <MaterialCommunityIcons
                name="logout"
                size={iconSize}
                color={colors.darkGrey}
              />
            }>
            {i18n.t('menuTabTranslations.logout')}
          </IconButton>
        ) : null}
        {}
        {/* <IconButton
                    icon={<AntDesign name="bells" size={iconSize} color={colors.darkGrey} />}>
                    {i18n.t('menuTabTranslations.notifications')}
                </IconButton> */}
        {/* <IconButton
                    icon={<AntDesign name="setting" size={iconSize} color={colors.darkGrey} />}>
                    {i18n.t('menuTabTranslations.settings')}
                </IconButton> */}
      </ScrollView>
      {/* <SocailMediaLinks /> */}
      <EnterPhoneNumModal
        phoneNum={phoneNum}
        setPhoneNum={setPhoneNum}
        setShow={setPhoneNumModal}
        closeText={i18n.t('menuTabTranslations.close')}
        show={phoneNumModal}
      />
    </LoadingWrapper>
  );
};

export default connect(null, {setTheme})(Menu);

const LanguageChangeButtons = ({forceHide}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (forceHide) setShow(false);
  }, [forceHide]);

  return (
    <View style={styles().langContainer}>
      <TouchableOpacity
        onPress={() => setShow(!show)}
        style={styles().langTouch}>
        <View
          style={{
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
          }}>
          {/* <Text> */}
          <Text
            style={{lineHeight: 14, padding: Platform.OS !== 'ios' ? 0 : 5}}>
            {i18n.locale !== 'ar' ? 'ع' : 'E'}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        {show ? (
          <ShadowView
            style={StyleSheet.flatten([
              shadows.lightShadowGrey,
              styles().langShadow,
            ])}>
            <TouchableOpacity
              onPress={() => i18n.setLanguage('en')}
              style={styles().languageButton}>
              <Image style={styles().flagImage} source={flagAssets.us} />
              <Text style={styles().langText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => i18n.setLanguage('ar')}
              style={styles().languageButton}>
              <Image style={styles().flagImage} source={flagAssets.sa} />
              <Text
                style={StyleSheet.flatten([
                  styles().langText,
                  {fontFamily: 'Tajawal-Regular'},
                ])}>
                العربية
              </Text>
            </TouchableOpacity>
          </ShadowView>
        ) : null}
      </View>
    </View>
  );
};
