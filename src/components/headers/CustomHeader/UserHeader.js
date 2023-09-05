import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Toast from 'react-native-simple-toast';
import Icons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import {Button} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
  colors,
  fontFamilies,
  images,
  routesNames,
  shadows,
} from '../../../services';
import {converENDigitsToAr} from '../../../services/utilities/helpers';
import {checkTokenValidation} from '../../../store/actions/auth/registerAction';

const UserHeader = ({
  user,
  navigation,
  defaultStyle,
  handlePress,
  mainAccount,
}) => {
  const dispatch = useDispatch();
  const [patientName, setPatientName] = useState({nameEn: null, nameAr: null});
  const [patientMainAccount, setPatientMainAccount] = useState(false);
  useEffect(() => {
    if (user.name) {
      const en = user.name.toString().split(' ');
      const ar = user.nameAr.toString().split(' ');
      setPatientName({
        nameEn: `${en[0]} ${en.length > 1 ? en[en.length - 1] : ''}`,
        nameAr: `${ar[0]} ${ar.length > 1 ? ar[ar.length - 1] : ''}`,
      });
    }
  }, [user]);

  useEffect(() => {
    AsyncStorage.getItem('mainAccount')
      .then((user) => {
        if (user) {
          setPatientMainAccount(true);
        } else {
          setPatientMainAccount(false);
        }
      })
      .catch((err) => setPatientMainAccount(false));
  }, [user]);
  return (
    <View style={styles().container}>
      <View style={{...styles().row, justifyContent: 'space-between'}}>
        <View style={styles().row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routesNames.userProfile, {
                user,
                mainAccount,
              })
            }
            style={styles().imageContainer}
            activeOpacity={0.8}>
            <Icon
              name={
                user.gender
                  ? user.gender === 'Male'
                    ? 'male'
                    : 'female'
                  : 'male'
              }
              size={24}
              color={colors.whiteAbsolute}
            />
          </TouchableOpacity>
          <View style={styles().userDetails}>
            <Text style={styles().userName}>
              {patientName.nameAr || patientName.nameEn
                ? defaultStyle
                  ? I18nManager.isRTL
                    ? `اهلا ${
                        I18nManager.isRTL
                          ? patientName.nameAr
                          : patientName.nameEn
                      },`
                    : `Hi ${
                        I18nManager.isRTL
                          ? patientName.nameAr
                          : patientName.nameEn
                      },`
                  : `${
                      I18nManager.isRTL
                        ? patientName.nameAr
                        : patientName.nameEn
                    }`
                : ''}
            </Text>
            <Text style={styles().greetings}>
              {defaultStyle
                ? I18nManager.isRTL
                  ? 'كيف حالك اليوم؟'
                  : 'How are you today?'
                : `${
                    I18nManager.isRTL
                      ? converENDigitsToAr(user.mobile)
                      : user.mobile
                  }`}
            </Text>
          </View>
        </View>

        <View>
          <View>
            <TouchableOpacity
              onPress={() => {
                if (handlePress) {
                  handlePress();
                } else {
                  Toast.show(I18nManager.isRTL ? 'قريباً' : 'Coming Soon');
                }
              }}>
              {defaultStyle ? (
                // <View style={styles().notifiesBubble}>
                //   <Text
                //     style={{
                //       fontSize: 12,
                //       color: colors.whiteAbsolute,
                //       fontFamily: fontFamilies('boldText'),
                //     }}>
                //     {I18nManager.isRTL ? converENDigitsToAr(3) : 3}
                //   </Text>
                // </View>
                <></>
              ) : null}

              {defaultStyle ? (
                // <Icon name="bell" size={24} color={colors.black} />
                <></>
              ) : I18nManager.isRTL ? (
                <SimpleIcon
                  style={{
                    transform: [{scaleX: -1}],
                  }}
                  name="login"
                  size={24}
                  color={colors.black}
                />
              ) : (
                <View>
                  <SimpleIcon
                    name="login"
                    size={24}
                    color={colors.black}
                    onPress={handlePress}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {defaultStyle && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {patientMainAccount && (
              <View
                style={{
                  width: 45,
                  height: 40,
                  backgroundColor: colors.skyBlue,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      checkTokenValidation(
                        user.accessToken,
                        (freshUser) => {
                          AsyncStorage.setItem(
                            'user',
                            JSON.stringify(mainAccount),
                          );
                        },
                        () => {
                          setIsModalVisible(true);
                          AsyncStorage.removeItem('user');
                        },
                      ),
                    );
                    setPatientMainAccount(null);
                    AsyncStorage.removeItem('mainAccount');
                  }}>
                  <Icons name="reload-outline" color={colors.white} size={25} />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                width: 45,
                height: 40,
                backgroundColor: colors.skyBlue,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(routesNames.FamilyMember)}>
                <Icons name="repeat-outline" color={colors.white} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserHeader;

const styles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: 40,
      paddingHorizontal: 20,
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
    },
    imageContainer: {
      width: 50,
      height: 50,
      backgroundColor: colors.skyBlue,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userDetails: {
      marginHorizontal: 10,
      alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
    },
    userName: {
      fontFamily: fontFamilies('boldTextHeader'),
      fontSize: 18,
      marginBottom: 3,
      color: colors.black,
    },
    greetings: {
      fontFamily: fontFamilies('lightTextHeader'),
      fontSize: 16,
      color: colors.black,
    },
    notifiesBubble: {
      backgroundColor: colors.skyBlue,
      padding: 3,
      width: 20,
      height: 20,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -12,
      right: -5,
      zIndex: 1,
    },
  });
