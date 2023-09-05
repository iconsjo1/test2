import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {LoadingWrapper, NetworkError, NoResults} from '../../../../components';
import {
  HP,
  WP,
  apis,
  colors,
  fontFamilies,
  i18n,
  images,
  lineHeights,
  registerReducerTypes,
  routesNames,
} from '../../../../services';
import {getAllPatient, getPatientMember} from '../../../../store/actions';
import Axios from 'axios';

const imageSize = 70;
const checkMarkSize = 20;
const width = WP('92');

const FamilyMember = ({navigation}) => {
  const {REGISTER_USER, SET_LOGEDIN_USER} = registerReducerTypes;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const memberList = useRef();

  const patients = useSelector((state) => state.patients);
  const freshUser = useSelector((state) => state.user.user);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [patientsMember, setPatientMember] = useState([]);
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('user')
      .then((res) => {
        const parsedUser = JSON.parse(res);
        setUser(parsedUser);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [isFocused]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      (async () => {
        try {
          const resPatient = await Axios.get(
            `https://udhrest.iconsjo.space/REST/patients-bymobile?mobile=${user.mobile}`,
          );
          if (resPatient.data.no_of_records > 0) {
            setPatientMember(resPatient.data.data);
          } else {
            setPatientMember([]);
          }
        } catch (e) {
          console.error(e.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user]);
  const FamilyMemberListItem = ({age, last, item}) => {
    return (
      <>
        <TouchableOpacity
          // disabled={mainNav}
          useRNGH={Platform.OS === 'android'}
          // testID={DOC_CODE}
          onPress={() => {
            const user1 = {
              udhId: item.ID_CARD,
              id: null,
              accessToken: user.accessToken,
              authorized: user.authorized,
              email: user.email,
              isLoggedOut: user.isLoggedOut,
              isMobileVerified: user.isMobileVerified,
              isSuspend: user.isSuspend,
              locale: user.locale,
              mobile: user.mobile,
              mrn: item.PAT_CODE,
              userType: user.userType,
              name: item.PAT_ENAME,
              surname: item.PAT_EFLN,
              nameAr: item.PAT_EFN,
              surnameAr: item.PAT_AFLN,
              surnameAr: item.PAT_EFN,
              gender: item.SEX ? (item.SEX == 'M' ? 'Male' : 'female') : 'Male',
              birthdate: item.DATE_BIRTH,
            };

            const switchUser = {
              birthdate: item.DATE_BIRTH,
              createdAt: freshUser.createdAt,
              email: freshUser.email,
              gender: item.SEX ? (item.SEX == 'M' ? 'Male' : 'Female') : 'Male',
              id: freshUser.id,
              isLoggedOut: freshUser.isLoggedOut,
              isMobileVerified: freshUser.isMobileVerified,
              isSuspend: freshUser.isSuspend,
              lastLogOutDate: freshUser.lastLogOutDate,
              lastLoginDate: freshUser.lastLoginDate,
              locale: freshUser.locale,
              mobile: freshUser.mobile,
              mrn: item.PAT_CODE,
              name: item.PAT_ENAME,
              nameAr: item.PAT_ANAME,
              passcode: freshUser.passcode,
              password: freshUser.password,
              surname: item.PAT_EFLN,
              surnameAr: item.PAT_AFLN,
              udhId: item.ID_CARD,
              updatedAt: freshUser.updatedAt,
              userType: freshUser.userType,
            };
            AsyncStorage.setItem('user', JSON.stringify(user1));
            AsyncStorage.setItem('mainAccount', JSON.stringify(user));
            dispatch({
              type: REGISTER_USER,
              payload: switchUser,
            });
            dispatch({
              type: SET_LOGEDIN_USER,
              payload: user1,
            });
            navigation.navigate(routesNames.home);
          }}
          style={styles().container}>
          <View style={styles().imageStyle}>
            <Icon
              name={item.SEX ? (item.SEX === 'M' ? 'male' : 'female') : 'male'}
              size={24}
              color={colors.whiteAbsolute}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingLeft: 15,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={styles().name}>
                  {i18n.locale === 'ar'
                    ? `${item.PAT_AFN} ${item.AFLN ? item.PAT_AFLN : ''}`
                    : `${item.PAT_EFN} ${item.PAT_EFLN ? item.PAT_EFLN : ''}`}
                </Text>

                <Text style={styles().speciality}>{item.PAT_CODE}</Text>
              </View>
              <View>
                <Text style={styles().bookAppointment}>
                  {i18n.t('familyMember.memberDetails')}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles().bottomLine} />
        {last ? <View style={{height: 30}} /> : null}
      </>
    );
  };
  return (
    <LoadingWrapper
      loading={loading}
      navigation={navigation}
      header={true}
      headerText={'Patient Member'}>
      {
        patientsMember && patientsMember !== 0 ? (
          <FlatList
            // testID={ids.selectDoc.scrollContianer}
            showsVerticalScrollIndicator={false}
            keyExtractor={(el) => el.ID_CARD}
            ref={(ref) => (memberList.current = ref)}
            renderItem={({item, index}) => (
              <FamilyMemberListItem
                // mainNav={showFilter}
                last={index === memberList.length - 1}
                first={index === 0}
                collapsed={index !== expandedIndex}
                collapse={() => setExpandedIndex(-1)}
                // date={date}
                index={index}
                scrollToIndex={(i) =>
                  memberList.current.scrollToIndex({index: i, animated: true})
                }
                expand={() => setExpandedIndex(index)}
                navigation={navigation}
                item={item}
                {...item}
              />
            )}
            data={patientsMember}
          />
        ) : (
          <NoResults text={i18n.t('familyMember.NoResults')} />
        )
        // ) : (
        // <NetworkError />
        // )
      }
    </LoadingWrapper>
  );
};

export default connect(null, {getAllPatient})(FamilyMember);

const styles = () =>
  StyleSheet.create({
    container: {
      width,
      // borderBottomColor: colors.lightGrey,
      // borderBottomWidth: 1,
      alignSelf: 'center',
      paddingVertical: 10,
      flexDirection: 'row',
      flex: 1,
    },
    imageStyle: {
      width: 50,
      backgroundColor: colors.grey,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkMark: {
      position: 'absolute',
      bottom: -checkMarkSize / 10,
      right: -checkMarkSize / 10,
      width: checkMarkSize,
      height: checkMarkSize,
      borderRadius: checkMarkSize / 2,
      backgroundColor: '#FFF',
      overflow: 'hidden',
    },
    textContainer: {
      flex: 1,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainerInner: {
      height: '100%',
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontFamily: fontFamilies('semiboldText'),
      color: colors.black,
      textAlign: 'left',
      lineHeight: lineHeights('small'),
    },
    post: {
      fontSize: 13,
      color: colors.darkGrey,
      textAlign: 'left',
      lineHeight: lineHeights('small'),
    },
    speciality: {
      fontSize: 13,
      color: colors.golden,
      textAlign: 'left',
      lineHeight: lineHeights('small'),
      paddingRight: i18n.locale === 'ar' ? 5 : 0,
      paddingLeft: i18n.locale === 'ar' ? 5 : 0,
    },
    bookAppointment: {
      minWidth: WP('100') < 400 ? 60 : 70,
      padding: 5,
      borderRadius: 5,
      backgroundColor: colors.green,
      color: colors.whiteAbsolute,
      overflow: 'hidden',
      textAlign: 'center',
      justifyContent: 'flex-end',
    },
    stars: {
      flexDirection: 'row',
    },
    schedulesContainer: {
      width: WP('100'),
      paddingVertical: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
    },
    loader: {
      paddingVertical: 50,
      alignItems: 'center',
    },
    noAppointments: {
      alignSelf: 'center',
      width: WP('80'),
      alignItems: 'center',
      minHeight: 150,
      justifyContent: 'center',
    },
    noAppointmentsText: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: colors.extraLightGrey,
      textAlign: 'center',
      color: colors.darkGrey,
      width: '100%',
      overflow: 'hidden',
    },
    appointmentTime: {
      textAlign: 'center',
      width: 100,
      padding: 10,
      fontSize: 12,
      backgroundColor: colors.extraLightGrey + '77',
      color: colors.darkGrey,
      lineHeight: lineHeights('small'),
    },
    timeContainer: {
      overflow: 'hidden',
      margin: 5,
      borderRadius: 5,
      borderColor: colors.mediumLightGrey,
      borderWidth: 1,
    },
    shortDescContainer: {
      width,
      paddingBottom: 10,
      alignSelf: 'center',
    },
    shortDesc: {
      fontSize: 12,
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
      color: colors.grey,
    },
    bottomLine: {
      width,
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
      alignSelf: 'center',
    },
  });
